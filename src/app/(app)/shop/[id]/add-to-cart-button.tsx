// ABOUTME: Client component for adding a product to the cart.
// ABOUTME: Separated from the server component page for React Server Component boundaries.

'use client'

import { Button } from '@/components/button'
import { useCart } from '@/lib/cart-context'

export function AddToCartButton({
  priceId,
  productId,
  name,
  price,
}: {
  priceId: string
  productId: string
  name: string
  price: number
}) {
  const { addItem } = useCart()

  return <Button onClick={() => addItem({ priceId, productId, name, price })}>Add to Cart</Button>
}
