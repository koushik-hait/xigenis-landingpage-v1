"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function UIUXServicesSection() {
  const [activeService, setActiveService] = useState("User Journey & Navigation")

  const services = [
    "User Journey & Navigation",
    "UX App Design (Web/Mobile)",
    "Wireframes & UI Systems",
    "Forms & Landing Pages",
    "UX Testing & Optimization",
  ]

  const serviceContent: Record<string, { description: string; points: string[] }> = {
    "User Journey & Navigation": {
      description:
        "We architect logical flowcharts and navigation systems that guide users effortlessly to their goals, ensuring every interaction feels natural and intuitive.",
      points: [
        "Intuitive information architecture and site mapping",
        "Logical user flow optimization for reduced friction",
        "Strategic navigation hierarchies for effortless exploration",
      ],
    },
    "UX App Design (Web/Mobile)": {
      description:
        "Our user-centric approach combines behavioral psychology with aesthetic precision to build applications that are as functional as they are beautiful.",
      points: [
        "Behavior-driven design patterns for higher engagement",
        "Cross-platform consistency for seamless experiences",
        "Accessible and inclusive interface standards",
      ],
    },
    "Wireframes & UI Systems": {
      description:
        "From low-fidelity blueprints to high-fidelity prototypes, we design scalable interface systems that align perfectly with your brand identity.",
      points: [
        "Rapid prototyping for quick iteration and feedback",
        "High-fidelity visual design systems",
        "Responsive layouts for all device sizes",
      ],
    },
    "Forms & Landing Pages": {
      description:
        "We design streamlined forms and high-converting landing pages that reduce friction and turn visitors into loyal customers.",
      points: [
        "Conversion-optimized form logic and layout",
        "Persuasive design elements to boost CTA clicks",
        "Frictionless input fields and validation",
      ],
    },
    "UX Testing & Optimization": {
      description:
        "Through rigorous usability testing and heat mapping, we refine designs to eliminate pain points and enhance overall satisfaction.",
      points: [
        "Real-user usability testing sessions",
        "Heatmap analysis and behavioral tracking",
        "Data-driven design iterations for continuous improvement",
      ],
    },
  }

  return (
    <section className="bg-secondary px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-primary/20 font-heading text-6xl font-bold sm:text-7xl lg:text-8xl">01</span>
              <div>
                <h2 className="font-heading text-card-foreground text-3xl font-bold sm:text-4xl lg:text-5xl">
                  UI/UX DESIGN
                </h2>
                <p className="text-muted-foreground mt-2 text-xl font-medium">
                  Designing for <span className="text-primary">Impact</span> & Usability
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              We don't just design screens; we craft experiences. By bridging the gap between user needs and business
              goals, we create digital products that are intuitive, engaging, and scalable.
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group font-semibold">
            Start a Project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Services List */}
          <div className="space-y-2 lg:col-span-5">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => setActiveService(service)}
                className={`group flex w-full items-center justify-between rounded-xl p-4 text-left text-lg font-medium transition-all duration-300 ${
                  activeService === service
                    ? "text-primary shadow-primary/5 bg-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                }`}
              >
                <span>{service}</span>
                {activeService === service && (
                  <motion.div layoutId="active-dot" className="bg-primary h-2 w-2 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          <div className="lg:col-span-7">
            <div className="bg-card border-border shadow-primary/5 h-full rounded-2xl border p-8 shadow-xl sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <h3 className="font-heading text-card-foreground text-2xl font-bold sm:text-3xl">{activeService}</h3>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {serviceContent[activeService]!.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-heading text-primary text-sm font-bold tracking-wider uppercase">
                      Key Deliverables
                    </h4>
                    <ul className="grid gap-4 sm:grid-cols-1">
                      {serviceContent[activeService]!.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary mt-1 h-5 w-5 shrink-0" />
                          <span className="text-card-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
