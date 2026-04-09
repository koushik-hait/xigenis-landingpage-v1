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
    <header className="absolute top-0 right-0 left-0 z-50 pt-8 bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
          <Button
            className="rounded-full bg-black px-6 py-6 text-xs font-semibold tracking-widest text-white transition-all hover:bg-black/80"
            onClick={() => scrollToSection("contact")}
          >
            GET STARTED <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
