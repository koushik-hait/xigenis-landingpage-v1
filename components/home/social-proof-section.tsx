"use client"

import React, { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile"

/* ───────────────────── DATA DEFAULT ───────────────────── */

const avatarDefaults = [
  { size: 72, top: "8%", left: "12%" },
  { size: 80, top: "5%", left: "32%" },
  { size: 76, top: "8%", left: "68%" },
  { size: 68, top: "4%", left: "86%" },
  { size: 72, top: "28%", left: "22%" },
  { size: 64, top: "32%", left: "78%" },
]

/* ────────────── GOOGLE ICON SVG ────────────── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
)

/* ───────────────────── COMPONENT ───────────────────── */

interface SocialProofSectionProps {
  cmsContent?: any
}

const SocialProofSection = ({ cmsContent }: SocialProofSectionProps) => {
  const content = {
    pillText: "Testimonials",
    heading: "Trusted by Real Estate Professionals \n Across Cities",
    description:
      "See how agents, brokers, and developers are generating qualified buyer leads, increasing site visits, and closing more property deals with our proven system.",
    btnText: "See How It Works",
    btnLink: "#",
    testimonials: [
      {
        name: "Rahul Sharma",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        alt: "Real estate professional",
        rating: "5",
        quote:
          "The system completely changed how we generate buyer leads. Instead of chasing random inquiries, we now speak with serious property buyers who are ready to visit and invest.",
      },
      {
        name: "Priya Nair",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        alt: "Property agent",
        rating: "5",
        quote:
          "Before Xigenis, we were spending ₹1L/month on portals with zero tracking. Now every rupee is accounted for and we see 4x more quality site visits.",
      },
      {
        name: "Amrita Verma",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        alt: "Broker",
        rating: "5",
        quote:
          "320+ qualified buyer leads in 60 days. ₹4.2 Cr property deals closed. The ROI from Xigenis has been phenomenal for our entire team.",
      },
      {
        name: "Vikram Desai",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        alt: "Channel partner",
        rating: "5",
        quote:
          "We closed 8 deals within the first quarter. The AI-driven follow-up system ensures no lead ever goes cold. This is the future of real estate marketing.",
      },
      {
        name: "Sneha Kapoor",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        alt: "Sales professional",
        rating: "5",
        quote:
          "Our site visit ratio jumped from 5% to 22%. The quality of leads is unmatched — every conversation is with a genuine buyer ready to invest.",
      },
      {
        name: "Rajesh Kumar",
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        alt: "Marketing lead",
        rating: "5",
        quote:
          "The AI-driven follow-up system ensures no lead ever goes cold. This is the future of real estate marketing.",
      },
    ],
    headingSize: "44",
    descriptionSize: "16",
    ...cmsContent,
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()

  const validTestimonials = content.testimonials || []
  const visibleCount = isMobile ? 1 : 3
  const maxIndex = Math.max(0, validTestimonials.length - visibleCount)

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }, [maxIndex])

  // Auto-play functionality
  useEffect(() => {
    if (validTestimonials.length <= visibleCount) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0 // Reset to beginning when reaching the end
        }
        return prev + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [maxIndex, visibleCount, validTestimonials.length])

  if (validTestimonials.length === 0) return null

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 lg:py-10">
      <div className="max-w-8xl container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── HEADER ─── */}
        <div className="mx-auto mb-16 max-w-7xl text-center lg:mb-20">
          <div className="mb-5 inline-block rounded-full border border-orange-200 bg-orange-50 px-5 py-1.5 text-[11px] font-bold tracking-widest text-orange-500 uppercase">
            {content.pillText}
          </div>
          <h2
            className="mb-5 font-serif text-3xl leading-tight whitespace-pre-line text-gray-900 sm:text-4xl lg:text-[2.75rem]"
            style={{ fontSize: `${content.headingSize}px` }}
          >
            {content.heading}
          </h2>
          <p
            className="mx-auto max-w-7xl text-base leading-relaxed whitespace-pre-line text-gray-500"
            style={{ fontSize: `${content.descriptionSize}px` }}
          >
            {content.description}
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href={content.btnLink} className="group flex items-center gap-3 rounded-full bg-black py-2.5 pr-2.5 pl-8 text-white transition-transform hover:scale-105">
              <span className="text-[10px] font-bold tracking-widest uppercase">{content.btnText}</span>
              <div className="rounded-full bg-orange-500 p-2 transition-colors group-hover:bg-orange-400">
                <ArrowUpRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          </div>
        </div>

        {/* ─── FLOATING AVATARS ─── */}
        <div className="relative mx-auto mb-5 hidden h-[220px] max-w-4xl lg:block">
          {validTestimonials.slice(0, 6).map((testimonial: any, i: number) => {
            const defPos = avatarDefaults[i % avatarDefaults.length] || avatarDefaults[0]
            return (
              <div
                key={i}
                className="absolute transition-all duration-500 hover:scale-110"
                style={{
                  top: defPos?.top,
                  left: defPos?.left,
                  transform: "translate(-50%, 0)",
                }}
              >
                <div
                  className={`overflow-hidden rounded-full shadow-lg transition-all duration-500 ${
                    !isMobile && i === currentIndex + 1
                      ? "scale-110 ring-[3px] ring-orange-300 ring-offset-[3px] ring-offset-white"
                      : "ring-2 ring-white"
                  }`}
                  style={{
                    width: defPos?.size,
                    height: defPos?.size,
                  }}
                >
                  <Image
                    src={testimonial.src || "https://via.placeholder.com/200"}
                    alt={testimonial.alt || "Avatar"}
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Avatars — horizontal row */}
        <div className="mb-5 flex items-center justify-center gap-3 lg:hidden">
          {validTestimonials.slice(0, 5).map((testimonial: any, i: number) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "scale-110 ring-[3px] ring-orange-300 ring-offset-2 ring-offset-white"
                  : "ring-2 ring-white"
              }`}
              style={{
                width: i === currentIndex ? 64 : 48,
                height: i === currentIndex ? 64 : 48,
              }}
            >
              <Image
                src={testimonial.src || "https://via.placeholder.com/200"}
                alt={testimonial.alt || "Avatar"}
                fill
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* ─── TESTIMONIALS CAROUSEL ─── */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all hover:border-gray-300 hover:shadow-lg disabled:opacity-30 disabled:hover:shadow-md lg:-left-6"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all hover:border-gray-300 hover:shadow-lg disabled:opacity-30 disabled:hover:shadow-md lg:-right-6"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-6 lg:px-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {validTestimonials.map((t: any, i: number) => (
                <div key={i} className="w-full flex-shrink-0 px-3" style={{ flexBasis: `${100 / visibleCount}%` }}>
                  <div
                    className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] ${
                      !isMobile && i !== currentIndex + 1 ? "opacity-60 blur-sm" : ""
                    }`}
                  >
                    {/* Header: Avatar + Name + Google */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
                        <Image
                          src={t.src || "https://via.placeholder.com/200"}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
                        {/* Stars */}
                        <div className="mt-0.5 flex gap-0.5">
                          {[...Array(Number(t.rating) || 5)].map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <GoogleIcon />
                    </div>

                    {/* Quote */}
                    <p className="text-[13px] leading-relaxed text-gray-600">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          {maxIndex > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { SocialProofSection }
