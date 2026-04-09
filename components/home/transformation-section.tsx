"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function TransformationSection() {
  return (
    <section className="relative w-full py-10 lg:py-32 overflow-hidden bg-sky-100">
      {/* Background Image - Sky with clouds */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 z-0" 
        style={{ backgroundImage: "url('/assets/transformation-bg.jpg')" }} 
      />
      
      {/* Soft gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/90 via-sky-50/70 to-white/60 z-0" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-20">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center rounded-full bg-[#F36B2B] px-4 py-1.5 mb-8">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">
                Sound Familiar?
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-10">
              AI Lead System Results<br />
              <span className="block mt-2">The 90-Day Transformation</span>
            </h2>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-white px-6 py-3.5 shadow-md hover:bg-gray-50 transition-colors">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-900">
                  Start My 90 Days
                </span>
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F36B2B] text-white shadow-md hover:bg-[#E05A1C] transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-20 lg:w-[440px] shrink-0"
          >
            <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-gray-800 space-y-4">
              <span className="block">
                This is the after state — what your pipeline, calendar, and revenue look like after 90 days working with our system.
              </span>
              <span className="block mt-4">
                No random referrals. No cold calling. Just a predictable system that brings serious buyers.
              </span>
            </p>
          </motion.div>

        </div>

        {/* CARDS TRACK */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-24 w-full"
        >
          {/* We break out of the container padding on the right for elegant scroll on mobile/desktop */}
          <div className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 snap-x">
            
            {/* CARD 1: Timeline Tracker */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 w-[300px] sm:w-[380px] shrink-0 shadow-xl relative snap-start">
              {/* Dotted line */}
              <div className="absolute left-[3.25rem] sm:left-[3.75rem] top-16 bottom-16 w-px border-l-[3px] border-dotted border-gray-300" />
              
              <div className="flex flex-col space-y-10 relative z-10">
                {/* Step 1 */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F36B2B] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md ring-4 ring-white">1</div>
                  <div className="pt-0.5">
                    <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">Day 1-7</div>
                    <p className="text-sm sm:text-[15px] font-medium text-gray-900 leading-snug pr-4">System setup & target audience research</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F36B2B] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md ring-4 ring-white">2</div>
                  <div className="pt-0.5">
                    <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">Day 8-14</div>
                    <p className="text-sm sm:text-[15px] font-medium text-gray-900 leading-snug pr-4">First qualified buyer appointments booked</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F36B2B] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md ring-4 ring-white">3</div>
                  <div className="pt-0.5">
                    <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">Day 30-60</div>
                    <p className="text-sm sm:text-[15px] font-medium text-gray-900 leading-snug pr-4">Lead pipeline fills and site visits increase</p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F36B2B] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md ring-4 ring-white">4</div>
                  <div className="pt-0.5">
                    <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">Day 90</div>
                    <p className="text-sm sm:text-[15px] font-medium text-gray-900 leading-snug pr-4">3-5 property deals closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Testimonial - Ananya */}
            <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-8 sm:p-10 w-[320px] sm:w-[480px] shrink-0 shadow-xl flex flex-col justify-between snap-start border border-white/50">
              <div className="flex items-center gap-4 mb-6">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Ananya Singh" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Ananya Singh</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-0.5 font-medium">Independent Agent — Delhi</p>
                  <p className="text-[13px] sm:text-sm font-bold text-gray-900">₹1.5 Cr Closed</p>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] leading-relaxed text-gray-600 mb-8 font-medium">
                Struggled for months with generic leads. Within 60 days of implementing the system, she had a completely transformed pipeline with high-intent buyers, resulting in 3 major closures.
              </p>

              <div>
                <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 shadow-md">
                  REVENUE DASHBOARD
                </div>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="border border-gray-200 bg-gray-50 rounded-full px-3 py-1 text-[9px] font-bold text-gray-600 uppercase w-max tracking-wide">32 buyer appointments</div>
                    <div className="border border-gray-200 bg-gray-50 rounded-full px-3 py-1 text-[9px] font-bold text-gray-600 uppercase w-max tracking-wide">3 luxury deals closed</div>
                    <div className="border border-gray-200 bg-gray-50 rounded-full px-3 py-1 text-[9px] font-bold text-gray-600 uppercase w-max tracking-wide">3 months timeline</div>
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-gray-100 flex items-center justify-center bg-white shadow-inner">
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                          <path className="text-[#F36B2B]" strokeWidth="3" fill="none" stroke="currentColor" strokeDasharray="15, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="text-center mt-0.5">
                          <div className="text-[7px] sm:text-[8px] text-gray-400 font-medium tracking-wide">Before</div>
                          <div className="text-[8px] sm:text-[9px] font-bold leading-tight">₹8L<br/><span className="text-[7px] sm:text-[8px] font-normal text-gray-500">/ month</span></div>
                        </div>
                    </div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-gray-100 flex items-center justify-center bg-white shadow-inner">
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                          <path className="text-[#F36B2B]" strokeWidth="3" fill="none" stroke="currentColor" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="text-center mt-0.5">
                          <div className="text-[7px] sm:text-[8px] text-[#F36B2B] font-bold tracking-wide">After</div>
                          <div className="text-[8px] sm:text-[9px] font-bold leading-tight">₹32L<br/><span className="text-[7px] sm:text-[8px] font-normal text-gray-500">/ month</span></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Testimonial - Rahul (From Screenshot) */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 w-[320px] sm:w-[480px] shrink-0 shadow-xl flex flex-col justify-between snap-start">
              <div className="flex items-center gap-4 mb-6">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="Rahul Sharma" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Rahul Sharma</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-0.5 font-medium">Luxury Broker — Mumbai</p>
                  <p className="text-[13px] sm:text-sm font-bold text-gray-900">₹2.1 Cr Closed</p>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] leading-relaxed text-gray-600 mb-8 font-medium">
                From chasing portal leads to closing ₹2.1 Cr worth of luxury properties in just four months. The system generated qualified high-net-worth buyers, booked directly into his calendar.
              </p>

              <div>
                <div className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 shadow-md">
                  REVENUE DASHBOARD
                </div>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="border border-gray-200 bg-gray-50 rounded-full px-3 py-1 text-[9px] font-bold text-gray-600 uppercase w-max tracking-wide">44 buyer appointments</div>
                    <div className="border border-gray-200 bg-gray-50 rounded-full px-3 py-1 text-[9px] font-bold text-gray-600 uppercase w-max tracking-wide">5 luxury deals closed</div>
                    <div className="border border-gray-200 bg-gray-50 rounded-full px-3 py-1 text-[9px] font-bold text-gray-600 uppercase w-max tracking-wide">4 months timeline</div>
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    {/* Before Circle */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-gray-100 flex items-center justify-center bg-white shadow-inner">
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                          <path className="text-[#F36B2B]" strokeWidth="3" fill="none" stroke="currentColor" strokeDasharray="25, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="text-center mt-0.5">
                          <div className="text-[7px] sm:text-[8px] text-gray-400 font-medium tracking-wide">Before</div>
                          <div className="text-[8px] sm:text-[9px] font-bold leading-tight">₹15L<br/><span className="text-[7px] sm:text-[8px] font-normal text-gray-500">/ month</span></div>
                        </div>
                    </div>
                    {/* After Circle */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-gray-100 flex items-center justify-center bg-white shadow-inner">
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                          <path className="text-[#F36B2B]" strokeWidth="4" fill="none" stroke="currentColor" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="text-center mt-0.5">
                          <div className="text-[7px] sm:text-[8px] text-[#F36B2B] font-bold tracking-wide">After</div>
                          <div className="text-[8px] sm:text-[9px] font-bold leading-tight">₹48L<br/><span className="text-[7px] sm:text-[8px] font-normal text-gray-500">/ month</span></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty space placeholder for smooth scrolling to edge */}
            <div className="w-[1px] shrink-0" />

          </div>
        </motion.div>

      </div>
    </section>
  )
}
