"use client"

import { Card } from "@/components/ui/card"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section id="faq" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-4xl font-bold sm:text-5xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about working with us</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 p-6 transition-all duration-300">
              <h3 className="font-heading text-primary mb-3 text-lg font-bold">{faq.question}</h3>
              <p className="leading-relaxed text-gray-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
