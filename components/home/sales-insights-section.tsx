"use client"

import { motion } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"
import { ExploreButton } from "@/components/ui/explore-button"

const categories = [
  {
    title: "Residential Real Estate",
    stats: { campaigns: "340+", rate: "78%", rateLabel: "Pre-Qualified Buyer Rate" },
    active: true,
  },
  { title: "Commercial Real Estate", stats: null, active: false },
  { title: "Farmlands & Farmhouses", stats: null, active: false },
  { title: "Special Purpose Real Estate", stats: null, active: false },
  { title: "Industrial Real Estate", stats: null, active: false },
]

export function SalesInsightsSection() {
  return (
    <section id="insights" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left - Header & Categories */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                Sales Insights
              </span>
              <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Real Estate Performance Metrics
              </h2>
              <p className="mb-8 text-lg text-gray-500">
                Turning property insights into measurable success across every segment.
              </p>
              <ExploreButton className="mx-0 mb-12">
                <span className="text-sm font-semibold">SEE HOW IT WORKS</span>
              </ExploreButton>
            </motion.div>

            {/* Categories List */}
            <div className="space-y-3">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all duration-300 ${
                    cat.active
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-lg font-semibold ${cat.active ? "text-emerald-700" : "text-gray-700"}`}
                  >
                    {cat.title}
                  </span>
                  <button
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      cat.active
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-600 shadow-sm group-hover:bg-gray-200"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl">
              {/* Active card stats */}
              <div className="mb-8 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-gray-500">Residential Real Estate</span>
                <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  Achievement Metrics
                </span>
              </div>

              {/* Main stat */}
              <div className="mb-8 text-center">
                <div className="mb-1 text-6xl font-black text-gray-900">340+</div>
                <p className="text-sm text-gray-500">Residential Campaigns Delivered</p>
              </div>

              {/* Sub stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-50 p-6 text-center">
                  <div className="text-3xl font-black text-emerald-600">78%</div>
                  <div className="text-xs text-emerald-600/70">Pre-Qualified Buyer Rate</div>
                </div>
                <div className="rounded-2xl bg-gray-100 p-6 text-center">
                  <div className="text-3xl font-black text-gray-700">4.2x</div>
                  <div className="text-xs text-gray-500">Average ROI</div>
                </div>
              </div>

              {/* Pipeline bar */}
              <div className="mt-8">
                <div className="mb-2 flex justify-between text-xs text-gray-400">
                  <span>Pipeline Progress</span>
                  <span>₹25 Cr+ Created</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "78%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
                  />
                </div>
              </div>
            </div>

            {/* Floating decorator */}
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-blue-100/50 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
