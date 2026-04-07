"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

interface VideoItem {
  id: number
  title: string
  subtitle: string
  videoUrl: string
  thumbnail: string
}

// Sample video data - replace with actual videos
const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Brand Story",
    subtitle: "Digital Marketing Campaign",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "/api/placeholder/640/360",
  },
  {
    id: 2,
    title: "Product Launch",
    subtitle: "Social Media Content",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "/api/placeholder/640/360",
  },
  {
    id: 3,
    title: "Corporate Video",
    subtitle: "Content Creation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/api/placeholder/640/360",
  },
  {
    id: 4,
    title: "Motion Graphics",
    subtitle: "SEO Optimization",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "/api/placeholder/640/360",
  },
  {
    id: 5,
    title: "Explainer Video",
    subtitle: "Digital Strategy",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "/api/placeholder/640/360",
  },
]

export function VideoSlider3D() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalItems = videoData.length

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoRotating || isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoRotating, isPlaying, totalItems])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems)
    setIsAutoRotating(false)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
    setIsAutoRotating(false)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
    setIsAutoRotating(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Calculate 3D transform for each card
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const normalizedDiff = ((diff + totalItems) % totalItems) - Math.floor(totalItems / 2)

    // Calculate position in the carousel
    let translateX = normalizedDiff * 280
    let translateZ = -Math.abs(normalizedDiff) * 150
    let rotateY = normalizedDiff * -25
    let scale = 1 - Math.abs(normalizedDiff) * 0.15
    let opacity = 1 - Math.abs(normalizedDiff) * 0.3

    // Clamp values
    if (Math.abs(normalizedDiff) > 2) {
      opacity = 0
      scale = 0.5
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - Math.abs(normalizedDiff),
    }
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* 3D Carousel Container */}
      <div className="relative mx-auto h-[400px] sm:h-[450px] md:h-[500px]" style={{ perspective: "1200px" }}>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {videoData.map((video, index) => {
            const isActive = index === currentIndex
            const style = getCardStyle(index)

            return (
              <motion.div
                key={video.id}
                className="absolute cursor-pointer"
                style={{
                  ...style,
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={style}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => !isActive && goToIndex(index)}
              >
                {/* Video Card */}
                <div
                  className={`bg-card border-border relative w-[280px] overflow-hidden rounded-2xl border shadow-2xl shadow-black/20 transition-all duration-300 sm:w-[360px] md:w-[420px] ${
                    isActive ? "ring-primary ring-offset-background ring-2 ring-offset-2" : ""
                  } `}
                >
                  {/* Video/Thumbnail */}
                  <div className="bg-muted relative aspect-video">
                    {isActive ? (
                      <video
                        ref={videoRef}
                        src={video.videoUrl}
                        className="h-full w-full object-cover"
                        loop
                        muted
                        playsInline
                        poster={video.thumbnail}
                      />
                    ) : (
                      <div className="from-primary/20 to-secondary/20 flex h-full w-full items-center justify-center bg-gradient-to-br">
                        <Play className="h-12 w-12 text-white/50" />
                      </div>
                    )}

                    {/* Play/Pause Overlay for active card */}
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlay()
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100"
                      >
                        {isPlaying ? (
                          <Pause className="h-16 w-16 text-white drop-shadow-lg" />
                        ) : (
                          <Play className="h-16 w-16 text-white drop-shadow-lg" />
                        )}
                      </button>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-heading text-foreground text-lg font-bold sm:text-xl">{video.title}</h3>
                    <p className="text-muted-foreground text-sm">{video.subtitle}</p>
                  </div>

                  {/* Active indicator glow */}
                  {isActive && (
                    <div className="from-primary to-primary absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-r via-blue-400 opacity-30 blur-sm" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pointer-events-none absolute top-1/2 right-4 left-4 z-20 flex -translate-y-1/2 justify-between">
        <button
          onClick={goToPrev}
          className="bg-card/80 border-border hover:bg-primary hover:text-primary-foreground pointer-events-auto rounded-full border p-3 shadow-lg backdrop-blur-sm transition-colors"
          aria-label="Previous video"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="bg-card/80 border-border hover:bg-primary hover:text-primary-foreground pointer-events-auto rounded-full border p-3 shadow-lg backdrop-blur-sm transition-colors"
          aria-label="Next video"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {videoData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
            } `}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default VideoSlider3D
