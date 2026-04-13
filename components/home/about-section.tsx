"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface AboutSectionProps {
  cmsContent?: any
}

export function AboutSection({ cmsContent }: AboutSectionProps) {
  const content = {
    bgImage: "/assets/about-bg.png",
    pillText: "About Us",
    heading: "About Company",
    description:
      "At Xigenis, we help real estate professionals build a predictable pipeline of qualified property buyers. \n\nOur system combines AI-driven lead generation, targeted campaigns, and smart follow-up automation to attract serious buyers and close more deals consistently.",
    btnText: "Build My Pipeline",
    btnLink: "#",
    stat1Value: "2X",
    stat1Label: "Faster Growth",
    stat1Sub: "Vs Industry Peers",
    stat2Value: "4X",
    stat2Label: "Higher Sales",
    stat2Sub: "Vs Non-Clients",
    gridStat1Value: "90+",
    gridStat1Label: "Real Estate \n Professionals Served",
    gridStat2Value: "₹25 Cr+",
    gridStat2Label: "Property Pipeline \n Created",
    gridStat3Value: "5000+",
    gridStat3Label: "Qualified Buyer \n Leads Generated",
    gridStat4Value: "15+",
    gridStat4Label: "Cities Covered \n Across India",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-white py-10"
      style={{
        backgroundImage: `url('${content.bgImage}')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-8xl relative container mx-auto flex flex-col gap-60 lg:gap-4 px-4 sm:px-6 lg:px-8">
        {/* ROW 1: Top Content: Heading & Description */}
        <div className="relative z-20 mb-12 max-w-xl">
          <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-xs font-bold tracking-widest text-gray-600 uppercase">
            {content.pillText}
          </div>
          <h2
            className="mb-6 font-serif text-4xl whitespace-pre-line text-gray-900 lg:text-5xl"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h2>
          <p
            className="mb-8 text-base leading-relaxed whitespace-pre-line text-gray-600 lg:text-lg"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>

          {/* CTA Button */}
          <Link
            href={content.btnLink}
            className="group flex items-center gap-3 rounded-full bg-black py-2 pr-2 pl-8 text-white transition-transform hover:scale-105"
          >
            <span className="text-xs font-bold tracking-widest uppercase">{content.btnText}</span>
            <div className="rounded-full bg-orange-500 p-2">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </div>
          </Link>
        </div>

        {/* ROW 2: Central Visual & Stat Cards */}
        <div className="relative mt-16 flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:gap-12">
          {/* Left Stat Card (2X / 4X) */}
          <div className="z-20 w-full rounded-[15px] border border-white/20 bg-black/50 p-6 text-white shadow-2xl backdrop-blur-sm lg:w-64">
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl">{content.stat1Value}</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-200 uppercase">
                    {content.stat1Label}
                  </span>
                </div>
                <p className="mt-1 text-[9px] text-gray-200 italic">{content.stat1Sub}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl">{content.stat2Value}</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-200 uppercase">
                    {content.stat2Label}
                  </span>
                </div>
                <p className="mt-1 text-[9px] text-gray-200 italic">{content.stat2Sub}</p>
              </div>
            </div>
          </div>

          {/* Right Stat Card (Grid Layout) */}
          <div className="z-20 w-full rounded-3xl border border-white/20 bg-black/40 p-8 text-white shadow-2xl backdrop-blur-md lg:max-w-[350px]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {/* Stat 1 */}
              <div className="space-y-1">
                <span className="font-serif text-2xl lg:text-3xl">{content.gridStat1Value}</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight whitespace-pre-line text-gray-300 uppercase">
                  {content.gridStat1Label}
                </p>
              </div>
              {/* Stat 2 */}
              <div className="space-y-1">
                <span className="font-serif text-2xl lg:text-3xl">{content.gridStat2Value}</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight whitespace-pre-line text-gray-300 uppercase">
                  {content.gridStat2Label}
                </p>
              </div>
              {/* Stat 3 */}
              <div className="space-y-1">
                <span className="font-serif text-2xl lg:text-3xl">{content.gridStat3Value}</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight whitespace-pre-line text-gray-300 uppercase">
                  {content.gridStat3Label}
                </p>
              </div>
              {/* Stat 4 */}
              <div className="space-y-1 border-l border-white/10 pl-4">
                <span className="font-serif text-2xl lg:text-3xl">{content.gridStat4Value}</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight whitespace-pre-line text-gray-300 uppercase">
                  {content.gridStat4Label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element (Subtle radial gradient) */}
      <div className="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.05)_0%,_transparent_70%)]" />
    </section>
  )
}
