"use client"

import { ArrowUpRight } from "lucide-react"
import { ExploreButton } from "@/components/ui/explore-button"
import Image from "next/image"

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="absolute top-20 right-0 left-0 z-50 bg-transparent p-4 hidden md:block">
      {/* Warm glow matching sticky countdown bar */}

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-4">
        {/* Logo */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black">
          <Image src="/assets/xigenis-logo.png" alt="Logo" width={40} height={40} className="h-10 w-10" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <ExploreButton href="https://link.yourmarketingai.com/widget/form/spArLMyaWXSR8rakhoMV" target="_blank" rel="noopener noreferrer" className="h-12 py-0">
            <span className="text-[10px] font-semibold tracking-widest">GET STARTED</span>
          </ExploreButton>
        </div>
      </div>
    </header>
  )
}
