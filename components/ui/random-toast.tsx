"use client"

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import toastMessages from '@/data/toast-notifications.json'

interface RandomToastProps {
  enabled?: boolean
}

export function RandomToast({ enabled = true }: RandomToastProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const messagesRef = useRef<{ name: string, city: string, state: string, message: string, time: string }[]>(toastMessages)

  useEffect(() => {
    if (!enabled) return

    const showRandomToast = () => {
      const randomIndex = Math.floor(Math.random() * messagesRef.current.length)
      const randomMessage = messagesRef.current[randomIndex]

      toast.info(`${randomMessage?.name} from ${randomMessage?.city}, ${randomMessage?.state}`, {
        duration: 4000,
        position: 'bottom-left',
        description: (
          <div className="flex flex-col gap-1">
            <span>{randomMessage?.message}</span>
            <span className="text-[11px] opacity-50 font-medium">{randomMessage?.time}</span>
          </div>
        ),
      })
    }

    // Show first toast immediately
    showRandomToast()


    // Set up recurring timer with random interval between 1-3 minutes
    const scheduleNextToast = () => {
      const randomInterval = Math.floor(Math.random() * 2 + 1) * 60 * 1000 // 1-3 minutes in milliseconds

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
