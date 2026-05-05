import Script from 'next/script'

export default function UmamiAnalytics() {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
    const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

    if (!websiteId || !umamiUrl) return null

    return (
        <Script
            async
            src="/stats/script.js"
            data-website-id={websiteId}
            data-api="/stats/api/send"   // ← tells Umami where to send events
            data-performance="true"
        />
    )
}