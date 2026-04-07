"use client"

import { motion } from "framer-motion"
import { Shield, Target, Zap, Users, BarChart3, Clock, Award, Lock } from "lucide-react"

const reasons = [
  {
    number: "1",
    icon: Lock,
    title: "Exclusive Market Access",
    subtitle: "Secure Your Market Before a Competitor Does & Own Your City",
    description:
      "We take one client per property segment per city. Once your slot is filled, your competitors can never access the same system — ever.",
    highlight: "1 client per city zone — guaranteed",
  },
  {
    number: "2",
    icon: Target,
    title: "Results-Focused System",
    subtitle: "We Measure Success Only by Closed Deals",
    description:
      "Unlike traditional marketing agencies that focus on impressions or clicks, our system is built around real outcomes.",
    highlight: "1 client per city zone — guaranteed",
  },
  {
    number: "3",
    icon: Zap,
    title: "AI Lead Qualification",
    subtitle: "Speak Only With Serious Buyers",
    description:
      "Our AI filters out tire-kickers and time-wasters. You only speak with genuinely interested buyers who have real purchasing intent.",
    highlight: "Pre-qualified leads only",
  },
  {
    number: "4",
    icon: Clock,
    title: "5-Minute Auto Response",
    subtitle: "Never Lose a Hot Lead Again",
    description:
      "Our system responds to every inquiry within 5 minutes — automatically. Speed is the #1 factor in lead conversion.",
    highlight: "Under 5 minutes response time",
  },
  {
    number: "5",
    icon: BarChart3,
    title: "Full Campaign Transparency",
    subtitle: "See Every Metric, Every Rupee Spent",
    description:
      "Real-time dashboards show exactly where your money goes and what results it produces. No black-box marketing.",
    highlight: "Complete visibility into ROI",
  },
  {
    number: "6",
    icon: Users,
    title: "Dedicated Strategy Team",
    subtitle: "Real Estate Marketing Experts Assigned to You",
    description:
      "Work with professionals who understand real estate. Our team has generated 5000+ qualified buyer leads.",
    highlight: "Industry-specific expertise",
  },
  {
    number: "7",
    icon: Award,
    title: "More Site Visits & Deals",
    subtitle: "Predictable Results You Can Count On",
    description:
      "Our system doesn't just generate leads — it converts them into site visits and closed deals through automated nurturing.",
    highlight: "End-to-end deal pipeline",
  },
  {
    number: "8",
    icon: Shield,
    title: "High-Intent Property Buyers",
    subtitle: "Quality Over Quantity, Always",
    description:
      "Every lead is scored and verified for genuine buying intent before it reaches you. No fake numbers, no cold calls.",
    highlight: "Verified buyer intent",
  },
]

export function ReasonsSection() {
  return (
    <section id="reasons" className="relative overflow-hidden bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            Why Choose Us
          </span>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            8 Reasons Top Real Estate Professionals
            <br />
            <span className="text-emerald-600">Choose Our AI Lead System</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-500">
            Most agencies promise leads. We build a predictable pipeline of qualified property buyers
            that turns into site visits and closed deals.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                {/* Number */}
                <div className="absolute top-4 right-4 text-5xl font-black text-gray-100 transition-colors group-hover:text-emerald-50">
                  {reason.number}
                </div>

                {/* Icon */}
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-colors group-hover:bg-emerald-100">
                  <Icon className="h-6 w-6 text-emerald-600" />
                </div>

                {/* Content */}
                <h3 className="relative mb-2 text-lg font-bold text-gray-900">{reason.title}</h3>
                <p className="relative mb-3 text-sm font-medium text-emerald-600">{reason.subtitle}</p>
                <p className="relative mb-4 text-sm leading-relaxed text-gray-500">{reason.description}</p>

                {/* Highlight */}
                <div className="relative rounded-lg bg-emerald-50 px-3 py-2">
                  <span className="text-xs font-medium text-emerald-700">{reason.highlight}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
