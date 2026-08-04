'use client'

import Script from 'next/script'

export default function UmamiAnalytics() {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

    if (!websiteId) return null

    return (
        <Script
            id="umami-analytics"
            strategy="afterInteractive"
            src="/stats/script.js"
            data-website-id={websiteId}
            data-host-url="/stats"
            data-performance="true"
        />
    )
}