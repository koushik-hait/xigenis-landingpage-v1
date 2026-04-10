"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Check, CircleCheck, Star, StarHalf } from "lucide-react"

import { LogoMarquee } from "./logo-marquee"

interface HeroSectionProps {
  cmsContent?: {
    headlineLine1: string;
    headlineLine2: string;
    headlineSize: string;
    headlineColor: string;
    subtitle: string;
    subtitleSize: string;
    subtitleColor: string;
    ctaText: string;
    ctaBgColor: string;
    ctaTextColor: string;
    ctaArrowBgColor: string;
    ratingConfig: string;
    trustedByText: string;
    backgroundImageUrl: string;
    avatars: string[];
    checkmarks: string[];
  };
}

export function HeroSection({ cmsContent }: HeroSectionProps) {
  // Use CMS data if passed, otherwise fall back to the original hardcoded state
  const content = (cmsContent as any) || {
    headlineLine1: "LEAD",
    headlineLine2: "DOMINANCE",
    headlineSize: "100",
    headlineColor: "#ffffff",
    subtitle: "Convert ready buyers into deals with a proven 90-day system.",
    subtitleSize: "12",
    subtitleColor: "#ffffff",
    ctaText: "Apply for Strategy Call",
    ctaBgColor: "#000000",
    ctaTextColor: "#ffffff",
    ctaArrowBgColor: "#F36B2B",
    ratingConfig: "RATED 4.5/5",
    trustedByText: "Trusted by 250+ B2B Organizations",
    backgroundImageUrl: "/assets/hero-bg.jpg",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    ],
    checkmarks: ["Instant Access", "Step-By-Step Plan", "Cancel Anytime"]
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${content.backgroundImageUrl}')` }}
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
              {content.avatars.map((src: string, i: number) => (
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
            <div className="flex flex-col gap-0.5" style={{ color: content.subtitleColor }}>
              <div className="flex items-center gap-4">
                <div className="flex text-[#FF9529]">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <StarHalf className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="text-[11px] font-medium tracking-wider opacity-70">{content.ratingConfig}</span>
              </div>
              <span className="mt-0.5 text-[10px] font-bold tracking-widest uppercase">
                {content.trustedByText}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              color: content.headlineColor,
              fontSize: `${content.headlineSize}px`,
              lineHeight: '1.05'
            }}
            className="mb-8 space-y-1 font-serif tracking-wide drop-shadow-lg max-sm:!text-[45px] max-md:!text-[72px]"
          >
            <span className="block">{content.headlineLine1}</span>
            <span className="block">{content.headlineLine2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              color: content.subtitleColor,
              fontSize: `${content.subtitleSize}px`
            }}
            className="mb-10 max-w-[440px] leading-loose font-bold tracking-[0.2em] uppercase"
          >
            {content.subtitle}
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
              className="group relative flex items-center gap-4 py-2 pr-2 pl-6 overflow-hidden transition-all duration-300 hover:rounded-full hover:border hover:border-white/5 before:absolute before:inset-0 before:-translate-x-full before:bg-black/20 before:transition-transform before:duration-300 before:ease-out hover:before:translate-x-0"
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

          {/* Checkmarks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {content.checkmarks.map((text: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full border border-white/20 bg-transparent text-white/60">
                  <CircleCheck className="h-3.5 w-3.5" strokeWidth={4} />
                </div>
                <span 
                  className="text-[10px] font-bold tracking-widest whitespace-nowrap uppercase sm:text-[11px]"
                  style={{ color: content.subtitleColor }}
                >
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
