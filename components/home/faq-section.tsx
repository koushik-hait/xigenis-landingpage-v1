"use client"

import React, { useState } from "react"
import { Plus, Minus, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQSectionProps {
  cmsContent?: any
}

export function FAQSection({ cmsContent }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const content = {
    heading: "Answers To Your Most Important\nQuestions",
    buttonText: "ASK A QUESTION",
    faqs: [
      {
        question: "How Quickly Can I Start Getting Buyer Leads?",
        answer:
          "Most of our partners see their first high-intent buyer leads within the first 72 hours of the campaign going live. We optimize in real-time to ensure lead quality remains high from day one.",
      },
      {
        question: "Do you integrate with my existing CRM?",
        answer:
          "Our automated systems capture and verify contact information immediately, pushing them directly to your CRM.",
      },
      {
        question: "Are the leads exclusive to me?",
        answer: "We use hyper-local targeting to ensure the leads are actually looking in your specific micro-market.",
      },
      {
        question: "How do I know what's working?",
        answer: "Transparency is key. You'll have a live dashboard to track every lead as it comes through our system.",
      },
    ],
    headingSize: "48",
    ...cmsContent,
  }

  return (
    <section className="max-w-8xl mx-auto flex flex-col items-center bg-black px-5 py-10 text-white md:px-6 lg:px-20">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2
          className="mb-8 font-serif text-4xl leading-tight font-medium whitespace-pre-line md:text-5xl"
          style={{ fontSize: `${content.headingSize}px` }}
        >
          {content.heading}
        </h2>

        <button className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-200">
          {content.buttonText}
          <span className="rounded-full bg-[#FF5C35] p-1 text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Accordion Container */}
      <div className="w-full max-w-3xl space-y-4 lg:max-w-4xl">
        {content.faqs.map((faq: any, index: number) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A1A] transition-colors hover:bg-[#222222]"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left md:p-8"
            >
              <span className="text-lg font-medium tracking-tight whitespace-pre-line md:text-xl">
                <span className="mr-4 opacity-60">{index + 1}.</span>
                {faq.question}
              </span>
              <div className="ml-4 flex-shrink-0">
                {activeIndex === index ? (
                  <Minus className="h-6 w-6 text-white/80" />
                ) : (
                  <Plus className="h-6 w-6 text-white/80" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="max-w-2xl px-8 pt-0 pb-8 leading-relaxed whitespace-pre-line text-gray-400">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
