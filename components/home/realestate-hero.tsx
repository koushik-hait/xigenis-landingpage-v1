"use client"

import React from "react"
import Image from "next/image"
import { Check, Star, ArrowUpRight } from "lucide-react"

interface RealEstateHeroProps {
  cmsContent?: any
}

export function RealEstateHero({ cmsContent }: RealEstateHeroProps) {
  const content = {
    badgeText: "Trusted by 100+ B2B Organization",
    heading: "Generate Qualified Property Buyer Leads Without Wasting Money On Low-Quality Inquiries",
    buttonText: "Speak With A Strategy Expert Today",
    backgroundImage: "/hero-family-pool.jpg",
    valueProps: [
      "High-Intent Property Buyers",
      "Qualified Buyer Inquiries Fast",
      "Full Campaign Transparency",
      "Real Estate Marketing Experts",
      "More Site Visits & Deals",
    ],
    headingSize: "48",
    ...cmsContent,
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white px-5 py-10 font-serif lg:px-20">
      {/* Background Image Container */}
      <div className="absolute inset-y-0 right-0 z-0 h-full w-full lg:w-[60%]">
        <Image
          src={content.backgroundImage || "/hero-family-pool.jpg"}
          alt="Real Estate Hero Background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* The White-to-Image Gradient Blend */}
        {/* On Mobile: Fades from top to bottom */}
        {/* On Desktop: Fades from left to right */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white via-white/70 to-transparent lg:w-[15%] lg:bg-gradient-to-r lg:from-white lg:via-white/70 lg:to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-8xl relative z-20 mx-auto grid grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
        {/* Left Side: Text and Content */}
        <div className="w-full max-w-xl">
          {/* Trust Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#F6DACB] bg-[#FFF8F4] px-4 py-2 shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#F67C46] text-[#F67C46]" />
              ))}
            </div>
            <span className="font-sans text-xs font-semibold tracking-widest text-[#F67C46] uppercase">
              {content.badgeText}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-10 text-4xl leading-tight font-medium whitespace-pre-line text-gray-900 md:text-5xl lg:text-6xl"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h1>

          {/* Value Propositions List */}
          <ul className="mb-12 space-y-4 font-sans">
            {content.valueProps?.map((prop: string, index: number) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full bg-[#E4FBF3] p-1.5">
                  <Check className="h-4 w-4 text-[#35D7A1]" />
                </div>
                <span className="text-lg text-gray-700">{prop}</span>
              </li>
            ))}
          </ul>

          {/* Call To Action Button */}
          <button className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 font-sans text-lg font-bold text-white transition-colors hover:bg-gray-800">
            {content.buttonText}
            <span className="rounded-full bg-[#F67C46] p-1.5 text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </button>
        </div>

        {/* Right Side: Spacer for large screens */}
        <div className="hidden lg:block"></div>
      </div>
    </section>
  )
}
