// ABOUTME: Tests for the checkout API route that creates Stripe Checkout Sessions.
// ABOUTME: Verifies commission descriptions are passed as metadata to Stripe.

import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the stripe module
const mockCreate = vi.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' })
vi.mock('@/lib/stripe', () => ({
  getStripe: () => ({
    checkout: {
      sessions: {
        create: mockCreate,
      },
    },
  }),
}))

const { POST } = await import('./route')

function buildRequest(body: Record<string, unknown>): Request {
  return new Request('http://localhost:3000/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: 'http://localhost:3000',
    },
    body: JSON.stringify(body),
  })
}

describe('POST /api/checkout', () => {
  beforeEach(() => {
    mockCreate.mockClear()
  })

  it('passes commission description as metadata to Stripe', async () => {
    const request = buildRequest({
      items: [{ priceId: 'price_commission', quantity: 1 }],
      description: 'A sunset over the Rocky Mountains',
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ url: 'https://checkout.stripe.com/test' })
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: { commission_description: 'A sunset over the Rocky Mountains' },
      })
    )
  })

  it('does not include metadata when no description is provided', async () => {
    const request = buildRequest({
      items: [{ priceId: 'price_painting', quantity: 1 }],
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mockCreate).toHaveBeenCalledWith(
      expect.not.objectContaining({
        metadata: expect.anything(),
      })
    )
  })

  it('returns 400 when no items are provided', async () => {
    const request = buildRequest({ items: [] })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'No items provided' })
  })
})
