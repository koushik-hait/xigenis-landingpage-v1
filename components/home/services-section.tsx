"use client"

import { Card } from "@/components/ui/card"

interface Service {
  title: string
  description: string
  features: string[]
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-card-foreground mb-4 text-4xl font-bold sm:text-5xl">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-balance text-gray-600">
            We blend creativity, technology, and strategy to help businesses grow in the digital era
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-border group p-8 transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="font-heading text-primary mb-4 text-2xl font-bold">{service.title}</h3>
              <p className="mb-6 leading-relaxed text-gray-600">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
