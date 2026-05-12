"use client"

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import toastMessages from '@/data/toast-messages.json'

interface RandomToastProps {
  enabled?: boolean
}

export function RandomToast({ enabled = true }: RandomToastProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const messagesRef = useRef<string[]>(toastMessages)

  useEffect(() => {
    if (!enabled) return

    const showRandomToast = () => {
      const randomIndex = Math.floor(Math.random() * messagesRef.current.length)
      const randomMessage = messagesRef.current[randomIndex]

      toast(randomMessage, {
        duration: 4000,
        position: 'bottom-right',
      })
    }

    // Show first toast immediately
    showRandomToast()

    // Set up recurring timer with random interval between 1-5 minutes
    const scheduleNextToast = () => {
      const randomInterval = Math.floor(Math.random() * 4 + 1) * 60 * 1000 // 1-5 minutes in milliseconds

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
