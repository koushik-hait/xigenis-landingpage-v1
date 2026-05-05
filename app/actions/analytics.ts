'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL!               // e.g. https://analytics.yourdomain.com
const UMAMI_USERNAME = process.env.UMAMI_USERNAME!     // your Umami login
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD!     // your Umami password
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!

// ─── Auth helper ────────────────────────────────────────────────────────────

async function getUmamiToken(): Promise<string> {
  const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
    cache: 'no-store',
  })
  const data = (await res.json()) as { token: string }
  return data.token
}

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  if (user.publicMetadata?.role !== 'admin') throw new Error('Forbidden')
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type AnalyticsSummary = {
  pageviews: { value: number; change: number }
  visitors: { value: number; change: number }
  visits: { value: number; change: number }
  bounces: { value: number; change: number }
  totalTime: { value: number; change: number }
}

export type PageStats = {
  x: string   // page path
  y: number   // view count
}

export type ReferrerStats = {
  x: string   // referrer domain
  y: number
}

export type DeviceStats = {
  x: string   // device type
  y: number
}

export type CountryStats = {
  x: string   // country code
  y: number
}

export type PageviewSeries = {
  date: string
  pageviews: number
  sessions: number
}


// ─── Summary stats (visitors, pageviews, bounces…) ──────────────────────────

export async function getAnalyticsSummary(
  startAt: number,
  endAt: number
): Promise<AnalyticsSummary> {
  await assertAdmin()
  const token = await getUmamiToken()

  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
  })

  const res = await fetch(
    `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/stats?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  return res.json() as Promise<AnalyticsSummary>
}

// ─── Pageview time series ────────────────────────────────────────────────────

export async function getPageviewSeries(
  startAt: number,
  endAt: number,
  unit: 'day' | 'hour' = 'day'
): Promise<PageviewSeries[]> {
  await assertAdmin()
  const token = await getUmamiToken()

  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
    unit,
    timezone: 'Asia/Kolkata',   // change to your timezone
  })

  const res = await fetch(
    `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/pageviews?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  const data = (await res.json()) as {
    pageviews: { x: string; y: number }[]
    sessions: { x: string; y: number }[]
  }

  // Merge pageviews + sessions arrays into one series
  return data.pageviews.map((pv: { x: string; y: number }, i: number) => ({
    date: pv.x,
    pageviews: pv.y,
    sessions: data.sessions[i]?.y ?? 0,
  }))
}

// ─── Top pages ───────────────────────────────────────────────────────────────

export async function getTopPages(
  startAt: number,
  endAt: number,
  limit = 10
): Promise<PageStats[]> {
  await assertAdmin()
  const token = await getUmamiToken()

  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
    type: 'url',
    limit: String(limit),
  })

  const res = await fetch(
    `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  return res.json() as Promise<PageStats[]>
}

// ─── Referrers ───────────────────────────────────────────────────────────────

export async function getReferrers(
  startAt: number,
  endAt: number,
  limit = 10
): Promise<ReferrerStats[]> {
  await assertAdmin()
  const token = await getUmamiToken()

  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
    type: 'referrer',
    limit: String(limit),
  })

  const res = await fetch(
    `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  return res.json() as Promise<ReferrerStats[]>
}

// ─── Devices ─────────────────────────────────────────────────────────────────

export async function getDevices(
  startAt: number,
  endAt: number
): Promise<DeviceStats[]> {
  await assertAdmin()
  const token = await getUmamiToken()

  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
    type: 'device',
  })

  const res = await fetch(
    `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  return res.json() as Promise<DeviceStats[]>
}

// ─── Countries ───────────────────────────────────────────────────────────────

export async function getCountries(
  startAt: number,
  endAt: number
): Promise<CountryStats[]> {
  await assertAdmin()
  const token = await getUmamiToken()

  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
    type: 'country',
  })

  const res = await fetch(
    `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  return res.json() as Promise<CountryStats[]>
}
