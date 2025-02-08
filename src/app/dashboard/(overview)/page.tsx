import { fetchCardData } from '@/app/lib/data'
// import { cookies } from 'next/headers'

export default async function Page() {
  // const c = await cookies()
  // console.log(c)
  const { totalPaidInvoices, totalPendingInvoices, numberOfCustomers, numberOfInvoices } =
    await fetchCardData()

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      <p> Collected: {totalPaidInvoices} </p>
      <p> Pending: {totalPendingInvoices} </p>
      <p> Total Invoices: {numberOfInvoices} </p>
      <p> Total Customers: {numberOfCustomers} </p>
    </main>
  )
}
