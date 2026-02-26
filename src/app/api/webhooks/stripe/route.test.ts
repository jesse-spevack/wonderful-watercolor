// ABOUTME: Tests for the Stripe webhook handler that processes checkout.session.completed events.
// ABOUTME: Uses Stripe SDK's generateTestHeaderString to create valid test signatures.

import Stripe from 'stripe'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const TEST_WEBHOOK_SECRET = 'whsec_test_secret'

// Mock environment variable before importing the route
vi.stubEnv('STRIPE_WEBHOOK_SECRET', TEST_WEBHOOK_SECRET)
// Stub the Stripe secret key so the stripe client initializes
vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_fake')

// Import POST after env stubs are set
const { POST } = await import('./route')

const stripe = new Stripe('sk_test_fake')

function buildCheckoutSessionPayload(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    id: 'evt_test_123',
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_abc',
        object: 'checkout.session',
        customer_email: 'buyer@example.com',
        metadata: { order_type: 'painting' },
        ...overrides,
      },
    },
  })
}

function buildEventPayload(type: string, data: Record<string, unknown> = {}) {
  return JSON.stringify({
    id: 'evt_test_456',
    object: 'event',
    type,
    data: {
      object: {
        id: 'ch_test_xyz',
        ...data,
      },
    },
  })
}

function createSignedRequest(payload: string, secret: string = TEST_WEBHOOK_SECRET): Request {
  const header = stripe.webhooks.generateTestHeaderString({
    payload,
    secret,
  })
  return new Request('http://localhost:3000/api/webhooks/stripe', {
    method: 'POST',
    headers: { 'stripe-signature': header },
    body: payload,
  })
}

describe('POST /api/webhooks/stripe', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns 200 for a valid checkout.session.completed event', async () => {
    const payload = buildCheckoutSessionPayload()
    const request = createSignedRequest(payload)

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
  })

  it('returns 400 for an invalid signature', async () => {
    const payload = buildCheckoutSessionPayload()
    const header = stripe.webhooks.generateTestHeaderString({
      payload,
      secret: 'whsec_wrong_secret',
    })
    const request = new Request('http://localhost:3000/api/webhooks/stripe', {
      method: 'POST',
      headers: { 'stripe-signature': header },
      body: payload,
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Webhook signature verification failed' })
  })

  it('returns 400 when signature header is missing', async () => {
    const payload = buildCheckoutSessionPayload()
    const request = new Request('http://localhost:3000/api/webhooks/stripe', {
      method: 'POST',
      body: payload,
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Webhook signature verification failed' })
  })

  it('returns 200 for unhandled event types', async () => {
    const payload = buildEventPayload('charge.failed')
    const request = createSignedRequest(payload)

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ received: true })
  })

  it('logs session details for checkout.session.completed', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const payload = buildCheckoutSessionPayload({
      customer_email: 'artist@example.com',
    })
    const request = createSignedRequest(payload)

    await POST(request)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('checkout.session.completed'),
      expect.objectContaining({
        sessionId: 'cs_test_abc',
        customerEmail: 'artist@example.com',
      })
    )
  })
})
