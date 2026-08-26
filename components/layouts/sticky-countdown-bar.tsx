"use client"

import { useEffect, useState, useCallback } from "react"
import { getCmsContent } from "@/app/actions/cms"

export function StickyCountdownBar() {
  const [content, setContent] = useState({
    enabled: true,
    slotsCount: 3,
    countdownDuration: 300,
    btnText: "Claim My Slot",
    btnLink: "#contact",
    text: "Only {slots} strategy call slots remaining this week"
  })
  
  const [remaining, setRemaining] = useState(300)
  const [slotsCount, setSlotsCount] = useState(3)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadCms() {
      try {
        const raw = await getCmsContent('home', 'countdown')
        if (raw) {
          const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768
          const deviceContent = isMobileDevice ? (raw.mobile || raw.desktop || raw) : (raw.desktop || raw)
          
          const duration = parseInt(deviceContent.countdownDuration) || 300
          
          setContent({
            enabled: deviceContent.enabled ?? true,
            slotsCount: parseInt(deviceContent.slotsCount) || 3,
            countdownDuration: duration,
            btnText: deviceContent.btnText || "Claim My Slot",
            btnLink: (deviceContent.btnLink && deviceContent.btnLink !== "#" && deviceContent.btnLink !== "#contact") ? deviceContent.btnLink : "https://link.yourmarketingai.com/widget/bookings/real-estate-growth-strategy-r-zfipu1-jvoty913",
            text: deviceContent.text || "Only {slots} strategy call slots remaining this week"
          })
          
          setSlotsCount(parseInt(deviceContent.slotsCount) || 3)
          
          // Read from sessionStorage so the countdown persists on refresh
          const stored = sessionStorage.getItem("cdStart")
          if (stored) {
            const elapsed = Math.floor((Date.now() - parseInt(stored)) / 1000)
            setRemaining(duration - (elapsed % duration))
          } else {
            sessionStorage.setItem("cdStart", Date.now().toString())
            setRemaining(duration)
          }
        } else {
          // If no CMS config exists, set defaults based on state
          const stored = sessionStorage.getItem("cdStart")
          if (stored) {
            const elapsed = Math.floor((Date.now() - parseInt(stored)) / 1000)
            setRemaining(300 - (elapsed % 300))
          } else {
            sessionStorage.setItem("cdStart", Date.now().toString())
            setRemaining(300)
          }
        }
      } catch (e) {
        console.error("Failed to load countdown CMS content:", e)
      }
    }
    if (mounted) {
      loadCms()
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted || !content.enabled) return

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          sessionStorage.setItem("cdStart", Date.now().toString())
          setSlotsCount(Math.random() > 0.5 ? 2 : 3)
          return content.countdownDuration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [mounted, content.enabled, content.countdownDuration])

  const pad = useCallback((n: number) => String(n).padStart(2, "0"), [])

  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  const scrollToCTA = () => {
    const targetUrl = (content.btnLink && content.btnLink !== "#" && content.btnLink !== "#contact")
      ? content.btnLink
      : "https://link.yourmarketingai.com/widget/bookings/real-estate-growth-strategy-r-zfipu1-jvoty913"

    if (targetUrl.startsWith("http")) {
      window.open(targetUrl, "_blank")
    } else if (targetUrl.startsWith("#")) {
      const el = document.getElementById(targetUrl.substring(1))
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = targetUrl
    }
  }

  if (!mounted || !content.enabled) return null

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
        {content.text.includes("{slots}") ? (
          <span dangerouslySetInnerHTML={{ __html: content.text.replace("{slots}", `<strong>${slotsCount}</strong>`) }} />
        ) : (
          content.text
        )}
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
        {content.btnText}
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
