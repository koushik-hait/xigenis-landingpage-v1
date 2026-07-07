"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ExploreButton } from "@/components/ui/explore-button"

interface CTASectionProps {
  cmsContent?: any
}

const CTASection = ({ cmsContent }: CTASectionProps) => {
  const content = {
    bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    heading: "Ready to Build a \n Predictable Pipeline of \n Property Buyers?",
    description:
      "Discover how our system helps real estate professionals generate qualified leads, increase site visits, and close more deals.",
    buttonText: "Book Your Strategy Call",
    buttonLink: "#",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="relative flex min-h-[400px] w-full items-center overflow-hidden bg-black lg:min-h-[500px]">
      {/* Background Visual (Right Side) */}
      <div className="absolute inset-0 z-0">
        <Image src={content.bgImage} alt="Luxury modern villa" fill className="object-cover object-center" />
        {/* Heavy black gradient from the left to blend the image into the solid background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="max-w-8xl relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-8">
          {/* Header */}
          <h2
            className="font-serif text-5xl leading-tight whitespace-pre-line text-white lg:text-7xl"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h2>

          {/* Subtext */}
          <p
            className="max-w-lg text-lg leading-relaxed text-gray-400 lg:text-xl"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <ExploreButton href={content.buttonLink} className="mx-0">
              <span className="text-sm font-bold tracking-widest uppercase">{content.buttonText}</span>
            </ExploreButton>
          </div>
        </div>
      </div>

      {/* Optional: Subtle Bottom Border or Decorative element */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 to-transparent opacity-50" />
    </section>
  )
}

export { CTASection }
