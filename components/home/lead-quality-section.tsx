"use client"

import React from "react"
import Image from "next/image"
import { XCircle, CheckCircle2, PhoneOff, Frown, Building2 } from "lucide-react"

interface LeadQualitySectionProps {
  cmsContent?: any
}

const LeadQualitySection = ({ cmsContent }: LeadQualitySectionProps) => {
  const content = {
    pillText: "PROBLEM 01 • LEAD QUALITY",
    heading: "Spending Lakhs on Portals & Getting Fake Numbers",
    description:
      "MagicBricks, 99acres, Housing.com — 80-90% of those leads are cold or uncontactable. You're not getting leads. You're buying noise.",
    points: [
      "100 leads, 4 site visits. Zero predictability.",
      "Every month feels like starting from scratch.",
      "AI Algo-Plex delivers pre-qualified buyer intent only.",
    ],
    mainStatValue: "72%",
    mainStatText: "of Indian agents say unqualified inquiries is their #1 problem.",
    mainStatSource: "Source: 99acres Agent Survey 2024.",
    auditTotalLabel: "Total Leads This Month",
    auditTotalValue: "112 inquiries received",
    auditFakeLabel: "Fake / Wrong Numbers",
    auditFakeValue: "84 leads were invalid or unreachable",
    auditNoRespLabel: "No Response After 3 Calls",
    auditNoRespValue: "19 leads never answered follow-ups",
    auditQualLabel: "Actually Qualified Buyers",
    auditQualValue: "Only 9 leads showed real buying intent",
    auditSiteLabel: "Site Visit Rate",
    auditSiteValue: "4% of leads converted into site visits",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#fafafa] py-5 lg:py-20">
      <div className="max-w-8xl relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-8">
          {/* Left Column: UI Card Element */}
          <div className="relative flex w-full justify-center lg:w-[45%]">
            {/* Main Card Container */}
            <div className="relative z-10 w-full max-w-[380px] rounded-3xl bg-white pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              {/* Header */}
              <div className="rounded-t-3xl bg-black px-6 py-4 text-white">
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase">Lead Quality Audit</h3>
              </div>

              {/* Stacked List Items */}
              <div className="mt-6 flex flex-col space-y-3 px-4">
                {/* Item 1: Total Leads (Pops out to the left) */}
                <div className="relative z-20 -ml-6 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)]">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-200"
                      >
                        <Image
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">{content.auditTotalLabel}</p>
                    <p className="text-sm font-bold text-gray-900">{content.auditTotalValue}</p>
                  </div>
                </div>

                {/* Item 2: Fake Numbers */}
                <div className="mx-2 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
                  <PhoneOff className="h-6 w-6 flex-shrink-0 text-orange-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">{content.auditFakeLabel}</p>
                    <p className="text-sm font-bold text-gray-900">{content.auditFakeValue}</p>
                  </div>
                </div>

                {/* Item 3: No Response */}
                <div className="mx-2 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
                  <Frown className="h-6 w-6 flex-shrink-0 text-orange-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">{content.auditNoRespLabel}</p>
                    <p className="text-sm font-bold text-gray-900">{content.auditNoRespValue}</p>
                  </div>
                </div>

                {/* Item 4: Qualified Buyers (Gray bg) */}
                <div className="mx-2 flex items-center gap-4 rounded-2xl bg-gray-200/80 p-4">
                  <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-300"
                      >
                        <Image
                          src={`https://i.pravatar.cc/100?img=${i + 20}`}
                          alt="avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600">{content.auditQualLabel}</p>
                    <p className="text-sm font-bold text-gray-900">{content.auditQualValue}</p>
                  </div>
                </div>

                {/* Item 5: Site Visit Rate (Pops out to the right) */}
                <div className="relative z-20 mt-2 ml-6 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgb(0,0,0,0.06)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">{content.auditSiteLabel}</p>
                    <p className="text-sm font-bold text-gray-900">{content.auditSiteValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full max-w-xl lg:w-[55%] lg:pl-10">
            <div className="mb-6 inline-block rounded-full bg-[#2B2B2B] px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
              {content.pillText}
            </div>

            <h2
              className="mb-6 font-serif text-3xl leading-[1.2] text-gray-900 sm:text-4xl lg:text-5xl"
              style={{ fontSize: `${content.headingSize}px` }}
            >
              {content.heading}
            </h2>

            <p
              className="mb-8 text-lg leading-relaxed text-gray-600"
              style={{ fontSize: `${content.descriptionSize}px` }}
            >
              {content.description}
            </p>

            <ul className="mb-10 space-y-4">
              {content.points.map((text: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  {index === content.points.length - 1 ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 fill-emerald-100 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 fill-red-100 text-red-500" />
                  )}
                  <span
                    className="text-gray-800"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Statistic Box */}
            <div className="rounded-2xl border border-gray-200 bg-[#EEEEEE] p-4">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="font-serif text-4xl text-gray-900">{content.mainStatValue}</span>
              </div>
              <p className="text-sm leading-snug text-gray-600">
                {content.mainStatText}
                <br />
                <span className="mt-1 inline-block text-gray-400">{content.mainStatSource}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { LeadQualitySection }
