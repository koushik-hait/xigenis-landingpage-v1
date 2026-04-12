"use client"

import React from "react"
import Image from "next/image"
import { XCircle, CheckCircle2, Megaphone, Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

interface AdSpendSectionProps {
  cmsContent?: any
}

const AdSpendSection = ({ cmsContent }: AdSpendSectionProps) => {
  const content = {
    pillText: "PROBLEM 03 • LEAD QUALITY",
    heading: "Burning ₹30K—₹1L Monthly \n on Ads That Convert Nothing",
    description:
      "Running ads yourself or with a cheap freelancer? Poor targeting and zero funnel follow-up kill your ROI before a single visit happens.",
    points: [
      "Wrong audience targeting means paying to reach non-buyers.",
      "No nurture funnel means leads evaporate after the first click.",
      "AI Algo-Plex runs a complete paid acquisition system end-to-end.",
    ],
    mainStatValue: "83%",
    mainStatText: "of Meta real estate campaigns fail due to poor targeting and no follow-up funnel.",
    card1Value: "₹80K",
    card1Label: "Ad Spend / Month",
    card2Value: "94",
    card2Label: "Leads Generated",
    card3Value: "0—1",
    card3Label: "Deals Closed",
    card4Value: "3—4",
    card4Label: "Site Visits Booked",
    card4SubText: "83% of Meta campaigns end here",
    mainImage: "/assets/man.png",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="flex min-h-screen w-full items-center overflow-hidden bg-white py-10">
      <div className="max-w-8xl container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-4">
          {/* Left Column: Visual Composition */}
          <div className="relative flex min-h-[600px] w-full items-center justify-center lg:w-1/2">
            {/* Social Media & Icon Cloud */}
            <div className="absolute inset-0 z-0">
              {/* Megaphone Card */}
              <div className="absolute top-[40%] left-[0%] z-20 -rotate-12 transform rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:left-10">
                <Image src="/assets/megaphone.png" alt="Megaphone" width={32} height={32} />
              </div>

              {/* Floating Social Icons */}
              <div className="absolute top-[20%] left-[20%] rotate-12 transform rounded-lg bg-white p-2 shadow-md">
                <Image src="/assets/instagram.svg" alt="Instagram" width={32} height={32} />
              </div>
              <div className="absolute top-[10%] left-[10%] rounded-md bg-white p-1.5 shadow-sm">
                <Image src="/assets/linkedin.svg" alt="LinkedIn" width={32} height={32} />
              </div>
              <div className="absolute top-[30%] left-[8%] -rotate-12 transform rounded-lg bg-white p-2 shadow-md">
                <Image src="/assets/facebook.svg" alt="Facebook" width={32} height={32} />
              </div>
              <div className="absolute top-[35%] left-[5%] -rotate-6 transform rounded-md bg-white p-1.5 shadow-sm">
                <Image src="/assets/whatsapp.png" alt="Whatsapp" width={32} height={32} />
              </div>
              {/* WhatsApp-ish Placeholder */}
              <div className="absolute top-[45%] left-[35%] rotate-12 transform rounded-full bg-green-500 p-2 shadow-lg">
                <div className="h-4 w-4 rounded-full bg-white opacity-20" />
              </div>
            </div>

            {/* Main Subject Image */}
            <div className="relative z-10 h-[400px] w-[220px] sm:w-[300px] lg:w-[400px]">
              <Image
                src={content.mainImage}
                alt="Business Professional"
                fill
                className="object-cover object-top grayscale-[0.2]"
              />
            </div>

            {/* Data Cards Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* Card 1 */}
              <div className="pointer-events-auto absolute top-15 right-5 w-40 overflow-hidden rounded-xl bg-white sm:right-10 lg:top-10 lg:right-4">
                <div className="p-2 text-center">
                  <span className="font-serif text-2xl text-gray-900">{content.card1Value}</span>
                </div>
                <div className="bg-black py-2 text-center">
                  <span className="text-[8px] font-bold tracking-widest text-white uppercase">
                    {content.card1Label}
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="pointer-events-auto absolute top-1/2 -right-4 w-40 translate-y-[-50%] rounded-xl border border-gray-50 bg-white p-2 text-center shadow-xl">
                <span className="font-serif text-2xl text-gray-900">{content.card2Value}</span>
                <p className="mt-2 text-xs font-bold text-gray-400 uppercase">{content.card2Label}</p>
              </div>

              {/* Card 3 */}
              <div className="pointer-events-auto absolute right-5 bottom-50 w-40 rounded-3xl bg-black p-2 text-center shadow-2xl lg:right-10 lg:bottom-[20%]">
                <span className="font-serif text-2xl text-white">{content.card3Value}</span>
                <p className="mt-2 text-[8px] font-bold text-gray-400 uppercase">{content.card3Label}</p>
              </div>

              {/* Card 4 */}
              <div className="pointer-events-auto absolute bottom-4 -left-4 w-80 rounded-[2rem] bg-white p-4 shadow-2xl sm:left-4">
                <span className="font-serif text-2xl text-gray-900">{content.card4Value}</span>
                <p className="mt-1 text-sm font-bold text-gray-800">{content.card4Label}</p>
                <div className="mt-4 rounded-full bg-gray-100 px-4 py-2">
                  <p className="text-[8px] font-bold text-gray-500 uppercase">{content.card4SubText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full space-y-6 lg:w-1/2 lg:pl-12">
            <div className="inline-block rounded-full bg-[#2B2B2B] px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
              {content.pillText}
            </div>

            <h2
              className="font-serif text-3xl leading-tight whitespace-pre-line text-gray-900 lg:text-5xl"
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
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 fill-emerald-100 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-gray-700 sm:text-base">{text}</span>
                </li>
              ))}
            </ul>

            {/* Large Gray Footer Box */}
            <div className="mt-10 rounded-2xl border border-gray-200 bg-[#D9D9D9]/50 p-8">
              <span className="mb-2 block font-serif text-4xl text-gray-900">{content.mainStatValue}</span>
              <p className="text-xs leading-normal font-bold tracking-tight text-gray-600 uppercase">
                {content.mainStatText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AdSpendSection }
