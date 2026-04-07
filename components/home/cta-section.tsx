"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTASectionProps {
  scrollToSection: (sectionId: string) => void
}

export function CTASection({ scrollToSection }: CTASectionProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b0f3b] px-4 py-32 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-[200px]" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/3 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/3 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-400">
            Ready to Get Started?
          </span>

          <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Generate Qualified Property Buyer Leads{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
              Without Wasting Money
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/50">
            Book a free strategy call and discover how our AI-powered system can build your
            predictable buyer pipeline in just 90 days.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group bg-emerald-500 px-10 py-7 text-lg font-semibold text-white shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]"
              onClick={() => scrollToSection("contact")}
            >
              Build My Own Pipeline
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 px-10 py-7 text-lg text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Phone className="mr-2 h-5 w-5" />
              Speak With a Strategy Expert
            </Button>
          </div>

          {/* Response time indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 inline-flex items-center gap-6 rounded-full border border-white/5 bg-white/[0.03] px-8 py-4 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="text-xs text-white/30">Avg. agent response</div>
              <div className="text-2xl font-black text-red-400">24h</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-xs text-white/30">AI Algo-Plex response</div>
              <div className="text-2xl font-black text-emerald-400">5m</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
