'use server'

import { fetchCustomers } from './data'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { client } from './data'

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

  const query = `
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES ($1, $2, $3, $4)`

  try {
    await client.query(query, [customerId, amountInCents, status, date])
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard/invoices')
}
