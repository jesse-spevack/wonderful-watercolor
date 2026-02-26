// ABOUTME: Client component for adding a commission to the cart.
// ABOUTME: Reuses cart context to add the commission product.

'use client'

import { Button } from '@/components/button'
import { useCart } from '@/lib/cart-context'

export function CommissionPurchaseButton({
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

  return <Button onClick={() => addItem({ priceId, productId, name, price })}>Add Commission to Cart</Button>
}
