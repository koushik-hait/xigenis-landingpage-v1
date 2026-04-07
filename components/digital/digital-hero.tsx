"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoSlider3D } from "./video-slider-3d"

export function DigitalHero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      {/* Background gradients */}
      <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-b via-transparent" />
      <div className="bg-primary/10 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Content */}
        <div className="mb-12 text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Digital Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading mb-6 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
          >
            <span className="text-foreground">Amplify Your</span>
            <br />
            <span className="from-primary to-primary animate-gradient bg-gradient-to-r via-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              Digital Presence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg sm:text-xl"
          >
            Transform your brand with compelling video content, strategic SEO, and data-driven digital marketing that
            delivers results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Our Work
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
              Get a Quote
            </Button>
          </motion.div>
        </div>

        {/* 3D Video Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <VideoSlider3D />
        </motion.div>

        {/* Stats below slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { value: "150+", label: "Videos Produced" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "50M+", label: "Views Generated" },
            { value: "3x", label: "Average ROI" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-heading text-primary text-3xl font-bold sm:text-4xl">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalHero
