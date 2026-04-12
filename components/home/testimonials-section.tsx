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
                className="min-w-[320px] snap-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:min-w-[360px]"
              >
                {/* Profile Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      t.image ||
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                    }
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="relative p-6">
                  {/* Decorative Quote Mark */}
                  <span className="absolute top-6 right-6 font-serif text-6xl leading-none text-gray-100 select-none">
                    "
                  </span>

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900">{t.name}</h3>
                    <p className="text-xs tracking-wide text-gray-500 uppercase">{t.role}</p>
                  </div>

                  <div className="mb-4 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Google Logo (Placeholder) */}
                  <div className="mt-6 flex justify-end">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                      <svg viewBox="0 0 24 24" className="h-3 w-3">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
