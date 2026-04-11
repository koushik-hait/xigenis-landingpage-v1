"use client"

import { motion } from "framer-motion"
import { AlertTriangle, PhoneOff, TrendingDown, UserX } from "lucide-react"
import Image from "next/image"
import { XCircle } from "lucide-react"

interface ProblemsSectionProps {
  cmsContent?: any
}

export function ProblemsSection({ cmsContent }: ProblemsSectionProps) {
  const content = {
    pillText: "The Real Problem",
    heading: "You're not failing. Your pipeline has a leak.",
    description: "Agents closing 4–5 deals every 90 days aren't smarter. They just fixed these 3 things.",
    introPill: "Sound Familiar?",
    introHeading: "Your Lead Problem Is Not What You Think",
    introPoints: [
      "Do you spend ₹30K to ₹1L on ads and still get 80% fake numbers?",
      "Are you chasing 100 leads a month but can't get 4 site visits a week?",
      "Have you tried portals, freelancers, and cold calls and NOTHING worked consistently?"
    ],
    introPara: "You're not bad at sales. You're using a broken system in a market that rewards speed, follow-up, and qualified traffic — not volume.",
    stat1Value: "900%",
    stat1Label: "Higher conversion when you respond within 5 minutes",
    stat2Value: "72%",
    stat2Label: "Agents say unqualified leads are their #1 problem",
    stat3Value: "3-5%",
    stat3Label: "Average lead-to-site-visit conversion in India",
    stat4Value: "60%",
    stat4Label: "Of leads die because no one follows up after Day 2",
    bgImage: "/assets/problems-bg.png",
    mainImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    headingSize: "48",
    descriptionSize: "16",
    ...cmsContent
  }

  return (
    <section
      id="problems"
      className="relative overflow-hidden border-b border-gray-100 bg-[#FAFAFA] px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-5 inline-block rounded-full bg-[#FFF0E6] px-3.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-[#FF5A1F] uppercase">
            {content.pillText}
          </span>
          <h2 className="mb-5 font-serif text-[32px] leading-[1.1] font-normal tracking-[-0.02em] text-[#111] sm:text-[40px] md:text-[46px]" style={{ fontSize: `${content.headingSize}px` }}>
            {content.heading}
          </h2>
          <p className="mx-auto max-w-[460px] text-[15px] leading-[1.6] font-normal text-[#666] sm:text-[16px]" style={{ fontSize: `${content.descriptionSize}px` }}>
            {content.description}
          </p>
        </motion.div>

        {/* lead problem  */}
        <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-gradient-to-r from-white to-orange-50 pt-20 pb-16">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-100">
            <div className="h-full w-full object-cover bg-cover bg-center" style={{ backgroundImage: `url('${content.bgImage}')` }} />
          </div>

          {/* Mobile Horizontal Scroll Layout */}
          <div className="lg:hidden absolute inset-0 z-10">
            <div className="overflow-x-auto snap-x snap-mandatory h-full">
              <div className="flex gap-4 h-full" style={{ minWidth: 'max-content', padding: '0 1rem' }}>
                {/* First Screen - Header and Intro */}
                <div className="flex-shrink-0 w-[85vw] snap-center flex flex-col justify-center py-20">
                  <div className="px-4">
                    <div className="inline-block rounded-full bg-gray-800 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase mb-6">
                      {content.introPill}
                    </div>
                    <h1 className="font-serif text-3xl leading-tight text-gray-100 sm:text-4xl mb-8">
                      {content.introHeading}
                    </h1>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                      <ul className="space-y-4 mb-6">
                        {content.introPoints.map((text: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 fill-red-100 text-red-500" />
                            <span className="text-sm leading-snug font-medium text-gray-700">{text}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {content.introPara}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Screen - Visual with Stats */}
                <div className="hidden flex-shrink-0 w-[85vw] snap-center flex flex-col justify-center py-20">
                  <div className="px-4">
                    <div className="relative h-[600px] rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-lg">
                      {/* Main Image */}
                      <div className="relative h-[350px] w-full mb-6">
                        <Image
                          src={content.mainImage}
                          alt="Smiling Professional"
                          fill
                          className="object-cover rounded-2xl"
                        />
                      </div>

                      {/* Floating Stats */}
                      <div className="absolute top-8 right-8 bg-[#F97316] text-white p-4 rounded-2xl shadow-lg max-w-[140px]">
                        <div className="font-serif text-2xl">{content.stat1Value}</div>
                        <div className="text-xs opacity-90">{content.stat1Label}</div>
                      </div>

                      <div className="absolute top-32 left-8 bg-black text-white p-4 rounded-2xl shadow-lg max-w-[140px]">
                        <div className="font-serif text-2xl">{content.stat2Value}</div>
                        <div className="text-xs opacity-80">{content.stat2Label}</div>
                      </div>

                      <div className="absolute bottom-8 right-8 bg-white border border-gray-100 p-4 rounded-2xl shadow-lg max-w-[140px]">
                        <div className="font-serif text-2xl text-[#D97706]">{content.stat3Value}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">{content.stat3Label}</div>
                      </div>

                      <div className="absolute bottom-8 left-8 bg-white border border-gray-100 p-4 rounded-2xl shadow-lg max-w-[140px]">
                        <div className="font-serif text-2xl text-[#D97706]">{content.stat4Value}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">{content.stat4Label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="relative z-10 hidden lg:block container mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-8">
              {/* Left Column: Text Content */}
              <div className="w-full space-y-8 lg:w-1/2">
                <div className="inline-block rounded-full bg-gray-800 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                  {content.introPill}
                </div>

                <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl lg:text-6xl max-w-[15ch]">
                  {content.introHeading}
                </h1>

                <ul className="space-y-5">
                  {content.introPoints.map((text: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-6 w-6 flex-shrink-0 fill-red-100 text-red-500" />
                      <span className="text-lg leading-snug font-medium text-gray-700">{text}</span>
                    </li>
                  ))}
                </ul>

                <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                  {content.introPara}
                </p>
              </div>

              {/* Right Column: Image and Floating Cards */}
              <div className="relative mt-12 flex min-h-[600px] w-full items-end justify-center lg:mt-0 lg:min-h-[700px] lg:w-1/2">
                <div className="relative lg:hidden z-10 h-[500px] w-[300px] sm:h-[600px] sm:w-[400px] lg:w-[450px]">
                  <Image
                    src={content.mainImage}
                    alt="Smiling Professional"
                    fill
                    className=" object-cover"
                  />
                </div>

                {/* Floating Cards Container */}
                <div className="pointer-events-none absolute inset-0 z-20">
                  {/* Orange Card (Left Middle) */}
                  <div className="pointer-events-auto absolute top-[30%] -left-4 max-w-[220px] transform rounded-3xl bg-[#F97316] p-6 text-white shadow-xl transition hover:scale-105 sm:left-0 lg:top-[40%] lg:-left-12">
                    <h3 className="mb-2 font-serif text-4xl">{content.stat1Value}</h3>
                    <p className="text-sm leading-tight font-medium opacity-90">
                      {content.stat1Label}
                    </p>
                  </div>

                  {/* Black Card (Right Middle) */}
                  <div className="pointer-events-auto absolute top-[20%] -right-4 max-w-[200px] transform rounded-3xl bg-black p-6 text-white shadow-xl transition hover:scale-105 sm:right-0 lg:top-[30%] lg:-right-8">
                    <h3 className="mb-2 font-serif text-4xl">{content.stat2Value}</h3>
                    <p className="text-xs leading-tight font-medium opacity-80">
                      {content.stat2Label}
                    </p>
                  </div>

                  {/* White Card 1 (Bottom Left) */}
                  <div className="pointer-events-auto absolute bottom-12 left-0 max-w-[180px] transform rounded-3xl border border-gray-100 bg-white p-5 text-center text-gray-900 shadow-lg transition hover:scale-105 sm:left-8 lg:bottom-24 lg:left-0">
                    <h3 className="mb-2 font-serif text-3xl text-[#D97706]">{content.stat3Value}</h3>
                    <p className="text-[11px] leading-tight font-semibold tracking-wide text-gray-500 uppercase">
                      {content.stat3Label}
                    </p>
                  </div>

                  {/* White Card 2 (Bottom Right) */}
                  <div className="pointer-events-auto absolute -right-4 bottom-4 max-w-[180px] transform rounded-3xl border border-gray-100 bg-white p-5 text-center text-gray-900 shadow-lg transition hover:scale-105 sm:right-8 lg:-right-4 lg:bottom-12">
                    <h3 className="mb-2 font-serif text-3xl text-[#D97706]">{content.stat4Value}</h3>
                    <p className="text-[11px] leading-tight font-semibold tracking-wide text-gray-500 uppercase">
                      {content.stat4Label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </section>
  )
}
