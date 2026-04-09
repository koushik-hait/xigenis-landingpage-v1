import React from "react"
import Image from "next/image"
import { XCircle, CheckCircle2, Megaphone, Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

const AdSpendSection = () => {
  return (
    <section className="flex min-h-screen w-full items-center overflow-hidden bg-white py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-4">
          {/* Left Column: Visual Composition */}
          <div className="relative flex min-h-[600px] w-full items-center justify-center lg:w-1/2">
            {/* Social Media & Icon Cloud */}
            <div className="absolute inset-0 z-0">
              {/* Megaphone Card */}
              <div className="absolute top-1/4 left-4 z-20 -rotate-12 transform rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:left-10">
                <Megaphone className="h-8 w-8 text-orange-500" />
              </div>

              {/* Floating Social Icons */}
              <div className="absolute top-[20%] left-[30%] rotate-12 transform rounded-lg bg-white p-2 shadow-md">
                <Instagram className="h-6 w-6 text-pink-500" />
              </div>
              <div className="absolute top-[10%] left-[45%] rounded-md bg-white p-1.5 shadow-sm">
                <Linkedin className="h-4 w-4 text-blue-700" />
              </div>
              <div className="absolute top-[25%] left-[55%] -rotate-12 transform rounded-lg bg-white p-2 shadow-md">
                <Facebook className="h-6 w-6 text-blue-600" />
              </div>
              <div className="absolute top-[35%] left-[25%] -rotate-6 transform rounded-md bg-white p-1.5 shadow-sm">
                <Twitter className="h-4 w-4 text-black" />
              </div>
              {/* WhatsApp-ish Placeholder */}
              <div className="absolute top-[45%] left-[35%] rotate-12 transform rounded-full bg-green-500 p-2 shadow-lg">
                <div className="h-4 w-4 rounded-full bg-white opacity-20" />
              </div>
            </div>

            {/* Main Subject Image */}
            <div className="relative z-10 h-[500px] w-[280px] sm:w-[350px] lg:w-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Business Professional"
                fill
                className="object-cover object-top grayscale-[0.2]"
              />
            </div>

            {/* Data Cards Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* ₹80K Ad Spend Card */}
              <div className="pointer-events-auto absolute top-10 right-4 w-44 overflow-hidden rounded-3xl bg-white shadow-2xl sm:right-10">
                <div className="p-6 text-center">
                  <span className="font-serif text-4xl text-gray-900">₹80K</span>
                </div>
                <div className="bg-black py-2 text-center">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">Ad Spend / Month</span>
                </div>
              </div>

              {/* 94 Leads Card */}
              <div className="pointer-events-auto absolute top-1/2 -right-4 w-44 translate-y-[-50%] rounded-3xl border border-gray-50 bg-white p-6 text-center shadow-xl">
                <span className="font-serif text-5xl text-gray-900">94</span>
                <p className="mt-2 text-xs font-bold text-gray-400 uppercase">Leads Generated</p>
              </div>

              {/* 0-1 Deals Closed Card */}
              <div className="pointer-events-auto absolute right-10 bottom-[20%] w-40 rounded-3xl bg-black p-6 text-center shadow-2xl">
                <span className="font-serif text-3xl text-white">0—1</span>
                <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase">Deals Closed</p>
              </div>

              {/* 3-4 Site Visits Card (Bottom Left) */}
              <div className="pointer-events-auto absolute bottom-4 -left-4 w-64 rounded-[2rem] bg-white p-8 shadow-2xl sm:left-4">
                <span className="font-serif text-5xl text-gray-900">3—4</span>
                <p className="mt-1 text-sm font-bold text-gray-800">Site Visits Booked</p>
                <div className="mt-4 rounded-full bg-gray-100 px-4 py-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">83% of Meta campaigns end here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full space-y-6 lg:w-1/2 lg:pl-12">
            <div className="inline-block rounded-full bg-[#2B2B2B] px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
              PROBLEM 03 • LEAD QUALITY
            </div>

            <h2 className="font-serif text-4xl leading-tight text-gray-900 lg:text-5xl">
              Burning ₹30K—₹1L Monthly <br />
              on Ads That Convert Nothing
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              Running ads yourself or with a cheap freelancer? Poor targeting and zero funnel follow-up kill your ROI
              before a single visit happens.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  Wrong audience targeting means paying to reach non-buyers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  No nurture funnel means leads evaporate after the first click.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 fill-emerald-100 text-emerald-500" />
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  AI Algo-Plex runs a complete paid acquisition system end-to-end.
                </span>
              </li>
            </ul>

            {/* Large Gray Footer Box */}
            <div className="mt-10 rounded-2xl border border-gray-200 bg-[#D9D9D9]/50 p-8">
              <span className="mb-2 block font-serif text-4xl text-gray-900">83%</span>
              <p className="text-xs leading-normal font-bold tracking-tight text-gray-600 uppercase">
                of Meta real estate campaigns fail due to poor targeting and <br className="hidden sm:block" /> no
                follow-up funnel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AdSpendSection }
