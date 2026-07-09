import Footer from "@/components/layouts/footer"
import { Header } from "@/components/layouts/header"
import { StickyCountdownBar } from "@/components/layouts/sticky-countdown-bar"
// import { WhatsAppButton } from "@/components/layouts/whatsapp-button"
import { WebVitals } from "@/components/analytics/web-vitals"
import { RandomToast } from "@/components/ui/random-toast"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import type React from "react"
import { Suspense } from "react"
import UmamiAnalytics from "@/components/analytics/umami-analytics"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Xigenis - AI Real Estate Lead Generation",
  description:
    "Generate qualified property buyer leads with Xigenis. AI-driven pipeline for top real estate professionals.",
  generator: "Next.js",
  keywords: ["real estate", "lead generation", "AI", "property buyers", "real estate leads"],
  authors: [{ name: "Xigenis" }],
  openGraph: {
    title: "Xigenis - AI Real Estate Lead Generation",
    description: "Generate qualified property buyer leads with Xigenis. AI-driven pipeline for top real estate professionals.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xigenis - AI Real Estate Lead Generation",
    description: "Generate qualified property buyer leads with Xigenis. AI-driven pipeline for top real estate professionals.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ domain: string }>
}) {
  const resolvedParams = await params
  const domain = resolvedParams?.domain || "default"

  return (
    <>
      <WebVitals />
      <UmamiAnalytics />
      <RandomToast enabled={true} />
      <div className={`font-sans ${montserrat.variable} ${poppins.variable} antialiased`}>
        <StickyCountdownBar domain={domain} />
        <Header />
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
      </div>
    </>
  )
}
