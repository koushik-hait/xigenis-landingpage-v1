'use client'

import { useState, useTransition } from 'react'
import {
    getAnalyticsSummary,
    getPageviewSeries,
    getTopPages,
    getReferrers,
    getDevices,
    getEvents,
    type AnalyticsSummary,
    type PageviewSeries,
    type PageStats,
    type ReferrerStats,
    type DeviceStats,
    type EventStats,
} from '../../app/actions/analytics'

const RANGES = {
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
    '90d': 90 * 24 * 60 * 60 * 1000,
}

type Range = keyof typeof RANGES

type Props = {
    summary: AnalyticsSummary
    series: PageviewSeries[]
    topPages: PageStats[]
    referrers: ReferrerStats[]
    devices: DeviceStats[]
    events?: EventStats[]
    initialRange: Range
}

export default function AnalyticsDashboard({
    summary: initialSummary,
    series: initialSeries,
    topPages: initialPages,
    referrers: initialReferrers,
    devices: initialDevices,
    events: initialEvents = [],
    initialRange,
}: Props) {
    const [range, setRange] = useState<Range>(initialRange)
    const [summary, setSummary] = useState(initialSummary)
    const [series, setSeries] = useState(initialSeries)
    const [topPages, setTopPages] = useState(initialPages)
    const [referrers, setReferrers] = useState(initialReferrers)
    const [devices, setDevices] = useState(initialDevices)
    const [events, setEvents] = useState<EventStats[]>(initialEvents)
    const [isPending, startTransition] = useTransition()

    function switchRange(newRange: Range) {
        setRange(newRange)
        const endAt = Date.now()
        const startAt = endAt - RANGES[newRange]
        const unit = newRange === '24h' ? 'hour' : 'day'

        startTransition(async () => {
            const [s, pv, pages, refs, devs, evts] = await Promise.all([
                getAnalyticsSummary(startAt, endAt),
                getPageviewSeries(startAt, endAt, unit),
                getTopPages(startAt, endAt),
                getReferrers(startAt, endAt),
                getDevices(startAt, endAt),
                getEvents(startAt, endAt, 'admin_action', 20),
            ])
            setSummary(s)
            setSeries(pv)
            setTopPages(pages)
            setReferrers(refs)
            setDevices(devs)
            setEvents(evts)
        })
    }

    return (
        <div className={`p-6 space-y-6 ${isPending ? 'opacity-60' : ''}`}>

            {/* Header + range picker */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <div className="flex gap-2">
                    {(Object.keys(RANGES) as Range[]).map((r) => (
                        <button
                            key={r}
                            onClick={() => switchRange(r)}
                            className={`px-3 py-1 text-sm rounded border ${range === r ? 'bg-black text-white border-black' : 'border-gray-300'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Pageviews" value={summary.pageviews} change={0} />
                <StatCard label="Visitors" value={summary.visitors} change={0} />
                <StatCard label="Visits" value={summary.visits} change={0} />
                <StatCard label="Bounce rate" value={`${summary.bounces}%`} change={0} />
            </div>

            {/* Pageview chart */}
            <div className="border rounded-lg p-4">
                <h2 className="text-sm font-semibold mb-3 text-gray-600">Pageviews over time</h2>
                <SimpleLineChart data={series} />
            </div>

            {/* Bottom 3 cols */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricList title="Top Pages" items={topPages} />
                <MetricList title="Referrers" items={referrers} />
                <MetricList title="Devices" items={devices} />
            </div>

            {/* Admin Events List */}
            <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-gray-600">Admin Activity Log</h2>
                    <span className="text-xs text-gray-500">{events.length} recent events</span>
                </div>
                <EventsList events={events} />
            </div>
        </div>
    )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
    label,
    value,
    change,
}: {
    label: string
    value: number | string
    change: number
}) {
    return (
        <div className="border rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '▲' : '▼'} {Math.abs(change)}% vs prev period
            </p>
        </div>
    )
}

function MetricList({ title, items }: { title: string; items: { x: string; y: number }[] }) {
    const max = Math.max(...items.map((i) => i.y), 1)
    return (
        <div className="border rounded-lg p-4">
            <h2 className="text-sm font-semibold mb-3 text-gray-600">{title}</h2>
            <ul className="space-y-2">
                {items.slice(0, 8).map((item) => (
                    <li key={item.x}>
                        <div className="flex justify-between text-xs mb-0.5">
                            <span className="truncate max-w-[70%] text-gray-700">{item.x || '(direct)'}</span>
                            <span className="text-gray-500">{item.y.toLocaleString()}</span>
                        </div>
                        <div className="h-1 bg-gray-100 rounded">
                            <div
                                className="h-1 bg-black rounded"
                                style={{ width: `${(item.y / max) * 100}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function SimpleLineChart({ data }: { data: PageviewSeries[] }) {
    if (!data.length) return <p className="text-sm text-gray-400">No data</p>

    const maxPv = Math.max(...data.map((d) => d.pageviews), 1)
    const W = 600, H = 120, PAD = 10

    const points = data.map((d, i) => {
        const x = PAD + (i / (data.length - 1 || 1)) * (W - PAD * 2)
        const y = H - PAD - (d.pageviews / maxPv) * (H - PAD * 2)
        return `${x},${y}`
    })

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke="black"
                strokeWidth="2"
                points={points.join(' ')}
            />
            {data.map((d, i) => {
                const x = PAD + (i / (data.length - 1 || 1)) * (W - PAD * 2)
                const y = H - PAD - (d.pageviews / maxPv) * (H - PAD * 2)
                return (
                    <circle key={i} cx={x} cy={y} r="3" fill="black">
                        <title>{d.date}: {d.pageviews} pageviews</title>
                    </circle>
                )
            })}
        </svg>
    )
}

function EventsList({ events }: { events: EventStats[] }) {
    if (!events.length) {
        return <p className="text-sm text-gray-400">No admin activity recorded for this period.</p>
    }

    const getActionColor = (action: string) => {
        switch (action) {
            case 'create': return 'bg-green-100 text-green-700'
            case 'update': return 'bg-blue-100 text-blue-700'
            case 'delete': return 'bg-red-100 text-red-700'
            case 'upload': return 'bg-purple-100 text-purple-700'
            case 'save': return 'bg-orange-100 text-orange-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white border-b">
                    <tr className="text-left text-xs text-gray-500">
                        <th className="pb-2 pr-2">Time</th>
                        <th className="pb-2 pr-2">User</th>
                        <th className="pb-2 pr-2">Action</th>
                        <th className="pb-2 pr-2">Section</th>
                        <th className="pb-2">Details</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {events.map((event) => {
                        const data = event.data || {}
                        const action = data.action as string || 'unknown'
                        const section = data.section as string || '-'
                        const username = data.username as string || 'Unknown'
                        const details = data.details as string || ''

                        return (
                            <tr key={event.id} className="text-xs">
                                <td className="py-2 pr-2 text-gray-500 whitespace-nowrap">
                                    {formatTime(event.createdAt)}
                                </td>
                                <td className="py-2 pr-2 font-medium text-gray-700">
                                    {username}
                                </td>
                                <td className="py-2 pr-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActionColor(action)}`}>
                                        {action}
                                    </span>
                                </td>
                                <td className="py-2 pr-2 text-gray-600">
                                    {section}
                                </td>
                                <td className="py-2 text-gray-500 truncate max-w-xs" title={details}>
                                    {details || '-'}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}