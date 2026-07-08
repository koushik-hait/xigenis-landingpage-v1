'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL!               // e.g. https://analytics.yourdomain.com
const UMAMI_USERNAME = process.env.UMAMI_USERNAME!     // your Umami login
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD!     // your Umami password
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!

// Validate website ID is a proper UUID
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
if (!UUID_REGEX.test(UMAMI_WEBSITE_ID)) {
  console.error(`[Umami] WARNING: Website ID "${UMAMI_WEBSITE_ID}" is not a valid UUID format. Expected: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
}

// ─── Auth helper ────────────────────────────────────────────────────────────

async function getUmamiToken(): Promise<string> {
  const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Umami auth failed: ${res.status}`)
  const data = (await res.json()) as { token: string }
  if (!data.token) throw new Error('Umami auth returned no token')
  return data.token
}

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  if (user.publicMetadata?.role !== 'admin') throw new Error('Forbidden')
}

function handleAnalyticsError<T>(error: unknown, fallback: T): T {
  if (
    error &&
    typeof error === 'object' &&
    'digest' in error &&
    error.digest === 'DYNAMIC_SERVER_USAGE'
  ) {
    throw error
  }
  console.error('[Umami] Analytics API failed:', error)
  return fallback
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type AnalyticsSummary = {
  pageviews: number
  visitors: number
  visits: number
  bounces: number
  totaltime: number
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

export type EventStats = {
  id: string
  websiteId: string
  sessionId: string
  createdAt: number
  urlPath: string
  urlQuery?: string
  referrerPath?: string
  referrerQuery?: string
  referrerDomain?: string
  pageTitle?: string
  eventType: number
  eventName: string
  hostname: string
  browser: string
  os: string
  device: string
  screen?: string
  language?: string
  country?: string
  subdivision1?: string
  subdivision2?: string
  city?: string
  hasData?: boolean
  data?: Record<string, string | number | boolean>
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
  try {
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
    if (!res.ok) throw new Error(`Umami stats API failed: ${res.status}`)
    return await res.json() as AnalyticsSummary
  } catch (error) {
    return handleAnalyticsError(error, {
      pageviews: 0,
      visitors: 0,
      visits: 0,
      bounces: 0,
      totaltime: 0,
    })
  }
}

// ─── Pageview time series ────────────────────────────────────────────────────

export async function getPageviewSeries(
  startAt: number,
  endAt: number,
  unit: 'day' | 'hour' = 'day'
): Promise<PageviewSeries[]> {
  try {
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
      pageviews?: { x: string; y: number }[]
      sessions?: { x: string; y: number }[]
    }

    const pageviews = Array.isArray(data.pageviews) ? data.pageviews : []
    const sessions = Array.isArray(data.sessions) ? data.sessions : []

    // Merge pageviews + sessions arrays into one series
    return pageviews.map((pv: { x: string; y: number }, i: number) => ({
      date: pv.x,
      pageviews: pv.y,
      sessions: sessions[i]?.y ?? 0,
    }))
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}

// ─── Top pages ───────────────────────────────────────────────────────────────

export async function getTopPages(
  startAt: number,
  endAt: number,
  limit = 10
): Promise<PageStats[]> {
  try {
    await assertAdmin()
    const token = await getUmamiToken()

    // console.log('Umami Token', token)

    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
      type: 'path',
      limit: String(limit),
    })

    const res = await fetch(
      `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )

    // console.log('Umami Response', res);
    if (!res.ok) {
      const errorText = await res.text()
      const requestUrl = `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${params}`
      console.error(`Umami topPages API 400: ${errorText}`)
      console.error(`Request URL: ${requestUrl}`)
      console.error(`Website ID length: ${UMAMI_WEBSITE_ID?.length}, ID: ${UMAMI_WEBSITE_ID}`)
      throw new Error(`Umami metrics API failed: ${res.status} - ${errorText}`)
    }
    const data = (await res.json()) as PageStats[]
    return Array.isArray(data) ? data : []
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}

// ─── Referrers ───────────────────────────────────────────────────────────────

export async function getReferrers(
  startAt: number,
  endAt: number,
  limit = 10
): Promise<ReferrerStats[]> {
  try {
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
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Umami referrers API 400: ${errorText}`)
      throw new Error(`Umami metrics API failed: ${res.status} - ${errorText}`)
    }
    const data = (await res.json()) as ReferrerStats[]
    return Array.isArray(data) ? data : []
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}

// ─── Devices ─────────────────────────────────────────────────────────────────

export async function getDevices(
  startAt: number,
  endAt: number
): Promise<DeviceStats[]> {
  try {
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
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Umami device API 400: ${errorText}`)
      throw new Error(`Umami metrics API failed: ${res.status} - ${errorText}`)
    }
    const data = (await res.json()) as DeviceStats[]
    return Array.isArray(data) ? data : []
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}

// ─── Countries ───────────────────────────────────────────────────────────────

export async function getCountries(
  startAt: number,
  endAt: number
): Promise<CountryStats[]> {
  try {
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
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Umami country API 400: ${errorText}`)
      throw new Error(`Umami metrics API failed: ${res.status} - ${errorText}`)
    }
    const data = (await res.json()) as CountryStats[]
    return Array.isArray(data) ? data : []
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}

// ─── Events ─────────────────────────────────────────────────────────────────

export async function getEvents(
  startAt: number,
  endAt: number,
  eventName?: string,
  limit = 100
): Promise<EventStats[]> {
  try {
    await assertAdmin()
    const token = await getUmamiToken()

    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
      pageSize: String(limit),
    })

    if (eventName) {
      params.append('search', eventName)
    }

    const res = await fetch(
      `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/events?${params}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Umami events API error: ${errorText}`)
      throw new Error(`Umami events API failed: ${res.status} - ${errorText}`)
    }
    const result = (await res.json()) as { data: EventStats[]; count: number; page: number; pageSize: number }
    return Array.isArray(result.data) ? result.data : []
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}

// ─── Event Data Details ───────────────────────────────────────────────────

export type EventDataDetail = {
  websiteId: string
  eventId: string
  eventName: string
  dataKey: string
  stringValue: string | null
  numberValue: number | null
  dateValue: string | null
  dataType: number
  createdAt: string
}

export async function getEventDataDetails(
  eventId: string,
  startAt: number,
  endAt: number,
  unit: 'hour' | 'day' = 'hour',
  timezone: string = 'Asia/Kolkata'
): Promise<EventDataDetail[]> {
  try {
    await assertAdmin()
    const token = await getUmamiToken()

    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
      unit,
      timezone,
    })

    const res = await fetch(
      `${UMAMI_URL}/api/websites/${UMAMI_WEBSITE_ID}/event-data/${eventId}?${params}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Umami event-data details API error: ${errorText}`)
      throw new Error(`Umami event-data details API failed: ${res.status} - ${errorText}`)
    }
    const data = (await res.json()) as EventDataDetail[]
    return Array.isArray(data) ? data : []
  } catch (error) {
    return handleAnalyticsError(error, [])
  }
}
