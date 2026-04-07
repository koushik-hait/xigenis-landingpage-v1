"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function TopPerformerSection() {
  const cards = [1, 2, 3]

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
              // Small detail: The screenshot has rounded left edges but flat right?
              // Let's just do standard pill if un-clear, but screenshot shows it like a tag.
              style={{ borderRadius: '0.5rem 0.5rem 0.5rem 0.5rem' }}
            >
              AI ALGO-PLEX - VERIFIED RESULTS
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-5"
            >
              <span className="block">How we change their</span>
              <span className="block">business</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-sm leading-relaxed mb-8 max-w-[380px]"
            >
              Real success stories from agents who generated qualified buyer leads, increased site
              visits, and closed high-value property deals using our proven system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <button className="bg-black hover:bg-[#1a1a1a] transition-colors rounded-full px-6 py-3 text-xs font-bold text-white tracking-widest uppercase">
                See How It Works
              </button>
              <button className="bg-[#F36B2B] hover:bg-[#E05A1C] transition-colors rounded-full p-3 flex items-center justify-center text-white">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </button>
            </motion.div>
          </div>

          {/* Right Cards Track */}
          <div className="flex-1 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex min-w-max lg:min-w-0 lg:grid lg:grid-cols-4 gap-8 lg:gap-0 h-full">
              {cards.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex flex-col items-center flex-1 px-4 sm:px-6 w-[280px] lg:w-auto ${
                    index !== cards.length - 1 ? "lg:border-r lg:border-gray-100" : ""
                  }`}
                >
                  <div className="relative mb-5 flex flex-col items-center">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
                      alt="Amrita Verma"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200"
                    />
                    <div className="absolute -bottom-2.5 bg-black text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                      TOP CLOSER
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">Amrita Verma</h3>
                  <p className="text-[10px] text-gray-500 mb-6 font-medium">Agent | Mumbai</p>

                  <div className="flex flex-col items-center text-center gap-1.5 w-full">
                    <p className="text-[9.5px] sm:text-[10px] text-gray-600 leading-tight">
                      <span className="font-bold text-black">320+</span> qualified buyer leads in 60 days
                    </p>
                    <p className="text-[9.5px] sm:text-[10px] text-gray-600 leading-tight">
                      <span className="font-bold text-black">₹4.2 Cr</span> property deals closed
                    </p>
                    <p className="text-[9.5px] sm:text-[10px] text-gray-600 leading-tight">
                      <span className="font-bold text-black">210+</span> high-intent buyer inquiries generated
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* +12 More Success Stories Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 relative w-[280px] lg:w-auto lg:border-l lg:border-gray-100"
              >
                {/* Blurry background image representation */}
                <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop')] bg-cover bg-center opacity-10 blur-xl rounded-full" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-4xl sm:text-5xl font-medium text-black mb-2 relative">
                    <span className="absolute -left-6 top-1 text-2xl font-normal">+</span>
                    12
                  </div>
                  <div className="text-[11px] font-bold text-black mb-6 uppercase tracking-wider space-y-1 leading-tight">
                    <div className="opacity-80">More</div>
                    <div className="opacity-90">Success</div>
                    <div>Stories</div>
                  </div>
                  
                  <div className="text-[10px] font-bold text-[#F36B2B] leading-relaxed uppercase">
                    Agents • CPs<br/>
                    Builders • Brokers
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
