// ABOUTME: Functions to fetch product catalog from Stripe.
// ABOUTME: Stripe is the source of truth for all products and prices.

import { stripe } from './stripe'
import type Stripe from 'stripe'

const LOCAL_IMAGES: Record<string, string> = {
  'Sunset Garden': '/paintings/sunset-garden.jpg',
  'Ocean Waves': '/paintings/ocean-waves.jpg',
  'Rainbow Flowers': '/paintings/rainbow-flowers.jpg',
  'Starry Night Sky': '/paintings/starry-night-sky.jpg',
  'Forest Friends': '/paintings/forest-friends.jpg',
}

export interface Product {
  id: string
  name: string
  description: string | null
  images: string[]
  price: {
    id: string
    amount: number
    currency: string
    formatted: string
  }
  metadata: Stripe.Metadata
}

async function toProduct(product: Stripe.Product, prices: Stripe.Price[]): Promise<Product | null> {
  const price = prices.find((p) => p.product === product.id)
  if (!price || !price.unit_amount) return null

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images.length > 0 ? product.images : LOCAL_IMAGES[product.name] ? [LOCAL_IMAGES[product.name]] : [],
    price: {
      id: price.id,
      amount: price.unit_amount,
      currency: price.currency,
      formatted: `$${(price.unit_amount / 100).toFixed(2)}`,
    },
    metadata: product.metadata,
  }
}

export async function getPaintings(): Promise<Product[]> {
  const [productsResponse, pricesResponse] = await Promise.all([
    stripe.products.list({ active: true, limit: 100 }),
    stripe.prices.list({ active: true, limit: 100 }),
  ])

  const products = await Promise.all(
    productsResponse.data
      .filter((p) => p.metadata.type === 'painting')
      .map((p) => toProduct(p, pricesResponse.data))
  )

  return products.filter((p): p is Product => p !== null)
}

export async function getCommission(): Promise<Product | null> {
  const [productsResponse, pricesResponse] = await Promise.all([
    stripe.products.list({ active: true, limit: 100 }),
    stripe.prices.list({ active: true, limit: 100 }),
  ])

  const commission = productsResponse.data.find((p) => p.metadata.type === 'commission')
  if (!commission) return null

  return toProduct(commission, pricesResponse.data)
}

export async function getProduct(id: string): Promise<Product | null> {
  const [product, pricesResponse] = await Promise.all([
    stripe.products.retrieve(id),
    stripe.prices.list({ product: id, active: true, limit: 1 }),
  ])

  if (!product.active || pricesResponse.data.length === 0) return null
  return toProduct(product, pricesResponse.data)
}
