"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface PerformerMetric {
  label: string
  value: string
}

interface Performer {
  name: string
  role: string
  image: string
  badge: string
  metrics: PerformerMetric[]
}

interface TopPerformerSectionProps {
  cmsContent?: {
    tag: string
    headingLine1: string
    headingLine2: string
    headingSize: string
    headingColor: string
    description: string
    descriptionSize: string
    descriptionColor: string
    ctaText: string
    ctaBgColor: string
    ctaTextColor: string
    ctaArrowBgColor: string
    performers: Performer[]
    footerCard: {
      number: string
      labels: string[]
      subLabels: string
    }
  }
}

export function TopPerformerSection({ cmsContent }: TopPerformerSectionProps) {
  const content = (cmsContent as any) || {
    tag: "AI ALGO-PLEX - VERIFIED RESULTS",
    headingLine1: "How we change their",
    headingLine2: "business",
    headingSize: "48",
    headingColor: "#000000",
    description:
      "Real success stories from agents who generated qualified buyer leads, increased site visits, and closed high-value property deals using our proven system.",
    descriptionSize: "14",
    descriptionColor: "#6B7280",
    ctaText: "Apply for Strategy Call",
    ctaBgColor: "#000000",
    ctaTextColor: "#ffffff",
    ctaArrowBgColor: "#F36B2B",
    performers: [
      {
        name: "Amrita Verma",
        role: "Agent | Mumbai",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        badge: "TOP CLOSER",
        metrics: [
          { label: "qualified buyer leads in 60 days", value: "320+" },
          { label: "property deals closed", value: "₹4.2 Cr" },
          { label: "high-intent buyer inquiries generated", value: "210+" },
        ],
      },
      {
        name: "Amrita Verma",
        role: "Agent | Mumbai",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        badge: "TOP CLOSER",
        metrics: [
          { label: "qualified buyer leads in 60 days", value: "320+" },
          { label: "property deals closed", value: "₹4.2 Cr" },
          { label: "high-intent buyer inquiries generated", value: "210+" },
        ],
      },
      {
        name: "Amrita Verma",
        role: "Agent | Mumbai",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        badge: "TOP CLOSER",
        metrics: [
          { label: "qualified buyer leads in 60 days", value: "320+" },
          { label: "property deals closed", value: "₹4.2 Cr" },
          { label: "high-intent buyer inquiries generated", value: "210+" },
        ],
      },
    ],
    footerCard: {
      number: "12",
      labels: ["More", "Success", "Stories"],
      subLabels: "Agents • CPs Builders • Brokers",
    },
  }

  return (
    <section className="border-t border-gray-100 bg-white py-10 sm:py-10 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          {/* Left Content */}
          <div className="flex flex-1 flex-col items-start justify-center pr-4 lg:max-w-[400px] xl:max-w-[480px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center justify-center rounded-l-md rounded-r-none bg-[#DCDCDC] px-3 py-1 text-[8px] font-bold tracking-widest text-black/70 uppercase"
              style={{ borderRadius: "0.5rem" }}
            >
              {content.tag}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                color: content.headingColor,
                fontSize: `${content.headingSize}px`,
                lineHeight: "1.2",
              }}
              className="mb-5 font-medium tracking-tight max-sm:text-3xl"
            >
              <span className="block">{content.headingLine1}</span>
              <span className="block">{content.headingLine2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                color: content.descriptionColor,
                fontSize: `${content.descriptionSize || 10}px`,
              }}
              className="mb-8 max-w-[380px] leading-relaxed"
            >
              {content.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <button
                onClick={() => {
                  console.log("Apply for Strategy Call")
                }}
                className="group relative inline-flex items-center gap-6 overflow-hidden rounded-full py-2.5 pr-2.5 pl-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95"
                style={{
                  backgroundColor: content.ctaBgColor,
                  color: content.ctaTextColor,
                }}
              >
                <span className="relative z-10 text-[11px] font-bold tracking-widest uppercase italic">
                  {content.ctaText}
                </span>
                <div
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-45"
                  style={{
                    backgroundColor: content.ctaArrowBgColor,
                    color: content.ctaTextColor,
                  }}
                >
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </motion.div>
          </div>

          {/* Right Cards Track */}
          <div className="no-scrollbar -mx-6 flex-1 overflow-x-auto px-6 pb-4 lg:mx-0 lg:px-0">
            <div className="flex h-full min-w-max gap-8 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-0">
              {content.performers.map((p: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex w-[280px] flex-1 flex-col items-center px-4 sm:px-6 lg:w-auto ${
                    index !== content.performers.length - 1 ? "lg:border-r lg:border-gray-100" : ""
                  }`}
                >
                  <div className="relative mb-5 flex flex-col items-center">
                    <img
                      src={
                        p.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
                      }
                      alt={p.name}
                      className="h-16 w-16 rounded-full border border-gray-200 object-cover sm:h-20 sm:w-20"
                    />
                    <div className="absolute -bottom-2.5 rounded-full bg-black px-3 py-1 text-[9px] font-bold tracking-widest whitespace-nowrap text-white uppercase">
                      {p.badge}
                    </div>
                  </div>

                  <h3 className="mb-0.5 text-sm font-bold text-gray-900">{p.name}</h3>
                  <p className="mb-6 text-[10px] font-medium text-gray-500">{p.role}</p>

                  <div className="flex w-full flex-col items-center gap-1.5 text-center">
                    {p.metrics.map((m: any, mIdx: number) => (
                      <p key={mIdx} className="text-[9.5px] leading-tight text-gray-600 sm:text-[10px]">
                        <span className="font-bold text-black">{m.value}</span> {m.label}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* + More Success Stories Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="relative flex w-[280px] flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:w-auto lg:border-l lg:border-gray-100"
              >
                <div className="absolute inset-0 top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop')] bg-cover bg-center opacity-10 blur-xl" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-2 text-4xl font-medium text-black sm:text-5xl">
                    <span className="absolute top-1 -left-6 text-2xl font-normal">+</span>
                    {content.footerCard.number}
                  </div>
                  <div className="mb-6 space-y-1 text-[11px] leading-tight font-bold tracking-wider text-black uppercase">
                    {content.footerCard.labels.map((l: string, i: number) => (
                      <div key={i} className={i === 0 ? "opacity-80" : i === 1 ? "opacity-90" : ""}>
                        {l}
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] leading-relaxed font-bold text-[#F36B2B] uppercase">
                    {/* {content.footerCard.subLabels.split('Builders').join('<br/>Builders')} */}
                    {/* Note: In a real app we might just use \n and preserve whitespace, but keeping it simple for now */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.footerCard.subLabels.replace("Builders", "<br/>Builders"),
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
