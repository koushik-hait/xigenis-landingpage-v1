"use client"

import React from "react"

interface ReasonsSectionProps {
  cmsContent?: any
}

const ReasonsSection = ({ cmsContent }: ReasonsSectionProps) => {
  const content = {
    pillText: "LOREM IPSUM DOLOR SIT",
    heading: "8 Reasons Top Real Estate Professionals \n Choose Our AI Lead System",
    description:
      "Most agencies promise leads. We build a predictable pipeline of qualified property buyers that turns into site visits and closed deals.",
    reasons: [
      {
        tag: "EXCLUSIVE MARKET ACCESS",
        title: "Secure Your Market Before a Competitor Does & Own Your City",
        desc: "We take one client per property segment per city. Once your slot is filled, your competitors can never access the same system — ever.",
      },
      {
        tag: "RESULTS-FOCUSED SYSTEM",
        title: "We Measure Success Only by Closed Deals",
        desc: "Unlike traditional marketing agencies that focus on impressions or clicks, our system is built around real outcomes.",
      },
      {
        tag: "AI Lead Qualification",
        title: "Speak Only With Serious Buyers",
        desc: "Our AI system filters leads based on intent, engagement, and buying capability, ensuring you spend time only with potential buyers.",
      },
      {
        tag: "Automated Follow-Up System",
        title: "Every Lead Gets Instant Attention",
        desc: "Most deals are lost because agents respond too late. Our system follows up with every inquiry instantly.",
      },
      {
        tag: "Data-Driven Campaign Strategy",
        title: "Advertising Designed for Real Buyers",
        desc: "Instead of generic ads, we create campaigns focused on people actively searching for properties in your market.",
      },
      {
        tag: "Authority Positioning",
        title: "Become the Trusted Expert in Your Market",
        desc: "We help position you as a trusted property advisor, increasing credibility and attracting serious buyers.",
      },
      {
        tag: "Predictable Lead Pipeline",
        title: "Speak Only With Serious Buyers",
        desc: "Our system creates a steady flow of qualified property buyers, so you no longer depend on random portal leads.",
      },
      {
        tag: "Automated Follow-Up System",
        title: "See Measurable Results Within 90 Days",
        desc: "From campaign launch to site visits and bookings, our framework is designed to deliver visible progress within three months.",
      },
    ],
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="w-full bg-[#f8f8f8] py-24">
      <div className="max-w-8xl container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-block rounded-full border border-gray-400 px-6 py-1 text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
            {content.pillText}
          </div>
          <h2
            className="font-serif text-4xl leading-tight whitespace-pre-line text-gray-900 md:text-5xl"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg whitespace-pre-line text-gray-500"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>
        </div>

        {/* Grid Section */}
        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {content.reasons.map((reason: any, index: number) => (
                <div key={index} className="w-[85vw] max-w-sm flex-shrink-0 snap-center">
                  <div className="group relative flex h-[250px] flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
                    {/* Large Background Number */}
                    <span className="pointer-events-none absolute top-4 right-4 font-serif text-9xl text-gray-100 outline-1 outline-gray-200 transition-colors select-none group-hover:text-gray-200">
                      {index + 1}
                    </span>

                    <div className="relative z-10 flex h-full flex-col">
                      {/* Tag */}
                      <div className="mb-4">
                        <span className="inline-block rounded-full border border-gray-200 px-3 py-1 text-[9px] font-bold tracking-wider text-gray-500 uppercase">
                          {reason.tag}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="mb-4 font-serif text-xl leading-snug whitespace-pre-line text-gray-900">
                        {reason.title}
                      </h3>
                      <p className="mb-6 text-sm leading-relaxed whitespace-pre-line text-gray-500">{reason.desc}</p>

                      {/* Bottom Guaranteed Tag */}
                      <div className="mt-auto">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold tracking-widest text-orange-500 uppercase">
                          1 client per city zone — guaranteed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4">
          {content.reasons.map((reason: any, index: number) => (
            <div
              key={index}
              className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Large Background Number */}
              <span className="font text-outline pointer-events-none absolute top-4 right-4 font-serif text-9xl text-gray-50 transition-colors select-none group-hover:text-gray-200">
                {index + 1}
              </span>

              <div className="relative z-10 flex h-full flex-col">
                {/* Tag */}
                <div className="mb-4">
                  <span className="inline-block rounded-full border border-gray-200 px-3 py-1 text-[9px] font-bold tracking-wider text-gray-500 uppercase">
                    {reason.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-4 font-serif text-xl leading-snug whitespace-pre-line text-gray-900">
                  {reason.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed whitespace-pre-line text-gray-500">{reason.desc}</p>

                {/* Bottom Guaranteed Tag */}
                <div className="mt-auto">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold tracking-widest text-orange-500 uppercase">
                    1 client per city zone — guaranteed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ReasonsSection }
