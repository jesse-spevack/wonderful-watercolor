// ABOUTME: One-time script to rename existing Stripe painting products.
// ABOUTME: Maps old product names to new names and descriptions.

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const RENAMES = {
  'Sunset Garden': {
    name: 'Birds in Sky',
    description: 'Colorful birds soaring through a soft, open sky. Original watercolor painting.',
  },
  'Ocean Waves': {
    name: 'Mountainous Horizon',
    description: 'A sweeping mountain landscape stretching toward a distant horizon. Original watercolor painting.',
  },
  'Rainbow Flowers': {
    name: 'Sun Flower',
    description: 'A bright sunflower with vivid green stems reaching toward the light. Original watercolor painting.',
  },
  'Starry Night Sky': {
    name: 'House on Hill',
    description: 'A cozy house perched on a hill beneath a starlit night sky. Original watercolor painting.',
  },
  'Forest Friends': {
    name: 'Helping Hand',
    description: "A realistic portrait of a young girl's hand, painted with care and detail. Original watercolor painting.",
  },
}

async function rename() {
  const products = await stripe.products.list({ active: true, limit: 100 })
  const paintings = products.data.filter((p) => p.metadata.type === 'painting')

  for (const product of paintings) {
    const rename = RENAMES[product.name]
    if (!rename) {
      console.log(`Skipping unknown product: ${product.name}`)
      continue
    }

    await stripe.products.update(product.id, {
      name: rename.name,
      description: rename.description,
    })

    console.log(`Renamed: ${product.name} → ${rename.name}`)
  }

  console.log('\nDone!')
}

rename().catch(console.error)
