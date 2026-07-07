"use client"

import React from "react"
import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialSectionProps {
  cmsContent?: any
}

export function TestimonialSection({ cmsContent }: TestimonialSectionProps) {
  const content = {
    pillText: "Testimonials",
    heading: "Trusted by Real Estate Professionals",
    description:
      "Rated by agents, brokers, and developers who are generating qualified buyer leads and closing more property deals with our system.",
    testimonials: [
      {
        name: "Rahul Sharma",
        role: "Real Estate Broker, Mumbai",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        text: "We were struggling with low-quality portal leads. After implementing this system, we started getting serious buyer inquiries and closed two deals within the first 60 days.",
      },
      {
        name: "Amit Desai",
        role: "Property Developer",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
        text: "We were struggling with low-quality portal leads. After implementing this system, we started getting serious buyer inquiries and closed two deals within the first 60 days.",
      },
      {
        name: "Vikram Singh",
        role: "Agency Owner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        text: "We were struggling with low-quality portal leads. After implementing this system, we started getting serious buyer inquiries and closed two deals within the first 60 days.",
      },
    ],
    headingSize: "44",
    descriptionSize: "16",
    ...cmsContent,
  }

  return (
    <section className="overflow-hidden bg-[#F9FAFB] px-5 py-10 lg:px-20">
      <div className="max-w-8xl mx-auto flex flex-col items-start gap-12 px-6 lg:flex-row">
        {/* Left Side: Static Content */}
        <div className="lg:sticky lg:top-10 lg:w-1/3">
          <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-[10px] font-bold tracking-widest text-orange-600 uppercase">
            {content.pillText}
          </span>
          <h2
            className="mb-6 font-serif text-4xl leading-tight font-bold whitespace-pre-line text-gray-900 md:text-5xl"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h2>
          <p
            className="max-w-sm text-lg whitespace-pre-line text-gray-500"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>
        </div>

        {/* Right Side: Horizontal Scrolling Container */}
        <div className="w-full lg:w-2/3">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8">
            {content.testimonials.map((t: any, index: number) => (
              <div
                key={index}
                className="min-w-[280px] snap-center rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:min-w-[300px]"
              >
                {/* Header: Avatar + Name + Role */}
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={
                      t.image ||
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
                    }
                    alt={t.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {t.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
