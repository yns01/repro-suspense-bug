'use client'

import { useActionState } from 'react'
import { createInvoice } from '@/app/lib/actions'

export default function CreateForm() {
  const [, formAction, isFormPending] = useActionState(createInvoice, undefined)

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isFormPending}
        className="border border-blue-500 p-2 border-radius-4">
        Click to Create Invoice
      </button>
    </form>
  )
}
