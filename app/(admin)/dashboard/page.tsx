import {
  getAnalyticsSummary,
  getDevices,
  getEventData,
  getEvents,
  getPageviewSeries,
  getReferrers,
  getTopPages,
} from '../../actions/analytics'
import AnalyticsDashboard from '../../../components/admin/analytic-dashboard'

export default async function AnalyticsPage() {
  // Default: last 30 days
  const endAt = Date.now()
  const startAt = endAt - 30 * 24 * 60 * 60 * 1000

  const [summary, series, topPages, referrers, devices, events, eventData] = await Promise.all([
    getAnalyticsSummary(startAt, endAt),
    getPageviewSeries(startAt, endAt, 'day'),
    getTopPages(startAt, endAt),
    getReferrers(startAt, endAt),
    getDevices(startAt, endAt),
    getEvents(startAt, endAt, undefined, 50),
    getEventData(startAt, endAt, 50),
  ])

  return (
    <AnalyticsDashboard
      summary={summary}
      series={series}
      topPages={topPages}
      referrers={referrers}
      devices={devices}
      events={events}
      eventData={eventData}
      initialRange="30d"
    />
  )
}