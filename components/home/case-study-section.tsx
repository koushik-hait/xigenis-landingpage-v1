"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface CaseStudiesProps {
  cmsContent?: any
}

const CaseStudies = ({ cmsContent }: CaseStudiesProps) => {
  const content = {
    pillText: "LOREM IPSUM DOLOR SIT",
    heading: "Real Campaign Results from Real \n Estate Projects",
    description: "Real campaign results showing how qualified buyer leads turn into site visits and property deals.",
    projects: [
      {
        title: "Luxury Residential Project – Goa",
        leads: "3.4K+",
        rate: "28%",
        requests: "270+",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
        link: "#",
      },
      {
        title: "Luxury Residential Project – Goa",
        leads: "3.4K+",
        rate: "28%",
        requests: "270+",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        link: "#",
      },
      {
        title: "Luxury Residential Project – Goa",
        leads: "3.4K+",
        rate: "28%",
        requests: "270+",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        link: "#",
      },
    ],
    moreLink: "#",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="w-full overflow-hidden bg-[#FDFDFD] py-10">
      <div className="max-w-8xl container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4">
            <div className="inline-block rounded-full border border-gray-300 px-5 py-1 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              {content.pillText}
            </div>
            <h2
              className="font-serif text-4xl leading-tight whitespace-pre-line text-gray-900 md:text-5xl"
              style={{ fontSize: `${content.headingSize}px` }}
            >
              {content.heading}
            </h2>
          </div>
          <p
            className="max-w-[320px] text-sm leading-relaxed font-medium whitespace-pre-line text-gray-500"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>
        </div>

        {/* Horizontal Scroll / Grid Area */}
        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {content.projects.map((project: any, index: number) => (
                <Link key={index} href={project.link || "#"} className="w-[75vw] max-w-sm flex-shrink-0 snap-center block">
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lg">
                    {/* Background Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.25)_60%,transparent_100%)]" />

                    {/* Stats Overlay (Frosted Glass Style) */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="font-serif text-xl text-white">{project.leads}</p>
                          <p className="text-[8px] font-bold tracking-widest text-gray-300 uppercase">
                            Leads Generated
                          </p>
                        </div>
                        <div>
                          <p className="font-serif text-xl text-white">{project.rate}</p>
                          <p className="text-[8px] font-bold tracking-widest text-gray-300 uppercase">
                            Qualified Buyer Rate
                          </p>
                        </div>
                        <div>
                          <p className="font-serif text-xl text-white">{project.requests}</p>
                          <p className="text-[8px] font-bold tracking-widest text-gray-300 uppercase">
                            Site Visit Requests
                          </p>
                        </div>
                      </div>

                      <h3 className="pr-2 font-serif text-lg leading-tight text-white">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}

              {/* "See More" Card (Blurred Background) */}
              <Link href={content.moreLink || "#"} className="w-[75vw] max-w-sm flex-shrink-0 snap-center block">
                <div className="group relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-[2.5rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                    alt="More projects"
                    fill
                    className="scale-110 object-cover opacity-60 blur-md"
                  />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <span className="font-serif text-5xl text-white">12</span>
                    <span className="flex items-center gap-2 rounded-full border border-white/50 px-6 py-2 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black">
                      More <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4">
          {content.projects.map((project: any, index: number) => (
            <Link key={index} href={project.link || "#"} className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lg block">
              {/* Background Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.7)_50%,black_80%)]" />

              {/* Stats Overlay (Frosted Glass Style) */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <div className="space-y-6">
                  <div>
                    <p className="font-serif text-2xl text-white">{project.leads}</p>
                    <p className="text-[9px] font-bold tracking-widest text-gray-300 uppercase">Leads Generated</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-white">{project.rate}</p>
                    <p className="text-[9px] font-bold tracking-widest text-gray-300 uppercase">Qualified Buyer Rate</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-white">{project.requests}</p>
                    <p className="text-[9px] font-bold tracking-widest text-gray-300 uppercase">Site Visit Requests</p>
                  </div>
                </div>

                <h3 className="pr-4 font-serif text-xl leading-tight text-white">{project.title}</h3>
              </div>
            </Link>
          ))}

          {/* "See More" Card (Blurred Background) */}
          <Link href={content.moreLink || "#"} className="group relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-[2.5rem] block">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
              alt="More projects"
              fill
              className="scale-110 object-cover opacity-60 blur-md"
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <span className="font-serif text-6xl text-white">12</span>
              <span className="flex items-center gap-2 rounded-full border border-white/50 px-8 py-2 text-[11px] font-bold tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black">
                More <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export { CaseStudies }
