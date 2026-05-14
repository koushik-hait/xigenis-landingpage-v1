"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { CalendarCheck } from "lucide-react"
import toastMessages from "@/data/toast-notifications.json"

interface RandomToastProps {
  enabled?: boolean
}

export function RandomToast({ enabled = true }: RandomToastProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const messagesRef =
    useRef<{ name: string; city: string; state: string; message: string; time: string }[]>(toastMessages)

  useEffect(() => {
    if (!enabled) return

    const showRandomToast = () => {
      const randomIndex = Math.floor(Math.random() * messagesRef.current.length)
      const randomMessage = messagesRef.current[randomIndex]

      toast.custom(
        () => (
          <div
            className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-xl"
            style={{ minWidth: 320, maxWidth: 380 }}
          >
            {/* Calendar icon */}
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <CalendarCheck className="size-[18px]" />
            </div>

            {/* Content */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {/* Top row — name | city, state */}
              <p className="truncate text-sm font-semibold text-white">
                {randomMessage?.name}
                <span className="ml-1 text-xs font-normal text-white/50">
                  · {randomMessage?.city}, {randomMessage?.state}
                </span>
              </p>

              {/* Middle row — message */}
              <p className="text-[13px] leading-snug text-white/70">{randomMessage?.message}</p>

              {/* Bottom row — time */}
              <p className="mt-0.5 text-[11px] font-medium text-white/40">{randomMessage?.time}</p>
            </div>
          </div>
        ),
        {
          duration: 4000,
          position: "bottom-left",
        },
      )
    }

    // Show first toast immediately
    showRandomToast()

    // Set up recurring timer with random interval between 1-13 seconds
    const scheduleNextToast = () => {
      const randomInterval = Math.floor(Math.random() * 13 + 1) * 1000 // 1-13 seconds

      intervalRef.current = setTimeout(() => {
        showRandomToast()
        scheduleNextToast() // Schedule next toast
      }, randomInterval)
    }

    scheduleNextToast()

    const cleanup = () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }

    return cleanup
  }, [enabled])

  return null // This component doesn't render anything
}
