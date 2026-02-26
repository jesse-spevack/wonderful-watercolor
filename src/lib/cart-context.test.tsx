// ABOUTME: Tests for the cart context provider and useCart hook.
// ABOUTME: Verifies that addItem stores optional description on cart items.

// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { CartProvider, useCart } from './cart-context'

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('useCart', () => {
  it('stores description when addItem is called with one', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        priceId: 'price_commission',
        productId: 'prod_commission',
        name: 'Custom Commission',
        price: 5000,
        description: 'A painting of a sunset',
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].description).toBe('A painting of a sunset')
  })

  it('works without description for regular items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        priceId: 'price_painting',
        productId: 'prod_painting',
        name: 'Sunset Garden',
        price: 2500,
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].description).toBeUndefined()
  })

  it('increments quantity but preserves description on duplicate add', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        priceId: 'price_commission',
        productId: 'prod_commission',
        name: 'Custom Commission',
        price: 5000,
        description: 'A painting of a sunset',
      })
    })

    act(() => {
      result.current.addItem({
        priceId: 'price_commission',
        productId: 'prod_commission',
        name: 'Custom Commission',
        price: 5000,
        description: 'A painting of a sunset',
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.items[0].description).toBe('A painting of a sunset')
  })
})
