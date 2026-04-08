"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Placeholder for dashboard 1
    title: "Lorem ipsum dolor sit amet consectetur.",
    desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", // Placeholder for dashboard 2
    title: "Social Channel Engagement",
    desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1964&auto=format&fit=crop", // Placeholder for dashboard 3
    title: "Search Engine Marketing (SEM)",
    desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop", // Placeholder for dashboard 4
    title: "Lead Quality Metrics",
    desc: "Lorem ipsum dolor sit amet consectetur. Lacus enim orci tortor id ut odio.",
  },
]

const CampaignInsights = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 3500) // Changes every 3.5 seconds
      return () => clearInterval(timer)
    }
  }, [isHovered, nextSlide])

  // Calculate dynamic classes for the coverflow effect
  const getSlideStyle = (index: number) => {
    if (index === currentIndex) {
      // Center (Active) Slide
      return "translate-x-0 scale-100 opacity-100 z-20 shadow-2xl"
    } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
      // Left Slide
      return "-translate-x-[90%] md:-translate-x-[105%] scale-[0.85] opacity-50 z-10 blur-[1px] cursor-pointer"
    } else if (index === (currentIndex + 1) % slides.length) {
      // Right Slide
      return "translate-x-[90%] md:translate-x-[105%] scale-[0.85] opacity-50 z-10 blur-[1px] cursor-pointer"
    } else {
      // Hidden Slides (Behind)
      return "scale-75 opacity-0 z-0 pointer-events-none"
    }
  }

  return (
    <section className="w-full overflow-hidden bg-white py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-16 space-y-5 text-center">
          <div className="inline-block rounded-full border border-orange-200 bg-[#FFF5F1] px-6 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#FF6B35] uppercase">
            LOREM IPSUM DOLOR SIT
          </div>
          <h2 className="font-serif text-4xl tracking-tight text-gray-900 md:text-5xl">Ad Campaign Insights</h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
            Performance analytics and real-time tracking of ad campaigns across multiple platforms.
          </p>
        </div>

        {/* Carousel Section */}
        <div
          className="relative mt-12 flex h-[500px] w-full items-center justify-center md:h-[600px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => {
                // Allow clicking side panels to navigate
                if (index === (currentIndex - 1 + slides.length) % slides.length) prevSlide()
                if (index === (currentIndex + 1) % slides.length) nextSlide()
              }}
              className={`absolute top-0 flex h-full w-[85%] flex-col overflow-hidden rounded-xl border border-gray-100 bg-[#F8F9FA] transition-all duration-700 ease-in-out md:w-[60%] lg:w-[45%] ${getSlideStyle(
                index
              )}`}
            >
              {/* Dashboard Image Portion */}
              <div className="relative h-3/5 w-full border-b border-gray-100 bg-white p-4">
                <div className="relative h-full w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm">
                  <Image src={slide.image} alt={slide.title} fill className="object-cover object-top" />
                </div>
              </div>

              {/* Text Description Portion */}
              <div className="flex flex-grow flex-col justify-center space-y-4 p-8 md:p-10">
                <h3 className="font-serif text-2xl leading-tight text-black md:text-3xl">{slide.title}</h3>
                <p className="pr-4 text-sm leading-relaxed text-gray-500">{slide.desc}</p>
              </div>

              {/* Navigation Arrows (Only visible on the active center slide) */}
              {index === currentIndex && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevSlide()
                    }}
                    className="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextSlide()
                    }}
                    className="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex ? "h-2 w-8 bg-gray-800" : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { CampaignInsights }
