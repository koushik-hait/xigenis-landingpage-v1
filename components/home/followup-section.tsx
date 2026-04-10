"use client"

import React from "react"
import { XCircle, CheckCircle2, Clock, MessageSquare, Send } from "lucide-react"
import Image from "next/image"

const FollowUpSection = () => {
  return (
    <section className="flex min-h-screen w-full items-center overflow-hidden bg-[#F3F4F6] py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row-reverse lg:gap-4">
          {/* Right Column: Mobile Device Mockup */}
          <div className="relative flex w-full justify-center lg:w-1/2">
            {/* Phone Frame */}
            <div className="relative flex h-[600px] w-[300px] flex-col overflow-hidden" style={{ backgroundImage: 'url("/assets/follow-up-mobile.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              {/* Phone Content */}

              {/* Floating Chat Bubble Icon */}
              <div className="absolute right-6 bottom-80 rounded-2xl bg-indigo-600 p-3 shadow-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>

              {/* Bottom Decoration for Phone Screen */}
              <div className="mt-auto mb-8 h-32 w-full rounded-2xl bg-gradient-to-t from-white/5 to-transparent" />
            </div>

            {/* EXTERNAL FLOATING CARDS */}

            {/* 24h Avg Agent Response Card */}
            <div className="absolute top-[45%] left-[5%] z-20 w-44 rounded-2xl bg-white p-6 shadow-xl">
              <div className="relative">
                {/* Decorative Mail/Send Icon */}
                <div className="absolute -top-12 -left-8">
                  <div className="relative">
                    <div className="flex h-10 w-10 -rotate-12 transform items-center justify-center rounded-lg bg-orange-400">
                      <Send className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute top-2 left-6 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sky-400">
                      <Send className="h-3 w-3 -rotate-45 text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-serif text-3xl text-gray-900">24h</h4>
                <p className="mt-1 text-xs font-bold text-gray-500 uppercase">Avg. agent response</p>
              </div>
            </div>

            {/* 5m AI Response Card */}
            <div className="absolute right-[5%] bottom-[15%] z-20 w-48 rounded-2xl border border-green-900/50 bg-[#2d3a2d] p-6 shadow-2xl">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-serif text-3xl text-white">5m</h4>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <Image src="/assets/whatsapp.png" alt="Check" width={20} height={20} />
                </div>
              </div>
              <p className="text-xs leading-tight font-medium text-green-100/70">AI Algo-Plex response</p>
            </div>
          </div>

          {/* Left Column: Text Content */}
          <div className="w-full space-y-6 lg:w-1/2">
            <div className="inline-block rounded-full bg-gray-200 px-4 py-1 text-xs font-bold tracking-widest text-gray-700 uppercase">
              Problem 02 • Follow-up Failure
            </div>

            <h2 className="font-serif text-4xl leading-tight text-gray-900 lg:text-5xl">
              60% of Your Leads Go Cold Because No One Followed Up
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              Excel sheets and manual calls don't scale. Most agents lose their best leads in 48 hours — simply too busy
              to call back in time.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                <span className="font-medium text-gray-700">Serious buyers lose interest fast. Speed wins deals.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                <span className="font-medium text-gray-700">Manual follow-up burns 20–30 hrs every single week.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 fill-emerald-100 text-emerald-500" />
                <span className="font-medium text-gray-700">Our system auto-responds in under 5 minutes. Always.</span>
              </li>
            </ul>

            {/* Gray Stat Box */}
            <div className="mt-8 rounded-xl border border-gray-300 bg-transparent p-6">
              <h3 className="mb-1 font-serif text-3xl text-gray-900">60%</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                of leads are never followed up after Day 2. Deals you already paid for, silently slipping away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FollowUpSection }
