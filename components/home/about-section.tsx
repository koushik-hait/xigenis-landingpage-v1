'use client';

import { ArrowUpRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section 
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-white py-20"
      style={{
        backgroundImage: 'url(/assets/about-bg.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative container flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ROW 1: Top Content: Heading & Description */}
        <div className="relative z-20 mb-12 max-w-xl">
          <div className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-xs font-bold tracking-widest text-gray-600 uppercase">
            About Us
          </div>
          <h2 className="mb-6 font-serif text-4xl text-gray-900 lg:text-5xl">About Company</h2>
          <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
            At Xigenis, we help real estate professionals build a predictable pipeline of qualified property
            buyers.{' '}
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

        {/* ROW 2: Central Visual & Stat Cards */}
        <div className="relative mt-16 flex w-full items-center justify-between gap-6 lg:gap-12">
          {/* Left Stat Card (2X / 4X) */}
          <div className="z-20 w-56 rounded-[15px] border border-white/20 bg-black/40 p-6 text-white shadow-2xl backdrop-blur-md lg:w-64">
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
          <div className="z-20 w-full max-w-[250px] rounded-3xl border border-white/20 bg-black/40 p-8 text-white shadow-2xl backdrop-blur-md lg:max-w-[350px]">
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
  );
}