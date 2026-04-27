"use client"

import { useEffect, useState, useCallback } from "react"

const DURATION = 5 * 60 // 5 minutes in seconds

export function StickyCountdownBar() {
  const [remaining, setRemaining] = useState(DURATION)
  const [slotsCount, setSlotsCount] = useState(3)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Read from sessionStorage so the countdown persists on refresh
    const stored = sessionStorage.getItem("cdStart")
    if (stored) {
      const elapsed = Math.floor((Date.now() - parseInt(stored)) / 1000)
      setRemaining(DURATION - (elapsed % DURATION))
    } else {
      sessionStorage.setItem("cdStart", Date.now().toString())
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          sessionStorage.setItem("cdStart", Date.now().toString())
          setSlotsCount(Math.random() > 0.5 ? 2 : 3)
          return DURATION
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [mounted])

  const pad = useCallback((n: number) => String(n).padStart(2, "0"), [])

  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  const scrollToCTA = () => {
    const el = document.getElementById("contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="sticky-countdown-bar" role="banner" aria-label="Limited time offer">
      {/* Ambient glow */}
      <div className="scb-glow" aria-hidden="true" />

      {/* Live Indicator */}
      <div className="scb-live">
        <span className="scb-pulse" aria-hidden="true" />
        <span>Live</span>
      </div>

      {/* Slots Message */}
      <div className="scb-slots">
        Only <strong>{slotsCount}</strong> strategy call slots remaining this week
      </div>

      {/* Countdown */}
      <div className="scb-countdown" aria-label={`Offer resets in ${pad(hours)} hours ${pad(minutes)} minutes ${pad(seconds)} seconds`}>
        <span className="scb-countdown-label">Offer resets in</span>
        <span className="scb-digit" key={`h-${hours}`}>{pad(hours)}</span>
        <span className="scb-sep">:</span>
        <span className="scb-digit" key={`m-${minutes}`}>{pad(minutes)}</span>
        <span className="scb-sep">:</span>
        <span className="scb-digit" key={`s-${seconds}`}>{pad(seconds)}</span>
      </div>

      {/* CTA Button */}
      <button className="scb-cta" onClick={scrollToCTA}>
        Claim My Slot
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 6h8M6 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
