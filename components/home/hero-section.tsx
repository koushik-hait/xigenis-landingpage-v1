"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Check, CircleCheck, Star, StarHalf } from "lucide-react"
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

interface HeroSectionProps {
  cmsContent?: {
    pillText?: string
    headlineLine1: string
    headlineLine2: string
    headlineSize: string
    headlineColor: string
    subtitle: string
    subtitleSize: string
    subtitleColor: string
    ctaText: string
    ctaLink: string
    ctaBgColor: string
    ctaTextColor: string
    ctaArrowBgColor: string
    ratingConfig: string
    trustedByText: string
    backgroundImageUrl: string
    avatars: string[]
    checkmarks: string[]
    marqueeLogos: { image: string; alt: string }[]
    marqueeSpeed: string
    videoUrl?: string
  }
}

export function HeroSection({ cmsContent }: HeroSectionProps) {
  // Default hardcoded state
  const defaultValues = {
    pillText: "AI LEAD GENERATION SYSTEM",
    headlineLine1: "LEAD",
    headlineLine2: "DOMINANCE",
    headlineSize: "100",
    headlineColor: "#ffffff",
    subtitle: "Convert ready buyers into deals with a proven 90-day system.",
    subtitleSize: "12",
    subtitleColor: "#ffffff",
    ctaText: "Apply for Strategy Call",
    ctaLink: "#",
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
    checkmarks: ["Instant Access", "Step-By-Step Plan", "Cancel Anytime"],
    marqueeSpeed: "40",
    marqueeLogos: [
      { image: "/assets/xigenis-logo.png", alt: "The Umansky Team" },
      { image: "/assets/xigenis-logo.png", alt: "EST" },
      { image: "/assets/xigenis-logo.png", alt: "FF" },
      { image: "/assets/xigenis-logo.png", alt: "Godrej" },
    ],
    videoUrl: "",
  }

  const formatTitleWithHashtags = (text: string) => {
    if (!text) return ""
    const words = text.split(" ")
    return words.map((word, i) => {
      if (word.startsWith("#")) {
        const cleanWord = word.substring(1)
        return (
          <span key={i} style={{ color: "rgb(230, 168, 21)" }}>
            {cleanWord}{" "}
          </span>
        )
      }
      return word + " "
    })
  }

  const content = { ...defaultValues, ...cmsContent }

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImageUrl}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Warm dark overlays to match the aesthetic */}
        <div className="absolute inset-0 bg-[#352F28]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17110B]/90 via-[#17110B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-[#0A0705]/30 opacity-90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-8xl px-6 pt-6 lg:pt-20 pb-16 sm:px-8 lg:px-12 lg:pb-20 flex flex-col items-center">
        <div className="mt-4 flex w-full flex-col items-center justify-center text-center mx-auto max-w-4xl">
          {/* Centered Pill Bar Badge */}
          {content.pillText && (
            <div
              className="mb-6 inline-block rounded-full bg-orange-700 border border-orange-700 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase mx-auto"
            >
              {content.pillText}
            </div>
          )}

          {/* Headline */}
          <h1
            style={{
              color: content.headlineColor,
              fontSize: `${content.headlineSize}px`,
              lineHeight: "1.05",
              fontWeight: "800",
            }}
            className="mb-4 space-y-1 font-serif font-extrabold tracking-wide drop-shadow-lg text-center mx-auto"
          >
            <span className="block">{formatTitleWithHashtags(content.headlineLine1)}</span>
            <span className="block">{formatTitleWithHashtags(content.headlineLine2)}</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: content.subtitleColor,
              fontSize: `${content.subtitleSize}px`,
              // lineHeight: "1.05",
            }}
            className="mb-6 max-w-4xl text-center mx-auto"
          >
            {content.subtitle}
          </p>

          {/* CTA & Trust Badge Row */}
          <div className="mb-6 mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 lg:gap-10">
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <ExploreButton href={content.ctaLink} className="mx-auto">
                <span className="relative z-10 text-[11px] font-bold tracking-widest uppercase">{content.ctaText}</span>
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
                {content.avatars.map((src: string, i: number) => (
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
                <span className="mt-0.5 text-[10px] font-bold tracking-widest uppercase">{content.trustedByText}</span>
              </div>
            </motion.div>
          </div>

          {/* Checkmarks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mx-auto"
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

        {/* VSL / Demo Video Box */}
        {content.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 mb-10 w-full max-w-lg px-4 sm:px-6 lg:px-8 mx-auto"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_0_40px_rgba(194,65,12,0.6)]">
              <video
                src={content.videoUrl}
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Down Arrow Indicator */}
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

      <LogoMarquee logos={content.marqueeLogos} speed={content.marqueeSpeed} />
    </section>
  )
}
