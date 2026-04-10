"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface PerformerMetric {
  label: string;
  value: string;
}

interface Performer {
  name: string;
  role: string;
  image: string;
  badge: string;
  metrics: PerformerMetric[];
}

interface TopPerformerSectionProps {
  cmsContent?: {
    tag: string;
    headingLine1: string;
    headingLine2: string;
    headingSize: string;
    headingColor: string;
    description: string;
    descriptionSize: string;
    descriptionColor: string;
    ctaText: string;
    ctaBgColor: string;
    ctaTextColor: string;
    ctaArrowBgColor: string;
    performers: Performer[];
    footerCard: {
      number: string;
      labels: string[];
      subLabels: string;
    };
  };
}

export function TopPerformerSection({ cmsContent }: TopPerformerSectionProps) {
  const content = (cmsContent as any) || {
    tag: "AI ALGO-PLEX - VERIFIED RESULTS",
    headingLine1: "How we change their",
    headingLine2: "business",
    headingSize: "48",
    headingColor: "#000000",
    description: "Real success stories from agents who generated qualified buyer leads, increased site visits, and closed high-value property deals using our proven system.",
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
          { label: "high-intent buyer inquiries generated", value: "210+" }
        ]
      },
      {
        name: "Amrita Verma",
        role: "Agent | Mumbai",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        badge: "TOP CLOSER",
        metrics: [
          { label: "qualified buyer leads in 60 days", value: "320+" },
          { label: "property deals closed", value: "₹4.2 Cr" },
          { label: "high-intent buyer inquiries generated", value: "210+" }
        ]
      },
      {
        name: "Amrita Verma",
        role: "Agent | Mumbai",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        badge: "TOP CLOSER",
        metrics: [
          { label: "qualified buyer leads in 60 days", value: "320+" },
          { label: "property deals closed", value: "₹4.2 Cr" },
          { label: "high-intent buyer inquiries generated", value: "210+" }
        ]
      }
    ],
    footerCard: {
      number: "12",
      labels: ["More", "Success", "Stories"],
      subLabels: "Agents • CPs Builders • Brokers"
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex-1 lg:max-w-[400px] xl:max-w-[480px] flex flex-col items-start justify-center pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-r-none rounded-l-md px-3 py-1 mb-6 bg-[#DCDCDC] text-[10px] font-bold tracking-widest text-black/70 uppercase"
              style={{ borderRadius: '0.5rem' }}
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
                lineHeight: '1.2'
              }}
              className="font-medium tracking-tight mb-5 max-sm:text-3xl"
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
                fontSize: `${content.descriptionSize}px`
              }}
              className="leading-relaxed mb-8 max-w-[380px]"
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
                onClick={() => {console.log('Apply for Strategy Call')}}
                className="group relative flex items-center gap-4 py-2 pr-2 pl-6 overflow-hidden transition-all duration-300 hover:rounded-full hover:border hover:border-white/5 before:absolute before:inset-0 before:-translate-x-full before:bg-black/10 before:transition-transform before:duration-300 before:ease-out hover:before:translate-x-0"
              >
                <span 
                  className="relative p-2 text-[11px] font-bold tracking-widest uppercase rounded-full border border-transparent backdrop-blur-sm"
                  style={{ 
                    backgroundColor: content.ctaBgColor,
                    color: content.ctaTextColor 
                  }}
                >
                  {content.ctaText}
                </span>
                <div 
                  className="relative rounded-full p-2.5 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110"
                  style={{ 
                    backgroundColor: content.ctaArrowBgColor,
                    color: content.ctaTextColor 
                  }}
                >
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Cards Track */}
          <div className="flex-1 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex min-w-max lg:min-w-0 lg:grid lg:grid-cols-4 gap-8 lg:gap-0 h-full">
              {content.performers.map((p: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex flex-col items-center flex-1 px-4 sm:px-6 w-[280px] lg:w-auto ${
                    index !== content.performers.length - 1 ? "lg:border-r lg:border-gray-100" : ""
                  }`}
                >
                  <div className="relative mb-5 flex flex-col items-center">
                    <img
                      src={p.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"}
                      alt={p.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200"
                    />
                    <div className="absolute -bottom-2.5 bg-black text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                      {p.badge}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">{p.name}</h3>
                  <p className="text-[10px] text-gray-500 mb-6 font-medium">{p.role}</p>

                  <div className="flex flex-col items-center text-center gap-1.5 w-full">
                    {p.metrics.map((m: any, mIdx: number) => (
                      <p key={mIdx} className="text-[9.5px] sm:text-[10px] text-gray-600 leading-tight">
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
                className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 relative w-[280px] lg:w-auto lg:border-l lg:border-gray-100"
              >
                <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop')] bg-cover bg-center opacity-10 blur-xl rounded-full" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-4xl sm:text-5xl font-medium text-black mb-2 relative">
                    <span className="absolute -left-6 top-1 text-2xl font-normal">+</span>
                    {content.footerCard.number}
                  </div>
                  <div className="text-[11px] font-bold text-black mb-6 uppercase tracking-wider space-y-1 leading-tight">
                    {content.footerCard.labels.map((l: string, i: number) => (
                      <div key={i} className={i === 0 ? "opacity-80" : i === 1 ? "opacity-90" : ""}>{l}</div>
                    ))}
                  </div>
                  
                  <div className="text-[10px] font-bold text-[#F36B2B] leading-relaxed uppercase">
                    {content.footerCard.subLabels.split('Builders').join('<br/>Builders')}
                    {/* Note: In a real app we might just use \n and preserve whitespace, but keeping it simple for now */}
                    <div dangerouslySetInnerHTML={{ __html: content.footerCard.subLabels.replace('Builders', '<br/>Builders') }} />
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
