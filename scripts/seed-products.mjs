// ABOUTME: Seeds Stripe with the Wonderful Watercolor product catalog.
// ABOUTME: Creates 5 painting products and 1 commission product with prices.

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const products = [
  {
    name: 'Sunset Garden',
    description: 'A vibrant watercolor of a garden bathed in sunset light. Original painting on watercolor paper.',
    price: 2500,
    metadata: { type: 'painting' },
  },
  {
    name: 'Ocean Waves',
    description: 'Gentle ocean waves captured in soft blues and greens. Original painting on watercolor paper.',
    price: 3000,
    metadata: { type: 'painting' },
  },
  {
    name: 'Rainbow Flowers',
    description: 'A cheerful bouquet of rainbow-colored flowers. Original painting on watercolor paper.',
    price: 2000,
    metadata: { type: 'painting' },
  },
  {
    name: 'Starry Night Sky',
    description: 'A dreamy night sky filled with stars and swirling colors. Original painting on watercolor paper.',
    price: 3500,
    metadata: { type: 'painting' },
  },
  {
    name: 'Forest Friends',
    description: 'Woodland animals playing among the trees. Original painting on watercolor paper.',
    price: 2800,
    metadata: { type: 'painting' },
  },
  {
    name: 'Custom Commission',
    description:
      'Request a custom watercolor painting made just for you! Tell us what you would like and our artist will create a one-of-a-kind piece.',
    price: 5000,
    metadata: { type: 'commission' },
  },
]

async function seed() {
  console.log('Seeding Stripe products...\n')

  for (const p of products) {
    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: p.metadata,
    })

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.price,
      currency: 'usd',
    })

    console.log(`Created: ${p.name} (${product.id}) — $${(p.price / 100).toFixed(2)} (${price.id})`)
  }

  console.log('\nDone! Products are live in Stripe test mode.')
}

seed().catch(console.error)
