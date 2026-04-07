"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const forYou = [
  "You can handle 8–12 qualified buyer leads per month",
  "You want predictable site visits every week",
  "You're willing to invest in a proven system",
  "You understand that quality beats quantity",
  "You're tired of cold leads and fake numbers",
]

const notForYou = [
  "You are just starting in real estate",
  "You are looking for cheap or random leads",
  "You don't have a structured sales closing process",
  "You only work with low-budget property deals",
  "You expect overnight results without commitment",
]

export function TargetAudienceSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Is This Right For You?
          </h2>
          <p className="text-lg text-gray-500">
            Our system works best for serious real estate professionals
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* For You */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/50"
          >
            <div className="border-b border-emerald-100 bg-emerald-600 p-6">
              <h3 className="text-xl font-bold text-white">This is for you if</h3>
            </div>
            <div className="space-y-4 p-6">
              {forYou.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Not For You */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-3xl border border-red-100 bg-red-50/50"
          >
            <div className="border-b border-red-100 bg-red-500 p-6">
              <h3 className="text-xl font-bold text-white">This is NOT for you if</h3>
            </div>
            <div className="space-y-4 p-6">
              {notForYou.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500">
                    <X className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
