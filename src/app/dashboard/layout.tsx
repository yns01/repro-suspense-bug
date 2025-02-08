import Link from 'next/link'

// export const dynamic = 'force-dynamic'

const links = [
  { name: 'Home', href: '/dashboard' },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
  },
  {
    name: 'Create Invoice',
    href: '/dashboard/invoices/create',
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex space-x-4 p-4">
        {links.map((link) => {
          return (
            <Link key={link.name} href={link.href}>
              <p className="hidden md:block">{link.name}</p>
            </Link>
          )
        })}
      </div>

      <div>{children}</div>
    </>
  )
}
