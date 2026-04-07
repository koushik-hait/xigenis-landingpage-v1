"use client"

import { Card } from "@/components/ui/card"

interface WhyUsSectionProps {
  whyChooseUs: string[]
}

export function WhyUsSection({ whyChooseUs }: WhyUsSectionProps) {
  return (
    <section id="why-us" className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-card-foreground mb-4 text-4xl font-bold sm:text-5xl">
            Why Choose <span className="text-primary">Megaabyte</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-balance text-gray-600">
            We deliver measurable results, not just promises
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {whyChooseUs.map((reason, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 flex items-start gap-4 p-6 transition-all duration-300"
            >
              <div className="bg-primary/20 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                <div className="bg-primary h-2 w-2 rounded-full" />
              </div>
              <p className="leading-relaxed text-gray-700">{reason}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
