"use client"

import { motion, Variants } from "framer-motion"
import { useEffect, useRef, useState, useMemo } from "react"

interface WaveDividerProps {
  flip?: boolean
}

// Generate random particles within the wave shape
function generateParticles(count: number) {
  const particles = []
  for (let i = 0; i < count; i++) {
    // Random x position across the width
    const x = Math.random() * 1200

    // Calculate y range based on wave curve at this x position
    // Wave formula approximation: y = 50 + 30 * sin(x * 0.005)
    const waveY = 50 + 30 * Math.sin(x * 0.005 + Math.random() * 2)
    const y = waveY + Math.random() * (120 - waveY) // Between wave curve and bottom

    particles.push({
      id: i,
      cx: x,
      cy: y,
      r: 1 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.5,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })
  }
  return particles
}

export function WaveDivider({ flip = false }: WaveDividerProps) {
  const [isInView, setIsInView] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dividerRef = useRef<HTMLDivElement>(null)

  // Generate particles once on client side
  const particles = useMemo(() => {
    if (!mounted) return []
    return generateParticles(80)
  }, [mounted])

  useEffect(() => {
    setMounted(true)
    const currentElement = dividerRef.current
    if (!currentElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(currentElement)

    return () => {
      observer.unobserve(currentElement)
    }
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  }

  return (
    <div ref={dividerRef} className={`w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-16 w-full sm:h-20 md:h-24"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Define clip path for wave shape */}
        <defs>
          <clipPath id={`waveClip-${flip ? "flip" : "normal"}`}>
            <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,120 L0,120 Z" />
          </clipPath>
        </defs>

        {/* Background fill for wave - subtle gradient */}
        <path d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,120 L0,120 Z" className="fill-primary/5" />

        {/* Gas particles clipped to wave shape */}
        <g clipPath={`url(#waveClip-${flip ? "flip" : "normal"})`}>
          {mounted &&
            particles.map((particle) => (
              <motion.circle
                key={particle.id}
                cx={particle.cx}
                cy={particle.cy}
                r={particle.r}
                className="fill-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: [0, particle.opacity, particle.opacity, 0],
                        scale: [0, 1, 1, 0],
                        cx: [particle.cx, particle.cx + (particle.id % 20) - 10], // Avoid random here
                        cy: [particle.cy, particle.cy - 20], // Still looks okay without random here
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Additional floating particles for more density */}
          {mounted &&
            particles.slice(0, 40).map((particle, i) => (
              <motion.circle
                key={`extra-${particle.id}`}
                cx={particle.cx + 100}
                cy={particle.cy + 10}
                r={particle.r * 0.7}
                className="fill-primary"
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: [0, particle.opacity * 0.6, 0],
                        cy: [particle.cy + 10, particle.cy - 15],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: particle.duration * 1.2,
                  delay: particle.delay + 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
        </g>
      </motion.svg>
    </div>
  )
}
