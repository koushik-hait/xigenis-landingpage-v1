"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "72%", label: "Agents say unqualified leads are their #1 problem" },
  { value: "3–5%", label: "Average lead-to-site-visit conversion in India" },
  { value: "900%", label: "Higher conversion when you respond within 5 minutes" },
  { value: "60%", label: "Of leads die because no one follows up after Day 2" },
]

const growthStats = [
  { value: "2X", sublabel: "Faster Growth", note: "Vs industry peers" },
  { value: "4X", sublabel: "Higher Sales", note: "Vs non-clients" },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0f3b] px-4 py-24 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Growth stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 grid gap-8 sm:grid-cols-2"
        >
          {growthStats.map((stat, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-white/5 bg-white/[0.03] p-10 text-center backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/[0.06]"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="mb-3 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-7xl font-black text-transparent sm:text-8xl"
              >
                {stat.value}
              </motion.div>
              <div className="text-xl font-bold text-white">{stat.sublabel}</div>
              <div className="text-sm text-white/40">{stat.note}</div>
            </div>
          ))}
        </motion.div>

        {/* Key metrics grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.05]"
            >
              <div className="mb-3 text-4xl font-black text-emerald-400">{stat.value}</div>
              <p className="text-sm leading-relaxed text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
