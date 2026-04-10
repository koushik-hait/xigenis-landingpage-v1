"use client"

import React from "react"
import Image from "next/image"
import { ArrowUpRight, ShieldCheck, PieChart, Users, Lock } from "lucide-react"

interface FeaturesSectionProps {
  cmsContent?: any
}

const defaultIcons = [
  <Users key="1" className="h-6 w-6" />,
  <Lock key="2" className="h-6 w-6" />,
  <ShieldCheck key="3" className="h-6 w-6" />,
  <PieChart key="4" className="h-6 w-6" />
]

export function FeaturesSection({ cmsContent }: FeaturesSectionProps) {
  const content = {
    pillText: 'Our Commitment',
    heading: 'Why Trust Us With Your Growth',
    description: "We don't hide behind dashboards or vanity metrics. What you see is exactly what is happening.",
    buttonText: 'BOOK A FREE STRATEGY CALL',
    image: '/assets/man-on-house.png',
    features: [
      {
        title: "Limited Partners Per City",
        description: "We take one client per micro-market. Your direct competitors cannot access our system in your territory — ever.",
        tag: "Zero conflict of interest",
      },
      {
        title: "End-to-End Data Encryption",
        description: "Every lead, every conversation, every file is fully encrypted and stored securely. Your business data never leaves our protected environment.",
        tag: "Your data. Always safe.",
      },
      {
        title: "Real Estate-Only Team",
        description: "We work exclusively in real estate. No lifestyle brands. No e-commerce. Every person on your account understands your market and your buyer.",
        tag: "100% domain-specific expertise",
      },
      {
        title: "Transparent Reporting — No Black Box",
        description: "You see exactly what we're running, what's working, and what each rupee is producing. Live dashboards. Weekly reviews. Zero hidden metrics.",
        tag: "Full visibility. Always.",
      },
    ],
    ...cmsContent
  }

  return (
    <section className="mx-auto max-w-7xl bg-white px-6 py-20 font-sans">
      <div className="flex flex-col items-center gap-16 lg:flex-row">
        {/* Left Side: Creative Image */}
        <div className="relative flex w-full justify-center lg:w-1/2">
          <div className="relative h-[500px] w-[400px]">
            {/* Replace with your actual asset path */}
            <Image
              src={content.image || "/assets/man-on-house.png"}
              alt="Expert support for your real estate growth"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2">
          <div className="mb-8">
            <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-xs font-bold tracking-widest text-orange-600 uppercase">
              {content.pillText}
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold text-gray-900 md:text-5xl whitespace-pre-line">
              {content.heading}
            </h2>
            <p className="mb-8 max-w-xl text-lg text-gray-600 whitespace-pre-line">
              {content.description}
            </p>

            <button className="group flex items-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-white transition-colors hover:bg-gray-800">
              {content.buttonText}
              <span className="rounded-full bg-orange-500 p-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </div>

          {/* Features Grid */}
          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden">
            <div className="overflow-x-auto snap-x snap-mandatory -mx-4 px-4">
              <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                {content.features.map((f: any, index: number) => (
                  <div key={index} className="flex-shrink-0 w-[85vw] max-w-sm snap-center">
                    <div className="flex flex-col justify-between h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                      <div>
                        <div className="mb-4 flex items-start justify-between">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                            {index + 1}
                          </span>
                          <div className="text-gray-400">{defaultIcons[index % defaultIcons.length]}</div>
                        </div>
                        <h3 className="mb-2 leading-tight font-bold text-gray-900 whitespace-pre-line">{f.title}</h3>
                        <p className="mb-4 text-sm leading-relaxed text-gray-500 whitespace-pre-line">{f.description}</p>
                      </div>
                      <div className="inline-block w-fit rounded-full border border-gray-300 px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase">
                        {f.tag}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {content.features.map((f: any, index: number) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div className="text-gray-400">{defaultIcons[index % defaultIcons.length]}</div>
                  </div>
                  <h3 className="mb-2 leading-tight font-bold text-gray-900 whitespace-pre-line">{f.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500 whitespace-pre-line">{f.description}</p>
                </div>
                <div className="inline-block w-fit rounded-full border border-gray-300 px-3 py-1 text-[10px] font-semibold text-gray-600 uppercase">
                  {f.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

