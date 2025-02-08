import { invoices, customers, revenue, users } from '../lib/placeholder-data'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { v4 as uuidv4 } from 'uuid'

const db = await open({
  filename: 'local.db',
  driver: sqlite3.Database,
})

async function seedUsers() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `)

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return db.run(
        `
        INSERT INTO users (id, name, email, password)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(id) DO NOTHING;
      `,
        [user.id, user.name, user.email, user.password]
      )
    })
  )

  return insertedUsers
}

async function seedInvoices() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `)

  const insertedInvoices = await Promise.all(
    invoices.map((invoice) => {
      const id = uuidv4()
      return db.run(
        `
        INSERT INTO invoices (id, customer_id, amount, status, date)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(id) DO NOTHING;
      `,
        [id, invoice.customer_id, invoice.amount, invoice.status, invoice.date]
      )
    })
  )

  return insertedInvoices
}

async function seedCustomers() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `)

  const insertedCustomers = await Promise.all(
    customers.map((customer) => {
      return db.run(
        `
        INSERT INTO customers (id, name, email, image_url)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(id) DO NOTHING;
      `,
        [customer.id, customer.name, customer.email, customer.image_url]
      )
    })
  )

  return insertedCustomers
}

async function seedRevenue() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `)

  const insertedRevenue = await Promise.all(
    revenue.map((rev) =>
      db.run(
        `
        INSERT INTO revenue (month, revenue)
        VALUES (?, ?)
        ON CONFLICT(month) DO NOTHING;
      `,
        [rev.month, rev.revenue]
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

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
