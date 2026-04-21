"use client"

import { ArrowRight } from "lucide-react"
import { ExploreButton } from "@/components/ui/explore-button"

export function ContactSection() {
  return (
    <section id="contact" className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-heading mb-6 text-4xl font-bold sm:text-5xl">
          Let's Build Something <span className="text-primary">Powerful</span>
        </h2>
        <p className="text-muted-foreground mb-12 text-lg leading-relaxed text-balance">
          Let's create something exceptional together. Your next big idea starts here.
        </p>

        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
          <ExploreButton className="mx-0">
            <span className="font-semibold">Get in Touch</span>
          </ExploreButton>
          <ExploreButton className="mx-0">
            <span className="font-semibold">Schedule a Call</span>
          </ExploreButton>
        </div>

        <div className="border-border grid gap-8 border-t pt-12 sm:grid-cols-3">
          <div>
            <div className="text-muted-foreground mb-2 text-sm">Email</div>
            <div className="font-semibold">hello@megaabyte.com</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-2 text-sm">Phone</div>
            <div className="font-semibold">+91 98765 43210</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-2 text-sm">Location</div>
            <div className="font-semibold">Bengaluru, India</div>
          </div>
        </div>
      </div>
    </section>
  )
}
