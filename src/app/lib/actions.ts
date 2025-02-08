'use server'

import { fetchCustomers } from './data'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { v4 as uuidv4 } from 'uuid'

const db = await open({
  filename: 'local.db',
  driver: sqlite3.Database,
})

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function createInvoice() {
  const customers = await fetchCustomers()

  const amount = getRandomNumber(100, 1000),
    status = 'paid',
    // Select a random customerId from the customers array
    customerId = customers[getRandomNumber(0, customers.length - 1)].id

  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]
  const id = uuidv4()

  const query = `
    INSERT INTO invoices (id, customer_id, amount, status, date)
    VALUES (?, ?, ?, ?, ?)`

  try {
    await db.run(query, [id, customerId, amountInCents, status, date])
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard/invoices')
}
