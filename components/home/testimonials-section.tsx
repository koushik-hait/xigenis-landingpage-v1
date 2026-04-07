"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Quote, Users } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Real Estate Agent | Mumbai",
    quote:
      "The system completely changed how we generate buyer leads. Instead of chasing random inquiries, we now speak with serious property buyers who are ready to visit and invest.",
    stats: "5+ Deals closed in 90 days · 47 Qualified appointments",
    badge: "TOP CLOSER",
  },
  {
    name: "Amrita Verma",
    role: "Agent | Mumbai",
    quote:
      "320+ qualified buyer leads in 60 days. ₹4.2 Cr property deals closed. 210+ high-intent buyer inquiries generated.",
    stats: "320+ qualified buyer leads in 60 days",
    badge: "TOP CLOSER",
  },
  {
    name: "Priya Nair",
    role: "Developer | Bangalore",
    quote:
      "Before Xigenis, we were spending ₹1L/month on portals with zero tracking. Now every rupee is accounted for and we see 4x more quality site visits.",
    stats: "4x more site visits · ₹8.5 Cr pipeline",
    badge: "TOP PERFORMER",
  },
]

const resultCards = [
  {
    name: "Amrita Verma",
    role: "Agent | Mumbai",
    badge: "TOP CLOSER",
    results: [
      "320+ qualified buyer leads in 60 days",
      "₹4.2 Cr property deals closed",
      "210+ high-intent buyer inquiries generated",
    ],
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-gray-950 px-4 py-24 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-[150px]" />
        <div className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            AI Algo-Plex · Verified Results
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left - Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              How We Change Their{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Business
              </span>
            </h2>
            <p className="mb-8 max-w-xl text-lg text-white/50">
              Real success stories from agents who generated qualified buyer leads, increased site
              visits, and closed high-value property deals using our proven system.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-400">
              SEE HOW IT WORKS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right - Result card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {resultCards.map((card, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-white/5 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-400 text-lg font-bold text-white">
                    {card.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{card.name}</span>
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-400">
                        {card.badge}
                      </span>
                    </div>
                    <span className="text-sm text-white/40">{card.role}</span>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3 p-6">
                  {card.results.map((result, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-sm text-white/70">{result}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 border-t border-white/5 px-6 py-4">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-950 bg-gray-800 text-[10px] text-white/60"
                      >
                        <Users className="h-3 w-3" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-white/30">+12 MORE SUCCESS STORIES</span>
                  <span className="ml-auto text-xs text-white/30">
                    Agents · CPs · Builders · Brokers
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-1 -left-1 h-6 w-6 text-emerald-500/20" />
                <p className="pl-6 text-sm leading-relaxed text-white/60">&ldquo;{t.quote}&rdquo;</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 text-sm font-bold text-emerald-400">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-white/30">Trusted by 100+ B2B Organizations</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-30">
            {["High-Intent Property Buyers", "Qualified Buyer Inquiries Fast", "Full Campaign Transparency", "More Site Visits & Deals"].map((tag) => (
              <span key={tag} className="text-sm text-white/40">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
