"use client"

import React from "react"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

const FixSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-black">
      {/* 1. Background Image with Dark Vignette/Gradient */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Image
          src="/assets/fix-bg.png"
          alt="Collaboration in park"
          fill
          className="scale-105 object-cover object-center"
        />
        {/* Subtle vignette/darkening to ensure left text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-8">
          {/* Left Column: Solution Pitch */}
          <div className="w-full space-y-10 lg:w-1/2">
            <div className="inline-block rounded-full border border-[#FFFFFF]/10 bg-[#FFFFFF]/10 px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#CCCCCC] uppercase shadow-inner backdrop-blur-sm">
              THE FIX • AI ALGO-PLEX SYSTEM
            </div>

            <h2 className="font-serif text-4xl leading-tight text-white lg:text-5xl">
              You Don't Need More Leads.
              <br /> You Need a System That Closes.
            </h2>

            <p className="max-w-xl text-xl leading-relaxed text-gray-300">
              Not another portal. Not a freelancer running random ads. A full pipeline — built, managed, and optimised
              for one outcome: closed deals in 90 days.
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-4 pt-6">
              <button className="rounded-full bg-white px-10 py-5 text-sm font-bold tracking-widest text-black uppercase shadow-2xl shadow-gray-200/20 transition-colors hover:bg-gray-100">
                Build My Pipeline
              </button>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-300/30">
                <ArrowRight className="h-7 w-7" />
              </div>
            </div>
          </div>

          {/* Right Column: Key Feature Cards Overlay */}
          <div className="relative mt-16 flex min-h-[500px] w-full items-center justify-center lg:mt-0 lg:w-1/2 lg:pl-16">
            {/* Main Subject Image */}
            {/* <div className="relative z-10 h-[500px] w-[300px] sm:w-[400px] lg:w-[450px]">
              <Image
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2076&auto=format&fit=crop"
                alt="Man using laptop on grass"
                fill
                className="rounded-3xl object-cover object-top"
              />
            </div> */}

            {/* Floating UI Cards */}
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* Card 1: Complete Funnel (Top Left) */}
              <div className="pointer-events-auto absolute top-10 -left-6 w-60 -rotate-3 transform rounded-[2rem] border border-gray-100 bg-white/95 p-6 shadow-2xl shadow-gray-200/30 backdrop-blur-sm sm:left-4">
                <Check className="mb-2 h-10 w-10 fill-emerald-100 text-emerald-500" />
                <h4 className="mb-2 font-serif text-base leading-tight text-gray-900">Complete Ad-to-Close Funnel</h4>
                <p className="text-[11px] leading-snug font-bold text-gray-500">
                  Targeting, nurture, and conversion — fully managed.
                </p>
              </div>

              {/* Card 2: Qualified Only (Top Right) */}
              <div className="pointer-events-auto absolute top-1/4 -right-4 w-56 rotate-3 transform rounded-[2rem] border border-gray-100 bg-white/95 p-6 shadow-2xl shadow-gray-200/30 backdrop-blur-sm sm:right-8">
                <Check className="mb-2 h-10 w-10 fill-emerald-100 text-emerald-500" />
                <h4 className="mb-2 font-serif text-base leading-tight text-gray-900">Qualified Buyers Only</h4>
                <p className="text-[11px] leading-snug font-bold text-gray-500">
                  Pre-filtered buyer intent. No fake numbers, no time-wasters.
                </p>
              </div>

              {/* Card 3: Referral Engine (Bottom Left) */}
              <div className="pointer-events-auto absolute bottom-1/4 left-0 w-60 rotate-2 transform rounded-[2rem] border border-gray-100 bg-white/95 p-6 shadow-2xl shadow-gray-200/30 backdrop-blur-sm sm:left-8">
                <Check className="mb-2 h-10 w-10 fill-emerald-100 text-emerald-500" />
                <h4 className="mb-2 font-serif text-base leading-tight text-gray-900">Referral Engine Built In</h4>
                <p className="text-[11px] leading-snug font-bold text-gray-500">
                  Past clients become your next pipeline automatically.
                </p>
              </div>

              {/* Card 4: Automated (Bottom Right) */}
              <div className="pointer-events-auto absolute -right-4 bottom-10 w-56 -rotate-2 transform rounded-[2rem] border border-gray-100 bg-white/95 p-6 shadow-2xl shadow-gray-200/30 backdrop-blur-sm sm:right-10">
                <Check className="mb-2 h-10 w-10 fill-emerald-100 text-emerald-500" />
                <h4 className="mb-2 font-serif text-base leading-tight text-gray-900">Automated in 5 Minutes</h4>
                <p className="text-[11px] leading-snug font-bold text-gray-500">
                  Every lead followed up instantly. Zero manual effort needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FixSection }
