"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Palette } from "lucide-react"

export default function GraphicsSection() {
  const [activeService, setActiveService] = useState("Social Media Perception")

  const services = [
    "Social Media Perception",
    "Digital & Print Assets",
    "Packaging Design",
    "Ambient Branding",
    "Video Production",
  ]

  const serviceContent: Record<string, { description: string; points: string[] }> = {
    "Social Media Perception": {
      description:
        "We create visual narratives that stop the scroll. Our designs ensure your brand maintains a consistent, high-impact presence across all social interactions.",
      points: [
        "Curated visual themes for Instagram/LinkedIn grid consistency",
        "High-engagement post templates and story design",
        "Platform-specific visual optimization",
      ],
    },
    "Digital & Print Assets": {
      description:
        "From digital banners to tangible brochures, we ensure every touchpoint reflects your brand's excellence with pixel-perfect precision.",
      points: [
        "On-brand marketing collateral (brochures, flyers, business cards)",
        "Digital assets for web and email campaigns",
        "Event branding and exhibition materials",
      ],
    },
    "Packaging Design": {
      description:
        "We turn unboxing into an experience. Our packaging designs blend aesthetics with functionality to tell your product's story at first glance.",
      points: [
        "Product label and box design focused on shelf appeal",
        "Sustainable and structural packaging solutions",
        "Unboxing experience design for customer delight",
      ],
    },
    "Ambient Branding": {
      description:
        "Transform physical spaces into immersive brand experiences. We design environments that communicate your identity through every corner.",
      points: [
        "Office and retail environmental graphics",
        "Wayfinding systems and signage design",
        "Large-format wall murals and installations",
      ],
    },
    "Video Production": {
      description:
        "Motion evokes emotion. We produce compelling video content and motion graphics that dynamicize your message and capture attention.",
      points: [
        "Promotional videos and brand showreels",
        "Motion graphics and kinetic typography",
        "Social media reels and short-form video editing",
      ],
    },
  }

  return (
    <section className="bg-background relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-muted-foreground/20 font-heading text-6xl font-bold sm:text-7xl lg:text-8xl">
                02
              </span>
              <div>
                <h2 className="font-heading text-foreground text-3xl font-bold sm:text-4xl lg:text-5xl">
                  GRAPHICS DESIGN
                </h2>
                <p className="text-muted-foreground mt-2 text-xl font-medium">
                  Visuals that <span className="text-primary">Speak</span> & Inspire
                </p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              Your brand is more than a logo; it's a visual language. We craft cohesive design systems that communicate
              your values and captivate your audience across every medium.
            </p>
          </div>
          <Button size="lg" variant="outline" className="group border-2 font-semibold">
            View Portfolio
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Active Service Content (Left on Desktop for variety) */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="bg-secondary/30 border-border shadow-primary/5 h-full rounded-2xl border p-8 shadow-xl sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                      <Palette className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-card-foreground text-2xl font-bold sm:text-3xl">
                      {activeService}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {serviceContent[activeService]!.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-heading text-primary text-sm font-bold tracking-wider uppercase">
                      What We Deliver
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

          {/* Services List (Right on Desktop) */}
          <div className="order-1 space-y-2 lg:order-2 lg:col-span-5">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => setActiveService(service)}
                className={`group flex w-full items-center justify-between rounded-xl p-4 text-left text-lg font-medium transition-all duration-300 ${
                  activeService === service
                    ? "text-primary shadow-primary/5 bg-secondary shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span>{service}</span>
                {activeService === service && (
                  <motion.div layoutId="active-dot-graphics" className="bg-primary h-2 w-2 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
