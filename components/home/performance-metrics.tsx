"use client"

import React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile"

interface PerformanceMetricsProps {
  cmsContent?: any
}

const PerformanceMetrics = ({ cmsContent }: PerformanceMetricsProps) => {
  const isMobile = useIsMobile()

  const content = {
    pillText: "Sales Insights",
    heading: "Real Estate \n Performance Metrics",
    description: "Turning property insights into measurable success across every segment.",
    btnText: "See How It Works",
    mainCardBg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    mainCardTitle: "Residential Real Estate",
    mainCardSubtitle: "Achievement Metrics:",
    mainCardStat1Value: "340+",
    mainCardStat1Label: "Residential Campaigns Delivered",
    mainCardStat2Value: "78%",
    mainCardStat2Label: "Pre-Qualified Buyer Rate",
    metricsData: [
      {
        title: "Commercial Real Estate",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92af1bd?q=80&w=2072&auto=format&fit=crop",
      },
      {
        title: "Industrial Real Estate",
        image: "https://images.unsplash.com/photo-1590674116584-d131495c256a?q=80&w=2070&auto=format&fit=crop",
      },
      {
        title: "Farmlands & Farmhouses",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
      },
      {
        title: "Special Purpose Real Estate",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1996&auto=format&fit=crop",
      },
    ],
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="flex w-full items-center overflow-hidden bg-white py-10">
      <div className="max-w-8xl container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-8">
          {/* Left Column: Heading & Intro */}
          <div className="flex w-full flex-col lg:w-[35%]">
            <div className="col-span-1 w-full space-y-8 lg:sticky lg:top-10">
              <div className="inline-block rounded-full bg-[#D9D9D9] px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#333] uppercase">
                {content.pillText}
              </div>
              <h2
                className="font-serif text-2xl leading-tight whitespace-pre-line text-gray-900 lg:text-3xl"
                style={{ fontSize: `${content.headingSize}px`, lineHeight: `${content.headingSize * 1.2}px` }}
              >
                {content.heading}
              </h2>
              <p
                className="max-w-md text-lg leading-relaxed text-gray-600"
                style={{ fontSize: `${content.descriptionSize}px` }}
              >
                {content.description}
              </p>

              {/* CTA Button */}
              <button className="group flex items-center gap-3 rounded-full bg-black px-8 py-3 text-white transition-transform hover:scale-105">
                <span className="text-[10px] font-bold tracking-widest uppercase">{content.btnText}</span>
                <div className="rounded-full bg-orange-500 p-2">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </button>
            </div>

            <div className="relative col-span-1 mt-12 flex min-h-[200px] flex-col overflow-hidden rounded-[2rem] bg-[#1A1A1A] p-8 md:col-span-1">
              {/* Background image with fade */}
              <div className="absolute inset-0 z-0 opacity-20 grayscale">
                <Image
                  src={content.mainCardBg}
                  alt={content.mainCardTitle}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              </div>

              <div className="relative z-10 space-y-4">
                <h3 className="font-serif text-3xl text-white">{content.mainCardTitle}</h3>
                <p className="text-sm font-bold tracking-widest text-gray-300 uppercase">{content.mainCardSubtitle}</p>
              </div>

              {/* Achievement Metrics Boxes */}
              <div className="relative z-10 mt-5 grid grid-cols-2 gap-4 border-t border-gray-700 pt-8">
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner backdrop-blur-sm">
                  <span className="font-serif text-3xl text-white">{content.mainCardStat1Value}</span>
                  <p className="text-center text-[10px] leading-tight font-medium tracking-wider text-gray-400 uppercase">
                    {content.mainCardStat1Label}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner backdrop-blur-sm">
                  <span className="font-serif text-3xl text-white">{content.mainCardStat2Value}</span>
                  <p className="text-center text-[10px] leading-tight font-medium tracking-wider text-gray-400 uppercase">
                    {content.mainCardStat2Label}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Masonry Grid of Cards */}
          <div
            className={`relative ${
              isMobile
                ? "-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pt-2 pb-4"
                : "grid grid-cols-1 gap-6 md:grid-cols-2"
            } w-full lg:w-[65%]`}
          >
            {content.metricsData.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-2xl ${
                    isMobile ? "h-[250px] min-w-[280px] snap-center" : "col-span-1 min-h-[250px]"
                  }`}
                >
                  {/* Background image with hover zoom */}
                  <div className="absolute inset-0 z-0 opacity-90 transition-transform duration-500 group-hover:scale-105">
                    <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                    <button className="border-b-2 border-orange-500 pb-1 text-[11px] font-bold tracking-widest text-gray-200 uppercase transition-colors hover:text-white">
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { PerformanceMetrics }
