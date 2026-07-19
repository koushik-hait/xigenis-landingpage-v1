"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown, CircleCheck, Star, StarHalf } from "lucide-react"
import { ExploreButton } from "@/components/ui/explore-button"

// Dynamically import LogoMarquee to reduce initial bundle size
const LogoMarquee = dynamic(() => import("./logo-marquee").then((mod) => ({ default: mod.LogoMarquee })), {
  loading: () => (
    <div className="absolute right-0 bottom-0 left-0 z-20 border-t border-white/5 bg-gradient-to-r from-black/80 via-[#1A1613]/80 to-black/80 py-5 opacity-80 backdrop-blur-md sm:py-6">
      <div className="mx-auto flex max-w-[1400px] shrink-0 items-center justify-between overflow-hidden px-6 text-white/80 opacity-80">
        <div className="h-8 w-full animate-pulse bg-white/10 sm:h-10" />
      </div>
    </div>
  ),
  ssr: false,
})

interface HeroAnimationsProps {
  ctaText: string
  ctaLink: string
  avatars: string[]
  ratingConfig: string
  trustedByText: string
  subtitleColor: string
  checkmarks: string[]
  videoUrl?: string
  marqueeLogos: { image: string; alt: string }[]
  marqueeSpeed: string
}

export function HeroAnimatedCTA({ ctaText, ctaLink, avatars, ratingConfig, trustedByText, subtitleColor }: Pick<HeroAnimationsProps, 'ctaText' | 'ctaLink' | 'avatars' | 'ratingConfig' | 'trustedByText' | 'subtitleColor'>) {
  return (
    <div className="mb-6 mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 lg:gap-10">
      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex justify-center"
      >
        <ExploreButton href={ctaLink} className="mx-auto">
          <span className="relative z-10 text-[11px] font-bold tracking-widest uppercase">{ctaText}</span>
        </ExploreButton>
      </motion.div>

      {/* Trust Badge Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 text-left justify-start"
      >
        {/* Avatars */}
        <div className="flex -space-x-3">
          {avatars.map((src: string, i: number) => (
            <Image
              key={i}
              src={src}
              alt={`Avatar ${i}`}
              width={40}
              height={40}
              className="relative h-10 w-10 rounded-full border-2 border-[#1A1A1A] object-cover"
              style={{ zIndex: 4 - i }}
            />
          ))}
        </div>

        {/* Ratings Text */}
        <div className="flex flex-col gap-0.5" style={{ color: subtitleColor }}>
          <div className="flex items-center gap-4">
            <div className="flex text-[#FF9529]">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-3.5 w-3.5 fill-current" />
              ))}
              <StarHalf className="h-3.5 w-3.5 fill-current" />
            </div>
            <span className="text-[11px] font-medium tracking-wider opacity-70">{ratingConfig}</span>
          </div>
          <span className="mt-0.5 text-[10px] font-bold tracking-widest uppercase">{trustedByText}</span>
        </div>
      </motion.div>
    </div>
  )
}

export function HeroAnimatedCheckmarks({ checkmarks, subtitleColor }: Pick<HeroAnimationsProps, 'checkmarks' | 'subtitleColor'>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mx-auto"
    >
      {checkmarks.map((text: string, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full border border-white/20 bg-transparent text-white/60">
            <CircleCheck className="h-3.5 w-3.5" strokeWidth={4} />
          </div>
          <span
            className="text-[10px] font-bold tracking-widest whitespace-nowrap uppercase sm:text-[11px]"
            style={{ color: subtitleColor }}
          >
            {text}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

export function HeroAnimatedVideo({ videoUrl }: Pick<HeroAnimationsProps, 'videoUrl'>) {
  if (!videoUrl) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-12 mb-10 w-full max-w-lg px-4 sm:px-6 lg:px-8 mx-auto"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_0_40px_rgba(194,65,12,0.6)]">
        <video
          src={videoUrl}
          controls
          playsInline
          className="h-full w-full object-contain"
        />
      </div>
    </motion.div>
  )
}

export function HeroAnimatedArrow() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 1, delay: 1 }}
      className="absolute left-1/2 bottom-10 z-0 flex -translate-x-1/2 flex-col items-center pointer-events-none"
    >
      <div className="mb-[-1px] h-32 w-px bg-gradient-to-b from-transparent to-white/40" />
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white/50 backdrop-blur-sm">
        <ArrowDown className="h-4 w-4" />
      </div>
    </motion.div>
  )
}

export function HeroMarquee({ logos, speed }: { logos: { image: string; alt: string }[]; speed: string }) {
  return <LogoMarquee logos={logos} speed={speed} />
}
