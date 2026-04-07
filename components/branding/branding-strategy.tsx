"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function BrandingStrategy() {
  const [activeIndex, setActiveIndex] = useState(3) // Default to Positioning Framework

  const services = [
    {
      title: "Market & Competitor Intel",
      short: "Research",
      description:
        "Deep dive into your market landscape to understand competitive positioning, identify gaps, and uncover opportunities that set your brand apart.",
      points: [
        "Comprehensive market analysis to identify trends and opportunities",
        "Detailed competitor audit examining strengths and weaknesses",
        "Strategic insights report for market gap identification",
      ],
    },
    {
      title: "Core Audience Archetypes",
      short: "Personas",
      description:
        "Create detailed profiles of your ideal customers to ensure every brand decision resonates with the people who matter most to your business.",
      points: [
        "Audience research combining demographics and psychographics",
        "Detailed persona development with behavior patterns",
        "Customer journey mapping for optimized touchpoints",
      ],
    },
    {
      title: "Strategic Brand Architecture",
      short: "Architecture",
      description:
        "Structure your brand portfolio strategically to create clarity, maximize synergies, and ensure each sub-brand supports your vision.",
      points: [
        "Portfolio analysis for brand relationship clarity",
        "Strategic framework defining support hierarchies",
        "Consistent naming and visual system conventions",
      ],
    },
    {
      title: "Positioning & Niche Framework",
      short: "Positioning",
      description:
        "When you conform to competition, you collapse. We help you position your brand with an absolute clarity of who you are and what sets you apart.",
      points: [
        "Niche customer personas identification",
        "Competitive landscape positioning audit",
        "Unique stand identification in chosen market",
      ],
    },
    {
      title: "Voice & Communication Strategy",
      short: "Messaging",
      description:
        "Craft a cohesive messaging framework that ensures your brand speaks with one voice across all channels, creating consistency and building trust.",
      points: [
        "Core messaging, voice, tone, and brand pillars",
        "Channel-specific communication guidelines",
        "Journey-aligned content strategy framework",
      ],
    },
    {
      title: "Momentum Launch & Rollout",
      short: "Launch",
      description:
        "Execute a strategic brand launch that creates momentum, generates awareness, and ensures your new identity is adopted seamlessly.",
      points: [
        "Phased high-impact rollout planning",
        "Internal stakeholder alignment programs",
        "Integrated launch campaign marketing tactics",
      ],
    },
  ]

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#050505] py-24 lg:py-32">
      {/* Dynamic Background Element */}
      <div className="bg-primary/5 absolute top-1/4 -right-20 h-96 w-96 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Modern Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="bg-primary/40 h-px w-12" />
          <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">The Strategic Core</span>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[0.8fr,1.2fr] lg:gap-24">
          {/* Left Side: Services List */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6">
            {services.map((service, index) => (
              <motion.button
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className="group relative flex items-center gap-6 text-left outline-none"
              >
                <span
                  className={`text-4xl font-bold transition-all duration-300 ${
                    activeIndex === index ? "text-primary" : "text-white/10 group-hover:text-white/30"
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`text-2xl font-bold tracking-tight transition-all duration-300 md:text-3xl lg:text-4xl ${
                    activeIndex === index ? "text-white" : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {service.short}
                </span>
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="bg-primary h-2 w-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side: Active Content */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl leading-[1.1] font-bold text-white md:text-5xl lg:text-6xl">
                    {services[activeIndex]?.title}
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
                    {services[activeIndex]?.description}
                  </p>
                </div>

                <div className="grid gap-4">
                  {services[activeIndex]?.points.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-primary mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span className="text-base text-white/70">{point}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6"
                >
                  <Button
                    variant="link"
                    className="group hover:text-primary h-auto p-0 text-xl font-bold text-white no-underline transition-colors"
                  >
                    Discuss this strategy
                    <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
