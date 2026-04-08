import React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const AboutCompany = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white py-20">
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Content: Heading & Description */}
        <div className="relative z-20 mb-12 max-w-xl lg:mb-0">
          <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-xs font-bold tracking-widest text-gray-600 uppercase">
            About Us
          </div>
          <h2 className="mb-6 font-serif text-4xl text-gray-900 lg:text-5xl">About Company</h2>
          <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
            At Xigenis, we help real estate professionals build a predictable pipeline of qualified property buyers.{" "}
            <br className="hidden lg:block" />
            Our system combines AI-driven lead generation, targeted campaigns, and smart follow-up automation to attract
            serious buyers and close more deals consistently.
          </p>

          {/* CTA Button */}
          <button className="group flex items-center gap-3 rounded-full bg-black py-2 pr-2 pl-8 text-white transition-transform hover:scale-105">
            <span className="text-xs font-bold tracking-widest uppercase">Build My Pipeline</span>
            <div className="rounded-full bg-orange-500 p-2">
              <ArrowUpRight className="h-5 w-5 text-white" />
            </div>
          </button>
        </div>

        {/* Central Visual: Floating Island & House */}
        {/* On mobile, this will stack. On desktop, it anchors the layout. */}
        <div className="relative mt-12 flex w-full items-center justify-center lg:mt-0">
          {/* Base Floating Island Graphic */}
          <div className="relative h-[500px] w-full max-w-[900px] sm:h-[600px] lg:h-[700px]">
            {/* NOTE: This image should be a PNG with transparency 
                containing the mountain/island and the 4-story house.
            */}
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" // Placeholder for visual reference
              alt="Floating real estate concept"
              fill
              className="z-10 object-contain"
              priority
            />
          </div>

          {/* GLASSMORPHISM STAT CARDS */}

          {/* Left Stat Card (2X / 4X) */}
          <div className="absolute bottom-20 left-0 z-20 w-56 rounded-3xl border border-white/20 bg-black/40 p-6 text-white shadow-2xl backdrop-blur-md lg:bottom-[25%] lg:left-10 lg:w-64">
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl">2X</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">Faster Growth</span>
                </div>
                <p className="mt-1 text-[9px] text-gray-400 italic">Vs Industry Peers</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl">4X</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-300 uppercase">Higher Sales</span>
                </div>
                <p className="mt-1 text-[9px] text-gray-400 italic">Vs Non-Clients</p>
              </div>
            </div>
          </div>

          {/* Right Stat Card (Grid Layout) */}
          <div className="absolute right-0 bottom-10 z-20 w-full max-w-[320px] rounded-3xl border border-white/20 bg-black/40 p-8 text-white shadow-2xl backdrop-blur-md lg:right-10 lg:bottom-[20%] lg:max-w-[450px]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {/* Stat 1 */}
              <div className="space-y-1">
                <span className="font-serif text-2xl lg:text-3xl">90+</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight text-gray-300 uppercase">
                  Real Estate <br /> Professionals Served
                </p>
              </div>
              {/* Stat 2 */}
              <div className="space-y-1">
                <span className="font-serif text-2xl lg:text-3xl">₹25 Cr+</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight text-gray-300 uppercase">
                  Property Pipeline <br /> Created
                </p>
              </div>
              {/* Stat 3 */}
              <div className="space-y-1">
                <span className="font-serif text-2xl lg:text-3xl">5000+</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight text-gray-300 uppercase">
                  Qualified Buyer <br /> Leads Generated
                </p>
              </div>
              {/* Stat 4 */}
              <div className="space-y-1 border-l border-white/10 pl-4">
                <span className="font-serif text-2xl lg:text-3xl">15+</span>
                <p className="text-[10px] leading-tight font-bold tracking-tight text-gray-300 uppercase">
                  Cities Covered <br /> Across India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element (Subtle radial gradient) */}
      <div className="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.05)_0%,_transparent_70%)]" />
    </section>
  )
}

export { AboutCompany }
