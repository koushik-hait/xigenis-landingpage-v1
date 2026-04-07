"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20L20 4M4 4L20 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="rounded-full border-white text-white hover:bg-white hover:text-black bg-transparent px-6 py-6 text-xs tracking-widest font-semibold transition-all"
            onClick={() => scrollToSection('home')}
          >
            VISIT SITE <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            className="rounded-full bg-black text-white hover:bg-black/80 px-6 py-6 text-xs tracking-widest font-semibold transition-all"
            onClick={() => scrollToSection('contact')}
          >
            GET STARTED <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
