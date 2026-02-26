// ABOUTME: Seeds Stripe with the Wonderful Watercolor product catalog.
// ABOUTME: Creates 5 painting products and 1 commission product with prices.

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const products = [
  {
    name: 'Birds in Sky',
    description: 'Colorful birds soaring through a soft, open sky. Original watercolor painting.',
    price: 2500,
    metadata: { type: 'painting' },
  },
  {
    name: 'Mountainous Horizon',
    description: 'A sweeping mountain landscape stretching toward a distant horizon. Original watercolor painting.',
    price: 3000,
    metadata: { type: 'painting' },
  },
  {
    name: 'Sun Flower',
    description: 'A bright sunflower with vivid green stems reaching toward the light. Original watercolor painting.',
    price: 2000,
    metadata: { type: 'painting' },
  },
  {
    name: 'House on Hill',
    description: 'A cozy house perched on a hill beneath a starlit night sky. Original watercolor painting.',
    price: 3500,
    metadata: { type: 'painting' },
  },
  {
    name: 'Helping Hand',
    description: 'A realistic portrait of a young girl\'s hand, painted with care and detail. Original watercolor painting.',
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
