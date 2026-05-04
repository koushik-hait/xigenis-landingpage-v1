"use client"

import { ArrowUpRight } from "lucide-react"
import { ExploreButton } from "@/components/ui/explore-button"

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="relative top-0 right-0 left-0 z-50 p-4 bg-inherit">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent" aria-hidden="true" />
      {/* Warm dark overlays to match the aesthetic */}
      <div className="absolute inset-0 bg-[#352F28]/10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#17110B]/90 via-[#17110B]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-[#0A0705]/30 opacity-90" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-4">
        {/* Logo */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black">
          <img src="/assets/xigenis-logo.png" alt="Logo" className="h-10 w-10" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* <Button
            variant="outline"
            className="rounded-full border-white bg-transparent px-6 py-6 text-xs font-semibold tracking-widest text-white transition-all hover:bg-white hover:text-black"
            onClick={() => scrollToSection("home")}
          >
            VISIT SITE <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button> */}
          <ExploreButton onClick={() => scrollToSection("contact")} className="h-12 py-0">
            <span className="text-[10px] font-semibold tracking-widest">GET STARTED</span>
          </ExploreButton>
        </div>
      </div>
    </header>
  )
}
