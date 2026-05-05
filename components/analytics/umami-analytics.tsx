'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function UmamiAnalytics() {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

    if (!websiteId) return null

    useEffect(() => {
        // Debug: Check if Umami loaded after script execution
        const checkUmami = setTimeout(() => {
            if (typeof window !== 'undefined') {
                console.log('[Umami Debug] window.umami:', window.umami)
                console.log('[Umami Debug] Website ID:', websiteId)

                // Try to manually track a test event
                if (window.umami) {
                    console.log('[Umami] Tracking page view...')
                    window.umami.track('pageview')
                } else {
                    console.error('[Umami] window.umami not found - script may not have loaded correctly')
                }
            }
        }, 2000)

        return () => clearTimeout(checkUmami)
    }, [websiteId])

    return (
        <Script
            id="umami-analytics"
            strategy="afterInteractive"
            src="/stats/script.js"
            data-website-id={websiteId}
            data-host-url="/stats"
            data-performance="true"
            onLoad={() => {
                console.log('[Umami] Script loaded successfully')
            }}
            onError={(e) => {
                console.error('[Umami] Script failed to load:', e)
            }}
        />
    )
}