"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

interface TransformationSectionProps {
  cmsContent?: any
}

export function TransformationSection({ cmsContent }: TransformationSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const content = {
    bgImage: "/assets/transformation-bg.jpg",
    pillLabel: "Sound Familiar?",
    headingLine1: "AI Lead System Results",
    headingLine2: "The 90-Day Transformation",
    ctaButtonText: "Start My 90 Days",
    ctaButtonLink: "#",
    description1:
      "This is the after state — what your pipeline, calendar, and revenue look like after 90 days working with our system.",
    description2: "No random referrals. No cold calling. Just a predictable system that brings serious buyers.",
    timelineSteps: [
      { number: "1", days: "Day 1-7", text: "System setup & target audience research" },
      { number: "2", days: "Day 8-14", text: "First qualified buyer appointments booked" },
      { number: "3", days: "Day 30-60", text: "Lead pipeline fills and site visits increase" },
      { number: "4", days: "Day 90", text: "3-5 property deals closed" },
    ],
    testimonials: [
      {
        name: "Ananya Singh",
        role: "Independent Agent — Delhi",
        revenue: "₹1.5 Cr Closed",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        text: "Struggled for months with generic leads. Within 60 days of implementing the system, she had a completely transformed pipeline with high-intent buyers, resulting in 3 major closures.",
        stats: ["32 buyer appointments", "3 luxury deals closed", "3 months timeline"],
        beforeVal: "₹8L",
        afterVal: "₹32L",
      },
      {
        name: "Rahul Sharma",
        role: "Luxury Broker — Mumbai",
        revenue: "₹2.1 Cr Closed",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        text: "From chasing portal leads to closing ₹2.1 Cr worth of luxury properties in just four months. The system generated qualified high-net-worth buyers, booked directly into his calendar.",
        stats: ["44 buyer appointments", "5 luxury deals closed", "4 months timeline"],
        beforeVal: "₹15L",
        afterVal: "₹48L",
      },
    ],
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent,
  }

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % content.testimonials.length)
  }, [content.testimonials.length])

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + content.testimonials.length) % content.testimonials.length)
  }, [content.testimonials.length])

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, [nextTestimonial])

  // Adjust nextTestimonial to logic for 2-card visibility loop
  // If there are N cards, and we show index i and i+1.
  // We want to loop from 0 to N-2 if we want to always show two?
  // No, if we have [Timeline] [T0] [T1], activeIndex 0 shows T0 and T1.
  // If we have only 2 testimonials, activeIndex can only be 0.
  // Wait, if content.testimonials.length is 2, then i=0 shows BOTH.
  // Let's make it more robust.

  return (
    <section className="relative w-full overflow-hidden bg-sky-100 py-10 lg:py-12">
      {/* Background Image - Sky with clouds */}
      <div
        className="absolute inset-0 z-0 h-[80%] w-full bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url('${content.bgImage}')` }}
      />

      {/* Soft gradient overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-sky-100/90 via-sky-50/70 to-white/60" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl flex-1"
          >
            {/* Pill Badge */}
            <div className="mb-8 inline-flex items-center rounded-full bg-[#F36B2B] px-4 py-1.5">
              <span className="text-[10px] font-bold tracking-widest text-white uppercase sm:text-xs">
                {content.pillLabel}
              </span>
            </div>

            {/* Heading */}
            <h2
              className="mb-10 font-serif text-4xl leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              style={{ fontSize: `${content.headingSize}px` }}
            >
              {content.headingLine1}
              <br />
              <span className="mt-2 block">{content.headingLine2}</span>
            </h2>

            {/* CTA Buttons */}
            <Link href={content.ctaButtonLink} className="flex items-center gap-3 group">
              <div className="rounded-full bg-white px-6 py-3.5 shadow-md transition-colors group-hover:bg-gray-50">
                <span className="text-[11px] font-bold tracking-widest text-gray-900 uppercase">
                  {content.ctaButtonText}
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F36B2B] text-white shadow-md transition-colors group-hover:bg-[#E05A1C]">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </Link>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="shrink-0 lg:w-[440px] lg:pt-20"
          >
            <p
              className="space-y-4 text-sm leading-relaxed font-medium text-gray-800 sm:text-[15px]"
              style={{ fontSize: `${content.descriptionSize}px` }}
            >
              <span className="block">{content.description1}</span>
              <span className="mt-4 block">{content.description2}</span>
            </p>
          </motion.div>
        </div>

        {/* CARDS TRACK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full sm:mt-24"
        >
          {/* We break out of the container padding on the right for elegant scroll on mobile/desktop */}
          <div className="no-scrollbar -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-8 sm:-mx-8 sm:gap-8 sm:px-8 lg:-mx-12 lg:overflow-hidden lg:px-12">
            {/* CARD 1: Timeline Tracker */}
            <div className="relative h-[380px] w-[300px] shrink-0 snap-start rounded-[2rem] bg-white p-4 shadow-xl sm:w-[380px] sm:px-8 sm:py-5">
              <div className="relative z-10 flex flex-col space-y-4">
                {content.timelineSteps.map((step: any, idx: number) => (
                  <div key={idx} className="relative flex items-start gap-2 sm:gap-3">
                    {/* Dotted line connecting steps */}
                    {idx !== content.timelineSteps.length - 1 && (
                      <div className="absolute top-8 bottom-[-1rem] left-[1rem] w-px border-l-[3px] border-dotted border-gray-300 sm:left-[1.25rem]" />
                    )}

                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F36B2B] text-[15px] font-bold text-white shadow-md ring-4 ring-white sm:h-10 sm:w-10 sm:text-lg">
                      {step.number}
                    </div>
                    <div className="pt-0.5">
                      <div className="mb-1 inline-block rounded-full bg-black px-3 py-1 text-[8px] font-bold tracking-widest text-white uppercase sm:text-[9px]">
                        {step.days}
                      </div>
                      <p className="pr-4 text-[13px] leading-tight font-medium text-gray-900 sm:text-[14px]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 2: Placeholder */}
            <div className="relative hidden w-[300px] shrink-0 snap-start rounded-[2rem] border border-white/10 bg-white/20 p-8 opacity-40 shadow-xl backdrop-blur-2xl transition-all sm:w-[380px] sm:p-10">
              {/* Dotted line */}
              <div className="absolute top-16 bottom-16 left-[3.25rem] w-px border-l-[3px] border-dotted border-gray-300 sm:left-[3.75rem]" />

              <div className="relative z-10 flex flex-col space-y-10">
                {content.timelineSteps.map((step: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F36B2B] text-lg font-bold text-white shadow-md ring-4 ring-white sm:h-12 sm:w-12">
                      {step.number}
                    </div>
                    <div className="pt-0.5">
                      <div className="mb-2 inline-block rounded-full bg-black px-3 py-1 text-[9px] font-bold tracking-widest text-white uppercase sm:text-[10px]">
                        {step.days}
                      </div>
                      <p className="pr-4 text-sm leading-snug font-medium text-gray-900 sm:text-[15px]">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Slider Container */}
            {/* Mobile Testimonials Cards (Simple horizontal layout) */}
            {content.testimonials.map((t: any, idx: number) => (
              <div
                key={idx}
                className="relative flex w-[300px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] border border-white/50 bg-white/90 p-8 shadow-xl backdrop-blur-md sm:w-[380px] sm:p-10 lg:hidden"
              >
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="mb-6 flex items-center gap-4">
                    <img
                      src={t.image || "/assets/man.png"}
                      alt={t.name}
                      className="h-14 w-14 rounded-full object-cover shadow-sm sm:h-16 sm:w-16"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{t.name}</h4>
                      <p className="mb-0.5 text-[11px] font-medium text-gray-500 sm:text-xs">
                        {t.role}
                      </p>
                      <p className="text-[13px] font-bold text-gray-900 sm:text-sm">
                        {t.revenue}
                      </p>
                    </div>
                  </div>

                  <p className="mb-8 text-xs leading-relaxed font-medium text-gray-600 sm:text-[14px]">
                    {t.text}
                  </p>

                  <div>
                    <div className="mb-4 inline-block rounded-full bg-black px-4 py-1.5 text-[9px] font-bold tracking-widest text-white uppercase shadow-md sm:text-[10px]">
                      REVENUE DASHBOARD
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                      <div className="flex flex-col gap-2">
                        {t.stats.map((stat: string, statIdx: number) => (
                          <div
                            key={statIdx}
                            className="w-max rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[9px] font-bold tracking-wide text-gray-600 uppercase"
                          >
                            {stat}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 sm:gap-4">
                        {/* Before Circle */}
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-gray-100 bg-white shadow-inner sm:h-20 sm:w-20">
                          <svg
                            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                            viewBox="0 0 36 36"
                          >
                            <path
                              className="text-[#F36B2B]"
                              strokeWidth="3"
                              fill="none"
                              stroke="currentColor"
                              strokeDasharray="25, 100"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="mt-0.5 text-center">
                            <div className="text-[10px] font-medium tracking-wide text-gray-400 sm:text-[8px]">
                              Before
                            </div>
                            <div className="text-[10px] leading-tight font-bold text-gray-700 sm:text-[9px]">
                              {t.beforeVal}
                              <br />
                              <span className="text-[10px] font-normal text-gray-500 sm:text-[8px]">
                                / month
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* After Circle */}
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-gray-100 bg-white shadow-inner sm:h-20 sm:w-20">
                          <svg
                            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                            viewBox="0 0 36 36"
                          >
                            <path
                              className="text-[#F36B2B]"
                              strokeWidth="4"
                              fill="none"
                              stroke="currentColor"
                              strokeDasharray="85, 100"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="mt-0.5 text-center">
                            <div className="text-[10px] font-bold tracking-wide text-[#F36B2B] sm:text-[8px]">
                              After
                            </div>
                            <div className="text-[10px] leading-tight font-bold text-gray-700 sm:text-[9px]">
                              {t.afterVal}
                              <br />
                              <span className="text-[10px] font-normal text-gray-700 sm:text-[8px]">
                                / month
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Testimonials Slider Container (Desktop Only) */}
            <div className="relative hidden flex-1 lg:block [--card-width:300px] [--gap:24px] md:[--card-width:450px] md:[--gap:32px]">
              <div className="overflow-hidden px-2 py-4">
                <motion.div
                  className="flex gap-[var(--gap)]"
                  animate={{
                    x: `calc(-${activeIndex} * (var(--card-width) + var(--gap)))`,
                  }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                >
                  {content.testimonials.map((t: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative flex w-[var(--card-width)] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/50 bg-white/90 p-8 shadow-xl backdrop-blur-md transition-all duration-500 sm:p-10"
                      style={{
                        opacity: idx >= activeIndex && idx < activeIndex + 2 ? 1 : 0.4,
                        transform:
                          idx >= activeIndex && idx < activeIndex + 2 ? "scale(1)" : "scale(0.95)",
                      }}
                    >
                      {/* Transparent Overlay for First Visible Card */}
                      {idx === activeIndex && (
                        <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[4px] transition-opacity duration-500" />
                      )}

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="mb-6 flex items-center gap-4">
                          <img
                            src={t.image || "/assets/man.png"}
                            alt={t.name}
                            className="h-14 w-14 rounded-full object-cover shadow-sm sm:h-16 sm:w-16"
                          />
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{t.name}</h4>
                            <p className="mb-0.5 text-[11px] font-medium text-gray-500 sm:text-xs">
                              {t.role}
                            </p>
                            <p className="text-[13px] font-bold text-gray-900 sm:text-sm">
                              {t.revenue}
                            </p>
                          </div>
                        </div>

                        <p className="mb-8 text-xs leading-relaxed font-medium text-gray-600 sm:text-[14px]">
                          {t.text}
                        </p>

                        <div>
                          <div className="mb-4 inline-block rounded-full bg-black px-4 py-1.5 text-[9px] font-bold tracking-widest text-white uppercase shadow-md sm:text-[10px]">
                            REVENUE DASHBOARD
                          </div>
                          <div className="flex flex-wrap items-end justify-between gap-6">
                            <div className="flex flex-col gap-2">
                              {t.stats.map((stat: string, statIdx: number) => (
                                <div
                                  key={statIdx}
                                  className="w-max rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[9px] font-bold tracking-wide text-gray-600 uppercase"
                                >
                                  {stat}
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-3 sm:gap-4">
                              {/* Before Circle */}
                              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-gray-100 bg-white shadow-inner sm:h-20 sm:w-20">
                                <svg
                                  className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    className="text-[#F36B2B]"
                                    strokeWidth="3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeDasharray="25, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                </svg>
                                <div className="mt-0.5 text-center">
                                  <div className="text-[10px] font-medium tracking-wide text-gray-400 sm:text-[8px]">
                                    Before
                                  </div>
                                  <div className="text-[10px] leading-tight font-bold text-gray-700 sm:text-[9px]">
                                    {t.beforeVal}
                                    <br />
                                    <span className="text-[10px] font-normal text-gray-500 sm:text-[8px]">
                                      / month
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* After Circle */}
                              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-gray-100 bg-white shadow-inner sm:h-20 sm:w-20">
                                <svg
                                  className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    className="text-[#F36B2B]"
                                    strokeWidth="4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeDasharray="85, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                </svg>
                                <div className="mt-0.5 text-center">
                                  <div className="text-[10px] font-bold tracking-wide text-[#F36B2B] sm:text-[8px]">
                                    After
                                  </div>
                                  <div className="text-[10px] leading-tight font-bold text-gray-700 sm:text-[9px]">
                                    {t.afterVal}
                                    <br />
                                    <span className="text-[10px] font-normal text-gray-700 sm:text-[8px]">
                                      / month
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slider Controls */}
              <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
                <button
                  onClick={prevTestimonial}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                  {content.testimonials.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? "w-8 bg-[#F36B2B]" : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Empty space placeholder for smooth scrolling to edge */}
            <div className="w-[1px] shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
