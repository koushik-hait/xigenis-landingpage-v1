"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "917602308104" // +91 98765 43210 without spaces and special characters
  const message = "Hello Megaabyte! I'm interested in your services."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="bg-card text-foreground border-border absolute right-full mr-3 rounded-lg border px-3 py-2 text-sm font-medium whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
