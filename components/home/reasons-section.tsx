"use client"

import React from "react"

const reasons = [
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
]

const ReasonsSection = () => {
  return (
    <section className="w-full bg-[#f8f8f8] py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-block rounded-full border border-gray-400 px-6 py-1 text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
            LOREM IPSUM DOLOR SIT
          </div>
          <h2 className="font-serif text-4xl leading-tight text-gray-900 md:text-5xl">
            8 Reasons Top Real Estate Professionals <br className="hidden md:block" /> Choose Our AI Lead System
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            Most agencies promise leads. We build a predictable pipeline of qualified property buyers that turns into
            site visits and closed deals.
          </p>
        </div>

        {/* Grid Section */}
        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto snap-x snap-mandatory -mx-4 px-4">
            <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] max-w-sm snap-center"
                >
                  <div className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl h-full">
                    {/* Large Background Number */}
                    <span className="pointer-events-none absolute top-4 right-4 font-serif text-8xl text-gray-50 transition-colors select-none group-hover:text-gray-100">
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
                      <h3 className="mb-4 font-serif text-xl leading-snug text-gray-900">{reason.title}</h3>
                      <p className="mb-6 text-sm leading-relaxed text-gray-500">{reason.desc}</p>

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
        <div className="hidden md:grid grid-cols-2 gap-6 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Large Background Number */}
              <span className="pointer-events-none absolute top-4 right-4 font-serif text-8xl text-gray-50 transition-colors select-none group-hover:text-gray-100">
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
                <h3 className="mb-4 font-serif text-xl leading-snug text-gray-900">{reason.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-500">{reason.desc}</p>

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
