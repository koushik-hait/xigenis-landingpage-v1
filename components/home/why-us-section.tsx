"use client"

import React from "react"
import Image from "next/image"
import { Building2, BarChart3, ShieldCheck, UserCheck, CalendarDays, Zap } from "lucide-react"

import { ArrowUpRight } from "lucide-react"

const WhyChooseUsFooter = ({ stats }: { stats: any[] }) => {
  return (
    <div className="mx-auto mt-12 mb-24 w-full max-w-7xl px-4">
      <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-[#D9D9D9] p-6 md:flex-row md:gap-4 md:rounded-[2rem] md:p-10">
        {/* Statistics Grid */}
        <div className="flex w-full flex-col gap-10 md:w-auto md:flex-row md:gap-20">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="font-serif text-4xl tracking-tight text-black md:text-5xl">{stat.value}</div>
              <div className="max-w-[140px] text-[11px] leading-tight font-bold tracking-widest text-gray-600 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <button className="rounded-full bg-black px-8 py-4 text-[11px] font-black tracking-[0.2em] text-white uppercase shadow-lg transition-all hover:bg-gray-800">
            Book a Strategy Call
          </button>
          <div className="cursor-pointer rounded-full bg-[#FF6B35] p-4 shadow-lg shadow-orange-200 transition-transform duration-300 hover:rotate-45">
            <ArrowUpRight className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface WhyChooseUsProps {
  cmsContent?: any
}

const defaultIcons = [
  <Building2 key="1" className="h-6 w-6" />,
  <BarChart3 key="2" className="h-6 w-6 text-black" />,
  <ShieldCheck key="3" className="h-6 w-6 text-black" />,
  <UserCheck key="4" className="h-6 w-6 text-black" />,
  <CalendarDays key="5" className="h-6 w-6 text-black" />,
  <Zap key="6" className="h-6 w-6 text-black" />
]

const WhyChooseUs = ({ cmsContent }: WhyChooseUsProps) => {
  const content = {
    pillText: "WHY LEADERS CHOOSE US",
    heading: "Built for Those Who Close, Not Chase.",
    description: "We work exclusively with real estate professionals who want qualified pipeline — not vanity metrics.",
    features: [
      {
        title: "100% Real Estate DNA — No Generic Marketers",
        desc: "Every strategist, every campaign, every creative — built exclusively for real estate. We don't dabble in FMCG on Monday and run your ads on Friday.",
        tag: "Sector Specialists",
      },
      {
        title: "Real-Time Dashboard — Know Where Every Rupee Goes",
        desc: "Live spend tracking, cost-per-lead, and funnel data — 24/7. No monthly PDF surprises. Full transparency, always.",
        tag: "Full Transparency",
      },
      {
        title: "Bank-Level Data Security — Your Client Intel Stays Confidential",
        desc: "256-bit encryption, NDA-backed operations, and zero third-party data sharing. Your buyer lists never leave your vault.",
        tag: "Enterprise-Grade",
      },
      {
        title: "Dedicated Success Manager — One Point. Full Ownership.",
        desc: "A senior strategist owns your account end-to-end. No ticket queues, no rotating junior teams — one expert accountable for your growth.",
        tag: "Senior-Only Teams",
      },
      {
        title: "Quarterly Strategy Sessions — Growth Mapped, Not Guessed",
        desc: "Sit with senior leadership every quarter. Audit campaigns, revise targeting, and co-build a 90-day roadmap aligned to your sales calendar.",
        tag: "Executive Access",
      },
      {
        title: "Performance-Only Philosophy",
        desc: "We don't get comfortable on retainers. Every rupee is tied to a metric. If the numbers don't move, we don't sleep.",
        tag: "ROI Obsessed",
      },
    ],
    footerStats: [
      { value: "₹47Cr+", label: "Property Pipeline Created" },
      { value: "2.4L+", label: "Verified Leads Delivered" },
      { value: "98%", label: "Client Retention Rate" },
    ],
    ...cmsContent
  }

  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-block rounded-full border border-orange-200 bg-orange-50 px-5 py-1 text-[10px] font-bold tracking-[0.2em] text-orange-600 uppercase">
            {content.pillText}
          </div>
          <h2 className="font-serif text-4xl leading-tight text-gray-900 md:text-5xl whitespace-pre-line">
            {content.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 whitespace-pre-line">
            {content.description}
          </p>
        </div>

        {/* Feature Grid */}
        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto snap-x snap-mandatory -mx-4 px-4">
            <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
              {content.features.map((feature: any, index: number) => {
                const isFeatured = index === 0;
                return (
                <div key={index} className="flex-shrink-0 w-[85vw] max-w-md snap-center">
                  <div
                    className={`relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${isFeatured
                        ? "border-transparent bg-black text-white"
                        : "border-gray-100 bg-white text-gray-900 shadow-sm"
                      }`}
                  >
                    {/* Featured Background Image */}
                    {isFeatured && (
                      <div className="absolute inset-0 opacity-30 grayscale transition-all duration-700 hover:grayscale-0">
                        <Image src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop" alt="Building" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      </div>
                    )}

                    {/* Icon Container */}
                    <div
                      className={`relative z-10 mb-8 flex h-12 w-12 items-center justify-center rounded-full ${isFeatured ? "bg-white text-black" : "bg-gray-100"
                        }`}
                    >
                      {defaultIcons[index % defaultIcons.length]}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-grow space-y-4">
                      <h3 className={`text-xl leading-snug font-bold whitespace-pre-line ${isFeatured ? "text-white" : "text-gray-900"}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm leading-relaxed whitespace-pre-line ${isFeatured ? "text-gray-300" : "text-gray-500"}`}>
                        {feature.desc}
                      </p>
                    </div>

                    {/* Bottom Tag */}
                    <div className="relative z-10 mt-8">
                      <span
                        className={`inline-block rounded-md px-3 py-1 text-[9px] font-bold tracking-wider uppercase ${isFeatured ? "border border-white/20 bg-white/10 text-gray-300" : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {feature.tag}
                      </span>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:grid-cols-3">
          {content.features.map((feature: any, index: number) => {
            const isFeatured = index === 0;
            return (
            <div
              key={index}
              className={`relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${isFeatured
                  ? "border-transparent bg-black text-white"
                  : "border-gray-100 bg-white text-gray-900 shadow-sm"
                }`}
            >
              {/* Featured Background Image */}
              {isFeatured && (
                <div className="absolute inset-0 opacity-30 grayscale transition-all duration-700 hover:grayscale-0">
                  <Image src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop" alt="Building" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`relative z-10 mb-8 flex h-12 w-12 items-center justify-center rounded-full ${isFeatured ? "bg-white text-black" : "bg-gray-100"
                  }`}
              >
                {defaultIcons[index % defaultIcons.length]}
              </div>

              {/* Content */}
              <div className="relative z-10 flex-grow space-y-4">
                <h3 className={`text-xl leading-snug font-bold whitespace-pre-line ${isFeatured ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed whitespace-pre-line ${isFeatured ? "text-gray-300" : "text-gray-500"}`}>
                  {feature.desc}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="relative z-10 mt-8">
                <span
                  className={`inline-block rounded-md px-3 py-1 text-[9px] font-bold tracking-wider uppercase ${isFeatured ? "border border-white/20 bg-white/10 text-gray-300" : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {feature.tag}
                </span>
              </div>
            </div>
          )})}
        </div>
      </div>
      <WhyChooseUsFooter stats={content.footerStats} />
    </section>
  )
}

export { WhyChooseUs }
