"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
            >
              About Us
            </motion.span>

            <h2 className="font-heading mb-6 text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              About Company
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              At Xigenis, we help real estate professionals build a predictable pipeline of qualified
              property buyers. Our system combines AI-driven lead generation, targeted campaigns, and
              smart follow-up automation to attract serious buyers and close more deals consistently.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group flex w-fit cursor-pointer items-center gap-2 font-semibold text-emerald-600"
            >
              <span className="border-b-2 border-emerald-200 pb-1 transition-colors group-hover:border-emerald-600">
                Learn More About Us
              </span>
              <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
                alt="Real Estate Professional"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
            >
              <div className="mb-1 text-3xl font-bold text-emerald-600">15+</div>
              <div className="text-sm font-medium text-gray-500">Cities Covered Across India</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
