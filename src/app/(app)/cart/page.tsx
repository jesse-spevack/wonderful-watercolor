// ABOUTME: Cart page showing items in the shopping cart.
// ABOUTME: Delegates to CartContents client component for interactivity.

import type { Metadata } from 'next'
import { CartContents } from './cart-contents'

export const metadata: Metadata = {
  title: 'Cart',
}

export default function Cart() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <CartContents />
      </div>
    </div>
  )
}
