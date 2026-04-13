"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LogoData {
  image: string
  alt: string
}

interface LogoMarqueeProps {
  logos?: LogoData[]
  speed?: string
}

export function LogoMarquee({ logos: cmsLogos, speed = "40" }: LogoMarqueeProps) {
  const defaultLogos = [
    { image: "/assets/xigenis-logo.png", alt: "The Umansky Team" },
    { image: "/assets/xigenis-logo.png", alt: "EST" },
    { image: "/assets/xigenis-logo.png", alt: "FF" },
    { image: "/assets/xigenis-logo.png", alt: "Godrej" },
  ]

  const logos = cmsLogos?.length ? cmsLogos : defaultLogos

  // We repeat the base logos 4 times to create a long continuous row that's guaranteed
  // to be wider than the viewport width, which is required for an infinite marquee.
  const singleBlock = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="absolute right-0 bottom-0 left-0 z-20 border-t border-white/5 bg-gradient-to-r from-black/80 via-[#1A1613]/80 to-black/80 py-5 opacity-50 backdrop-blur-md sm:py-6">
      <div className="mx-auto flex max-w-[1400px] shrink-0 items-center justify-between overflow-hidden px-6 text-white/80 opacity-60">
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-fit items-center flex-nowrap"
            // Move left by exactly 50% of its own width. 
            // Because our two blocks are completely identical, this creates a seamless loop.
            animate={{ x: "-50%" }}
            transition={{
              duration: parseInt(speed) || 40, // Adjust this to speed up or slow down the marquee
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* We render 2 identical blocks side by side */}
            {[0, 1].map((blockIndex) => (
              <div key={blockIndex} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20">
                {singleBlock.map((logo, index) => (
                  <div key={`${blockIndex}-${index}`} className="flex shrink-0 items-center">
                    <div className="relative h-8 w-24 sm:h-10 sm:w-32">
                      <Image
                        src={logo.image || "/assets/xigenis-logo.png"}
                        alt={logo.alt}
                        fill
                        className="object-contain opacity-80"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden">
                        <span className="shrink-0 font-serif text-xl font-bold tracking-widest uppercase sm:text-2xl">
                          {logo.alt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
