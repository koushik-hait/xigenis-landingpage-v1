"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Check, CircleCheck, Star, StarHalf } from "lucide-react"

import { LogoMarquee } from "./logo-marquee"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/hero-bg.jpg')",
          }}
        />
        {/* Warm dark overlays to match the aesthetic */}
        <div className="absolute inset-0 bg-[#352F28]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17110B]/90 via-[#17110B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-[#0A0705]/30 opacity-90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-40 sm:px-8 lg:px-12">
        <div className="mt-8 flex max-w-2xl flex-col items-start">
          {/* Trust Badge Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-10"
          >
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Avatar ${i}`}
                  className="relative h-10 w-10 rounded-full border-2 border-[#1A1A1A] object-cover"
                  style={{ zIndex: 4 - i }}
                />
              ))}
            </div>

            {/* Ratings Text */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-4">
                <div className="flex text-[#FF9529]">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <StarHalf className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-[11px] font-medium tracking-wider text-white/70">RATED 4.5/5</span>
              </div>
              <span className="mt-0.5 text-[10px] font-bold tracking-widest text-white/90 uppercase">
                Trusted by 250+ B2B Organizations
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 space-y-1 font-serif text-[45px] leading-[1.05] tracking-wide text-white/95 drop-shadow-lg sm:text-[72px] md:text-[84px] lg:text-[100px]"
          >
            <span className="block">LEAD</span>
            <span className="block">DOMINANCE</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 max-w-[440px] text-[11px] leading-loose font-bold tracking-[0.2em] text-white/90 uppercase sm:text-xs"
          >
            Convert ready buyers into deals with a proven 90-day system.
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
                        className="group relative flex items-center gap-4 py-2 pr-2 pl-6 overflow-hidden transition-all duration-300 hover:rounded-full hover:border hover:border-white/5 before:absolute before:inset-0 before:-translate-x-full before:bg-black before:transition-transform before:duration-300 before:ease-out hover:before:translate-x-0"
                      >
                        <span className="relative p-2 text-[11px] font-bold tracking-widest text-white uppercase rounded-full border border-transparent bg-black backdrop-blur-sm">
                          Apply for Strategy Call
                        </span>
                        <div className="relative rounded-full bg-[#F36B2B] p-2.5 text-white transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                          <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                        </div>
                      </button>
                    </motion.div>

          {/* Checkmarks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {["Instant Access", "Step-By-Step Plan", "Cancel Anytime"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/20 bg-transparent text-white/60">
                  <CircleCheck className="h-3.5 w-3.5" strokeWidth={4} />
                </div>
                <span className="text-[10px] font-bold tracking-widest whitespace-nowrap text-[#E0DEDC] uppercase sm:text-[11px]">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-1/4 bottom-20 z-20 flex flex-col items-center lg:right-[35%]"
      >
        <div className="mb-[-1px] h-32 w-px bg-gradient-to-b from-transparent to-white/40" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white/50 backdrop-blur-sm">
          <ArrowDown className="h-4 w-4" />
        </div>
      </motion.div>

      <LogoMarquee />
    </section>
  )
}
