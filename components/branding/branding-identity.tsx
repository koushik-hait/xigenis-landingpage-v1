"use client"

import { motion } from "framer-motion"
import { Palette, Type, Fingerprint, Layout, BookOpen, CreditCard } from "lucide-react"

export default function BrandingIdentity() {
  const assets = [
    {
      title: "Strategic Naming",
      short: "Naming",
      icon: <Fingerprint className="text-primary h-8 w-8" />,
      description:
        "A powerful name is the foundation. We craft names that are memorable and perfectly aligned with your market position.",
      tags: ["Linguistic", "Screening", "Memorable"],
    },
    {
      title: "Visual Cornerstone",
      short: "Logo",
      icon: <Layout className="h-8 w-8 text-blue-400" />,
      description:
        "Cornerstone of your identity. Distinctive, versatile, and timeless icons that create instant recognition.",
      tags: ["Scalable", "Timeless", "Versatile"],
    },
    {
      title: "Emotional Palette",
      short: "Colors",
      icon: <Palette className="h-8 w-8 text-purple-400" />,
      description:
        "Developing strategic color systems that reinforce personality and evoke the right emotions across touchpoints.",
      tags: ["Psychology", "Accessible", "Cohesive"],
    },
    {
      title: "Expressive Type",
      short: "Typography",
      icon: <Type className="h-8 w-8 text-emerald-400" />,
      description:
        "Pairing typefaces that enhance readability, express personality, and create a sophisticated visual language.",
      tags: ["Hierarchy", "Legible", "Distinctive"],
    },
    {
      title: "System Guidelines",
      short: "Style Guide",
      icon: <BookOpen className="h-8 w-8 text-orange-400" />,
      description:
        "Comprehensive guides ensuring your brand is expressed perfectly by every team member across every medium.",
      tags: ["Consistent", "Detailed", "Global"],
    },
    {
      title: "Internal Touchpoints",
      short: "Stationery",
      icon: <CreditCard className="h-8 w-8 text-cyan-400" />,
      description:
        "Placing your brand across business touchpoints (cards, letterheads) to ensure greater brand recall.",
      tags: ["Tangible", "Premium", "Professional"],
    },
  ]

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">
      {/* Decorative Gradients */}
      <div className="via-primary/20 absolute top-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">02 — Pure Identity</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              PORTRAYING THE <span className="text-primary italic">UNEXPECTED</span>
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-white/50 md:text-xl">
              Consistency builds recognition. We create comprehensive systems that ensure your brand is expressed
              perfectly across every touchpoint, portraying your intrinsic values with absolute clarity.
            </p>
          </motion.div>
        </div>

        {/* Identity Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group hover:border-primary/50 relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:bg-white/[0.05]"
            >
              {/* Background Glow */}
              <div className="bg-primary/5 group-hover:bg-primary/10 absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-3xl transition-colors" />

              <div className="group-hover:bg-primary/5 mb-8 w-fit rounded-2xl border border-white/5 bg-white/[0.05] p-3 transition-all duration-500 group-hover:scale-110">
                {asset.icon}
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-white/30 uppercase">{asset.short}</span>
                <h3 className="group-hover:text-primary text-2xl font-bold text-white transition-colors">
                  {asset.title}
                </h3>
                <p className="min-h-[80px] leading-relaxed text-white/50">{asset.description}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-8">
                {asset.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/[0.05] px-3 py-1 text-[10px] font-bold tracking-wider text-white/40 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
