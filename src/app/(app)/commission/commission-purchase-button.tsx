// ABOUTME: Client component for adding a commission to the cart.
// ABOUTME: Styled as a full-width indigo button matching the Tailwind UI template.

'use client'

import { useCart } from '@/lib/cart-context'

export function CommissionPurchaseButton({
  priceId,
  productId,
  name,
  price,
  description,
}: {
  priceId: string
  productId: string
  name: string
  price: number
  description?: string
}) {
  const { addItem } = useCart()

  return (
    <button
      type="button"
      onClick={() => addItem({ priceId, productId, name, price, description })}
      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
    >
      Add Commission to Cart
    </button>
  )
}
