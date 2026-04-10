"use client"

import React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const CTASection = () => {
  return (
    <section className="relative flex min-h-[600px] w-full items-center overflow-hidden bg-black">
      {/* Background Visual (Right Side) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury modern villa"
          fill
          className="object-cover object-center"
        />
        {/* Heavy black gradient from the left to blend the image into the solid background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-8">
          {/* Header */}
          <h2 className="font-serif text-5xl leading-tight text-white lg:text-7xl">
            Ready to Build a <br />
            <span className="text-white">Predictable Pipeline of</span> <br />
            <span className="text-white">Property Buyers?</span>
          </h2>

          {/* Subtext */}
          <p className="max-w-lg text-lg leading-relaxed text-gray-400 lg:text-xl">
            Discover how our system helps real estate professionals generate qualified leads, increase site visits, and
            close more deals.
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <button className="group flex items-center gap-4 rounded-full bg-white py-3 pr-3 pl-10 shadow-2xl transition-all duration-300 hover:bg-gray-100">
              <span className="text-sm font-bold tracking-widest text-black uppercase">Book Your Strategy Call</span>
              <div className="rounded-full bg-orange-500 p-3 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Subtle Bottom Border or Decorative element */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-transparent opacity-50" />
    </section>
  )
}

export { CTASection }
