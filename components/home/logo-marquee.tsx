"use client"

import { motion } from "framer-motion"

export function LogoMarquee() {
  const logos = [
    { type: "umansky" },
    { type: "est" },
    { type: "ff" },
    { type: "godrej" },
  ]

  // We repeat the base logos 4 times to create a long continuous row that's guaranteed
  // to be wider than the viewport width, which is required for an infinite marquee.
  const singleBlock = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="absolute right-0 bottom-0 left-0 z-20 border-t border-white/5 bg-gradient-to-r from-black/80 via-[#1A1613]/80 to-black/80 py-5 backdrop-blur-md sm:py-6">
      <div className="mx-auto flex max-w-[1400px] shrink-0 items-center justify-between overflow-hidden px-6 text-white/80 opacity-60">
        <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-fit items-center flex-nowrap"
            // Move left by exactly 50% of its own width. 
            // Because our two blocks are completely identical, this creates a seamless loop.
            animate={{ x: "-50%" }}
            transition={{
              duration: 40, // Adjust this to speed up or slow down the marquee
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* We render 2 identical blocks side by side */}
            {[0, 1].map((blockIndex) => (
              <div key={blockIndex} className="flex shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
                {singleBlock.map((logo, index) => (
                  <div key={`${blockIndex}-${index}`} className="flex shrink-0 items-center">
                    {logo.type === "umansky" && (
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-xl">A</span>
                        <span className="flex flex-col font-serif text-sm tracking-widest uppercase">
                          <span className="text-[8px] tracking-[0.3em]">The</span>
                          <span className="text-[11px]">Umansky</span>
                          <span className="text-[9px]">Team</span>
                        </span>
                      </div>
                    )}
                    {logo.type === "est" && (
                      <span className="shrink-0 font-serif text-3xl font-bold tracking-widest">EST</span>
                    )}
                    {logo.type === "ff" && (
                      <span className="shrink-0 font-serif text-3xl font-bold italic">FF</span>
                    )}
                    {logo.type === "godrej" && (
                      <span className="shrink-0 font-serif text-2xl text-[#C0AAA0] italic">Godrej</span>
                    )}
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
