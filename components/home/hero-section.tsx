import Image from "next/image"
import {
  HeroAnimatedCTA,
  HeroAnimatedCheckmarks,
  HeroAnimatedVideo,
  HeroAnimatedArrow,
  HeroMarquee,
} from "./hero-animations"

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
    ctaLink: "https://link.yourmarketingai.com/widget/bookings/real-estate-growth-strategy-r-zfipu1-jvoty913",
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
    videoUrl: "https://pub-18a3a4375c514c64bedfd4c414fbfa08.r2.dev/cms/xigenis-optout-video.mp4",
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
    <section id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden">
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
      <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-1 flex-col items-center justify-center px-6 pt-6 pb-4 sm:px-8 lg:px-12 lg:pt-16">
        <div className="mt-4 mb-1 flex w-full flex-col items-center justify-center text-center mx-auto max-w-4xl">
          {/* Centered Pill Bar Badge */}
          {content.pillText && (
            <div
              className="mb-6 inline-block rounded-full bg-orange-700 border border-orange-700 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase mx-auto"
            >
              {content.pillText}
            </div>
          )}

          {/* Headline — SSR rendered for instant LCP */}
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

          {/* Subtitle — SSR rendered for instant LCP */}
          <p
            style={{
              color: content.subtitleColor,
              fontSize: `${content.subtitleSize}px`,
            }}
            className="mb-6 max-w-4xl text-center mx-auto"
          >
            {content.subtitle}
          </p>

          {/* VSL / Demo Video Box — Client Component for animations */}
          <HeroAnimatedVideo videoUrl={content.videoUrl} />

          {/* CTA & Trust Badge Row — Client Component for animations */}
          <HeroAnimatedCTA
            ctaText={content.ctaText}
            ctaLink={content.ctaLink}
            avatars={content.avatars}
            ratingConfig={content.ratingConfig}
            trustedByText={content.trustedByText}
            subtitleColor={content.subtitleColor}
          />

          {/* Checkmarks — Client Component for animations */}
          <HeroAnimatedCheckmarks
            checkmarks={content.checkmarks}
            subtitleColor={content.subtitleColor}
          />
        </div>
      </div>

      {/* Down Arrow Indicator — Client Component for animations */}
      <HeroAnimatedArrow />

      <HeroMarquee logos={content.marqueeLogos} speed={content.marqueeSpeed} />
    </section>
  )
}
