// ABOUTME: Cart page showing items in the shopping cart.
// ABOUTME: Delegates to CartContents client component for interactivity.

import { Heading } from '@/components/heading'
import type { Metadata } from 'next'
import { CartContents } from './cart-contents'

export const metadata: Metadata = {
  title: 'Cart',
}

export default function Cart() {
  return (
    <>
      <Heading>Your Cart</Heading>
      <CartContents />
    </>
  )
}
