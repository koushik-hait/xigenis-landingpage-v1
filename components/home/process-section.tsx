"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface ProcessStep {
  title: string
  description: string
  icon: string
}

interface ProcessSectionProps {
  processSteps: ProcessStep[]
  scrollToSection: (sectionId: string) => void
}

export function ProcessSection({ processSteps, scrollToSection }: ProcessSectionProps) {
  return (
    <section id="process" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-4xl font-bold sm:text-5xl">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
            Our proven 5-step process ensures your project succeeds from concept to launch
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 p-6 text-center transition-all duration-300"
            >
              <div className="mb-4 text-5xl">{step.icon}</div>
              <h3 className="font-heading text-primary mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => scrollToSection("contact")}
          >
            Start a Project
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  )
}
