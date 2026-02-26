// ABOUTME: Client-side shopping cart state managed via React context.
// ABOUTME: No persistence — resets on page refresh (acceptable for POC).

'use client'

import { createContext, useCallback, useContext, useState } from 'react'

export interface CartItem {
  priceId: string
  productId: string
  name: string
  price: number
  quantity: number
  description?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (priceId: string) => void
  updateQuantity: (priceId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.priceId === item.priceId)
      if (existing) {
        return prev.map((i) => (i.priceId === item.priceId ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((priceId: string) => {
    setItems((prev) => prev.filter((i) => i.priceId !== priceId))
  }, [])

  const updateQuantity = useCallback((priceId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.priceId !== priceId))
      return
    }
    setItems((prev) => prev.map((i) => (i.priceId === priceId ? { ...i, quantity } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
