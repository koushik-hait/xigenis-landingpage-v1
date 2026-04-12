"use client"

import React from "react"
import Image from "next/image"
import { CheckCircle2, ArrowUpRight } from "lucide-react"

interface ProcessFooterProps {
  highlights: { label: string; sub: string }[]
  btnText: string
}

const ProcessFooter: React.FC<ProcessFooterProps> = ({ highlights, btnText }) => {
  return (
    <div className="max-w-8xl mx-auto mt-12 mb-20 rounded-2xl border border-orange-100 bg-[#FFF5F1] px-6 py-4 shadow-sm md:rounded-full md:px-12">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start md:gap-12">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-2 lg:basis-0">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-[11px] font-black tracking-tighter whitespace-nowrap text-orange-600 uppercase">
                  {item.label}
                </span>
                <span className="text-[11px] font-bold tracking-tighter whitespace-nowrap text-gray-800 uppercase">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <button className="rounded-full bg-black px-8 py-3 text-[11px] font-black tracking-widest text-white uppercase transition-colors hover:bg-gray-800">
            {btnText}
          </button>
          <div className="cursor-pointer rounded-full bg-orange-500 p-3 shadow-lg shadow-orange-200 transition-transform hover:scale-105">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProcessTimelineProps {
  cmsContent?: any
}

const ProcessTimeline = ({ cmsContent }: ProcessTimelineProps) => {
  const content = {
    pillText: "OUR PROCESS",
    heading: "How We Build Your Revenue System in 15 Days",
    description: "Six phases. Three zones. Four senior experts. One outcome: deals closing on autopilot.",
    zones: [
      {
        id: 1,
        title: "Intelligence & Design",
        subtitle: "Where most agencies don't even start",
        owner: "Business Analyst",
        steps: [
          {
            id: 1,
            days: "Day 5-7",
            title: "Growth & Market Intelligence",
            desc: "Business audit, project reality check, demand analysis, competitive landscape mapping.",
            tag: "We diagnose before we deploy.",
          },
          {
            id: 2,
            days: "Day 3-4",
            title: "Funnel & Intent Architecture",
            desc: "Buyer journey design, intent signal mapping, lead scoring logic, CRM pipeline planning.",
            tag: "We diagnose before we deploy.",
          },
        ],
      },
      {
        id: 2,
        title: "Demand & Acquisition",
        subtitle: "Where attention becomes intent",
        owner: "Performance Marketer",
        steps: [
          {
            id: 3,
            days: "Day 5-7",
            title: "Demand Creation Engine",
            desc: "Authority content, trust-building, education and belief shifting across digital channels.",
            tag: "We create demand before we capture it.",
          },
          {
            id: 4,
            days: "Day 8-10",
            title: "Intent Lead Capture",
            desc: "Paid acquisition, high-intent audiences, qualification-driven landing pages and smart forms.",
            tag: "Not traffic. Not clicks. Real intent.",
          },
        ],
      },
      {
        id: 3,
        title: "Intelligence & Automation",
        subtitle: "Where money is actually made",
        owner: "GTM Engineer",
        steps: [
          {
            id: 5,
            days: "Day 11-13",
            title: "Lead Intelligence & Follow-Up",
            desc: "AI scoring, WhatsApp automation, email sequencing, intelligent sales routing.",
            tag: "No lead left unattended.",
          },
        ],
      },
      {
        id: 4,
        title: "Revenue Outcomes",
        subtitle: "Where deals get closed",
        owner: "Client Success Manager",
        steps: [
          {
            id: 6,
            days: "Day 14-15",
            title: "Sales Enablement & Site Visits",
            desc: "Context-rich handoff, visit confirmations, objection handling and conversion optimisation.",
            tag: "From enquiry to site visit — systematically.",
          },
        ],
      },
    ],
    footerHighlights: [
      { label: "6 STEPS", sub: "END-TO-END" },
      { label: "4 DEDICATED SPECIALISTS", sub: "PER ACCOUNT" },
      { label: "SYSTEM FULLY", sub: "LIVE IN 15 DAYS" },
      { label: "4 DEALS GUARANTEED", sub: "IN 90 DAYS" },
    ],
    footerBtnText: "START YOUR 15 DAYS BUILD",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="w-full overflow-hidden bg-white py-10">
      <div className="max-w-8xl container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-20 space-y-4 text-center">
          <div className="inline-block rounded-full border border-gray-300 px-6 py-1 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
            {content.pillText}
          </div>
          <h2
            className="font-serif text-4xl whitespace-pre-line text-gray-900 md:text-5xl"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h2>
          <p
            className="mx-auto max-w-2xl text-lg whitespace-pre-line text-gray-500 italic"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>
        </div>

        {/* The Timeline Board */}
        <div className="md:hidden">
          <div className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {content.zones.map((zone: any) => (
                <div key={zone.id} className="w-[85vw] max-w-md flex-shrink-0 snap-center">
                  <div className="min-h-[100vh] overflow-hidden rounded-xl border border-gray-200 bg-[#F3F4F6] shadow-sm">
                    {/* Zone Header */}
                    <div className="bg-[#333] p-6 text-white">
                      <span className="mb-2 inline-block rounded-md bg-orange-500 px-2 py-0.5 text-[9px] font-black">
                        ZONE - {zone.id}
                      </span>
                      <h3 className="block text-sm font-bold whitespace-pre-line">{zone.title}</h3>
                      <p className="mt-1 text-[10px] font-medium whitespace-pre-line text-gray-400">{zone.subtitle}</p>
                    </div>

                    {/* Steps Container */}
                    <div className="relative p-8">
                      {zone.steps.map((step: any, index: number) => (
                        <div key={step.id} className="relative mb-12 last:mb-0">
                          {/* Vertical Line for mobile */}
                          {index < zone.steps.length - 1 && (
                            <div className="absolute top-12 left-6 z-0 h-16 w-px bg-gray-300" />
                          )}

                          <div className="relative z-10">
                            {/* Step circle */}
                            <div className="absolute top-2 left-0 h-3 w-3 rounded-full border-2 border-white bg-orange-500" />

                            <div className="space-y-3 pl-8">
                              <div className="flex items-center gap-2">
                                <span className="rounded bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white">
                                  {step.id} • {step.days}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold whitespace-pre-line text-gray-900">{step.title}</h4>
                              <p className="text-[11px] leading-relaxed whitespace-pre-line text-gray-500">
                                {step.desc}
                              </p>
                              <div className="inline-block rounded bg-gray-200 px-3 py-1 text-[9px] font-bold text-gray-600 uppercase">
                                {step.tag}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Timeline Board */}
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-[#F3F4F6] shadow-sm md:block">
          {/* Top Zone Headers */}
          <div className="grid grid-cols-1 bg-[#333] text-white md:grid-cols-4">
            {content.zones.map((zone: any) => (
              <div key={zone.id} className="border-r border-gray-600 p-6 last:border-r-0">
                <span className="mb-2 inline-block rounded-md bg-orange-500 px-2 py-0.5 text-[9px] font-black">
                  ZONE - {zone.id}
                </span>
                <h3 className="block text-sm font-bold whitespace-pre-line">{zone.title}</h3>
                <p className="mt-1 text-[10px] font-medium whitespace-pre-line text-gray-400">{zone.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Steps & Connections Container */}
          <div className="relative grid min-h-[500px] grid-cols-1 md:grid-cols-4">
            {content.zones.map((zone: any) => (
              <div key={zone.id} className="relative space-y-12 border-r border-gray-200 p-8 last:border-r-0">
                {/* Vertical Line for tree (Desktop only) */}
                <div className="absolute top-0 bottom-0 left-8 z-0 hidden w-px bg-gray-300 md:block" />

                {zone.steps.map((step: any) => (
                  <div key={step.id} className="relative z-10 pl-26">
                    {/* Horizontal connector line */}
                    <div className="absolute top-10 left-0 hidden h-px w-10 bg-gray-300 md:block" />

                    {/* Zone Specialist Avatar */}
                    <div className="absolute top-2 left-10 hidden h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg transition-all hover:scale-110 hover:grayscale-0 md:block">
                      <Image
                        src={`https://i.pravatar.cc/150?u=${zone.owner}`}
                        alt={zone.owner}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-orange-500 px-2 py-0.5 text-[9px] font-bold text-white">
                          {step.id} • {step.days}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold whitespace-pre-line text-gray-900">{step.title}</h4>
                      <p className="text-[11px] leading-relaxed whitespace-pre-line text-gray-500">{step.desc}</p>
                      <div className="inline-block rounded bg-gray-200 px-3 py-1 text-[9px] font-bold text-gray-600 uppercase">
                        {step.tag}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Owner Footer */}
          <div className="grid grid-cols-1 border-t border-gray-200 bg-gray-50 md:grid-cols-4">
            {content.zones.map((zone: any) => (
              <div key={zone.id} className="flex items-center gap-3 border-r border-gray-200 p-6 last:border-r-0">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-300 grayscale">
                  <Image
                    src={`https://i.pravatar.cc/150?u=${zone.owner}`}
                    alt={zone.owner}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="block text-[8px] font-black text-gray-400 uppercase">Zone 0{zone.id} Owner</span>
                  <h5 className="text-[11px] font-bold text-gray-800">{zone.owner}</h5>
                  <p className="text-[9px] text-gray-500">{zone.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Footer */}
        <ProcessFooter highlights={content.footerHighlights} btnText={content.footerBtnText} />
      </div>
    </section>
  )
}

export { ProcessTimeline }
