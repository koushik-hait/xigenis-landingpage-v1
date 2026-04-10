"use client"

import React from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile"

const metricsData = [
  

  {
    title: "Commercial Real Estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92af1bd?q=80&w=2072&auto=format&fit=crop",
  },
  {
    title: "Industrial Real Estate",
    image: "https://images.unsplash.com/photo-1590674116584-d131495c256a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Farmlands & Farmhouses",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
  },
  {
    title: "Special Purpose Real Estate",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1996&auto=format&fit=crop",
  },
]

const PerformanceMetrics = () => {
  const isMobile = useIsMobile()

  return (
    <section className="flex w-full items-center overflow-hidden bg-white py-20">
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-8">
          {/* Left Column: Heading & Intro */}
          <div className="flex flex-col">
            <div className="w-full col-span-1 space-y-8 lg:sticky lg:top-10">
              <div className="inline-block rounded-full bg-[#D9D9D9] px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#333] uppercase">
                Sales Insights
              </div>
              <h2 className="font-serif text-2xl leading-tight text-gray-900 lg:text-3xl">
                Real Estate <br /> Performance Metrics
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-gray-600">
                Turning property insights into measurable success across every segment.
              </p>

              {/* CTA Button */}
              <button className="group flex items-center gap-3 rounded-full bg-black px-8 py-3 text-white transition-transform hover:scale-105">
                <span className="text-[10px] font-bold tracking-widest uppercase">See How It Works</span>
                <div className="rounded-full bg-orange-500 p-2">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </button>
            </div>
            
                  <div
                   
                    className="relative col-span-1 flex min-h-[200px] flex-col overflow-hidden rounded-[2rem] bg-[#1A1A1A] p-8 md:col-span-1"
                  >
                    {/* Background image with fade */}
                    <div className="absolute inset-0 z-0 opacity-20 grayscale">
                      <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" alt="Residential Real Estate" fill className="object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 space-y-4">
                      <h3 className="font-serif text-3xl text-white">Residential Real Estate</h3>
                      <p className="text-sm font-bold tracking-widest text-gray-300 uppercase">Achievement Metrics:</p>
                    </div>

                    {/* Achievement Metrics Boxes */}
                    <div className="relative z-10 mt-auto grid grid-cols-2 gap-4 border-t border-gray-700 pt-8">
                      
                        <div

                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner backdrop-blur-sm"
                        >
                          <span className="font-serif text-3xl text-white">340+</span>
                          <p className="text-[10px] leading-tight font-medium tracking-wider text-gray-400 uppercase">
                            Residential Campaigns Delivered
                          </p>
                        </div>

                        <div

                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner backdrop-blur-sm"
                        >
                          <span className="font-serif text-3xl text-white">78%</span>
                          <p className="text-[10px] leading-tight font-medium tracking-wider text-gray-400 uppercase">
                            Pre-Qualified Buyer Rate
                          </p>
                        </div>
                      
                    </div>
                  </div>
             
          </div>

          {/* Right Column: Masonry Grid of Cards */}
          <div className={`relative ${isMobile ? 'flex overflow-x-auto gap-6 snap-x snap-mandatory' : 'grid grid-cols-1 gap-6 md:grid-cols-2'} w-full lg:w-[65%]`}>
            {metricsData.map((item, index) => {
              
                return (
                  <div
                    key={index}
                    className={`group relative flex flex-col justify-end overflow-hidden rounded-[2rem] bg-white p-6 shadow-lg transition-shadow hover:shadow-2xl ${isMobile ? 'min-w-[300px] snap-center' : 'col-span-1 min-h-[200px]'}`}
                  >
                    {/* Background image with hover zoom */}
                    <div className="absolute inset-0 z-0 opacity-90 transition-transform group-hover:scale-105">
                      <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
                      {/* Dark gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                      <button className="border-b-2 border-orange-500 pb-1 text-[11px] font-bold tracking-widest text-gray-200 uppercase transition-colors hover:text-white">
                        View Details
                      </button>
                    </div>
                  </div>
                )
              
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { PerformanceMetrics }
