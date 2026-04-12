"use client"

import React from "react"
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react"

interface ReferralSectionProps {
  cmsContent?: any
}

const ReferralSection = ({ cmsContent }: ReferralSectionProps) => {
  const content = {
    pillText: "Problem 04 • No Referral System",
    heading: "Closing Deals But \n Starting From Zero Every Month",
    description:
      "After closing, most agents disappear. No CRM, no structured referral process means every month is a fresh hunt — with no compounding momentum.",
    points: [
      "Happy clients forget you exist without a system to stay top-of-mind.",
      "Zero referral pipeline means 100% dependence on paid ads forever.",
      "AI Algo-Plex automates referral nurture so every deal spawns the next.",
    ],
    statBoxValue: "3x",
    statBoxText: "Agents with automated referral systems close 3× more deals than those relying on portals alone.",
    btnText: "Build My Own Pipeline",
    headBoxValue: "0",
    headBoxTitle: "Referrals this month",
    card1Title: "No post-sale CRM or \n follow-up system",
    card1Tag: "Missing",
    card2Title: "Past clients never \n re-contacted",
    card2Tag: "0 Leads",
    card3Title: "With referral system \n avg. revenue uplift",
    card3Tag: "+30%",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="flex min-h-screen w-full items-center overflow-hidden bg-[#F9FAFB] py-10">
      <div className="max-w-8xl container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* Left Column: Text & CTA */}
          <div className="w-full space-y-6 lg:w-1/2">
            <div className="inline-block rounded-full bg-[#333] px-4 py-1 text-xs font-bold tracking-widest text-white uppercase">
              {content.pillText}
            </div>

            <h2
              className="font-serif text-4xl leading-tight whitespace-pre-line text-gray-900 lg:text-5xl"
              style={{ fontSize: `${content.headingSize}px` }}
            >
              {content.heading}
            </h2>

            <p className="text-lg leading-relaxed text-gray-600" style={{ fontSize: `${content.descriptionSize}px` }}>
              {content.description}
            </p>

            <ul className="space-y-4 pt-2">
              {content.points.map((text: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  {index === content.points.length - 1 ? (
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 fill-emerald-100 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-1 h-5 w-5 flex-shrink-0 fill-red-100 text-red-500" />
                  )}
                  <span className="font-medium text-gray-700">{text}</span>
                </li>
              ))}
            </ul>

            {/* 3x Stats Box */}
            <div className="mt-8 max-w-md rounded-2xl bg-[#CCCCCC] p-6">
              <h3 className="mb-2 font-serif text-4xl text-gray-900">{content.statBoxValue}</h3>
              <p className="text-sm leading-snug font-medium text-gray-800">{content.statBoxText}</p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4 pt-6">
              <button className="rounded-full bg-black px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-gray-800">
                {content.btnText}
              </button>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component */}
          <div className="relative flex w-full justify-center py-12 lg:w-1/2">
            {/* Main White Card Base */}
            <div className="relative min-h-[450px] w-full max-w-[420px] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="bg-black px-8 py-5 text-white">
                <h3 className="text-center text-sm font-bold tracking-widest uppercase">Monthly Revenue Source</h3>
              </div>

              <div className="flex flex-col items-center space-y-6 p-8">
                {/* 0 Referrals Red Box */}
                <div className="w-full max-w-[240px] rounded-xl bg-[#EF4444] p-4 text-center text-white shadow-lg shadow-red-100">
                  <span className="block text-4xl font-bold">{content.headBoxValue}</span>
                  <span className="text-xs font-bold tracking-wide uppercase">{content.headBoxTitle}</span>
                </div>

                {/* Staggered Floating Cards */}
                <div className="relative w-full space-y-4 pt-4">
                  {/* Card 1: Missing CRM */}
                  <div className="relative z-30 -ml-12 flex w-[110%] items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-8 w-8 fill-red-100 text-red-500" />
                      <p className="text-[13px] leading-tight font-bold whitespace-pre-line text-gray-700">
                        {content.card1Title}
                      </p>
                    </div>
                    <span className="text-xs font-black text-red-500 uppercase">{content.card1Tag}</span>
                  </div>

                  {/* Card 2: Past Clients */}
                  <div className="relative z-20 ml-6 flex w-[100%] items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-8 w-8 fill-red-100 text-red-500" />
                      <p className="text-[13px] leading-tight font-bold whitespace-pre-line text-gray-700">
                        {content.card2Title}
                      </p>
                    </div>
                    <span className="text-xs font-black text-red-500 uppercase">{content.card2Tag}</span>
                  </div>

                  {/* Card 3: Success Uplift */}
                  <div className="relative z-10 ml-20 flex w-[100%] items-center justify-between rounded-2xl border border-emerald-50 border-gray-100 bg-emerald-50/20 bg-white p-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-8 w-8 fill-emerald-100 text-emerald-500" />
                      <p className="text-[13px] leading-tight font-bold whitespace-pre-line text-gray-700">
                        {content.card3Title}
                      </p>
                    </div>
                    <span className="text-sm font-black text-emerald-600">{content.card3Tag}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ReferralSection }
