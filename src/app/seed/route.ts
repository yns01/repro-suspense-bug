import { invoices, customers, revenue, users } from '../lib/placeholder-data'
import pg from 'pg'

const { Client } = pg
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'nextjsdashboaard',
})
await client.connect()

async function seedUsers() {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
    `)

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return client.query(
        `
        INSERT INTO users (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
        Object.values(user)
      )
    })
  )

  return insertedUsers
}

async function seedInvoices() {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

  await client.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `)

  const insertedInvoices = await Promise.all(
    invoices.map((invoice) =>
      client.query(
        `
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
        Object.values(invoice)
      )
    )
  )

  return insertedInvoices
}

async function seedCustomers() {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

  await client.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `)

  const insertedCustomers = await Promise.all(
    customers.map((customer) =>
      client.query(
        `
        INSERT INTO customers (id, name, email, image_url)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
        Object.values(customer)
      )
    )
  )

  return insertedCustomers
}

async function seedRevenue() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `)

  const insertedRevenue = await Promise.all(
    revenue.map((rev) =>
      client.query(
        `
        INSERT INTO revenue (month, revenue)
        VALUES ($1, $2)
        ON CONFLICT (month) DO NOTHING;
      `,
        Object.values(rev)
      )
    )
  )

  return insertedRevenue
}

export async function GET() {
  try {
    await seedUsers()
    await seedCustomers()
    await seedInvoices()
    await seedRevenue()

    return Response.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.log(error)
    return Response.json({ error }, { status: 500 })
  }
}
