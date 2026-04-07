import Footer from "@/components/layouts/footer"
import { Header } from "@/components/layouts/header"
import { WhatsAppButton } from "@/components/layouts/whatsapp-button"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import type React from "react"
import { Suspense } from "react"

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
  generator: "Xigenis",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`font-sans ${montserrat.variable} ${poppins.variable} antialiased`}>
        <Header />
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
        <WhatsAppButton />\ {/* <Analytics /> */}
      </div>
    </>
  )
}
