"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Get in Touch
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            Schedule a Call
          </Button>
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
