import { fetchFilteredInvoices } from '@/app/lib/data'

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  const invoices = await fetchFilteredInvoices('', currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
            {invoices?.map((invoice) => (
              <div key={invoice.id} className="mb-4 w-full rounded-md bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  {invoice.status}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{invoice.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
