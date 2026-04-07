"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"

interface Project {
  id: number
  title: string
  categories: string[]
  location: string
  flag: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "A US-based Niche Technology Company Needed To Bring Expertise To The Forefront",
    categories: ["Brand", "Design", "Digital", "Technology"],
    location: "Narwal",
    flag: "🇺🇸",
    image: "https://images.pexels.com/photos/1181332/pexels-photo-1181332.jpeg",
  },
  {
    id: 2,
    title: "Revolutionizing E-Commerce Experience For A Global Retail Brand",
    categories: ["E-Commerce", "UX Design", "Development"],
    location: "RetailCo",
    flag: "🇬🇧",
    image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg",
  },
  {
    id: 3,
    title: "Building A Next-Generation Design System For Enterprise Software",
    categories: ["Design System", "UI/UX", "Frontend"],
    location: "DesignHub",
    flag: "🇨🇦",
    image: "https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg",
  },
]

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        setScrollY(scrollProgress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = (scrollY - 0.5) * 100
  const imageScale = 1 + Math.max(0, scrollY - 0.5) * 0.2
  const contentOpacity = Math.min(1, Math.max(0, scrollY * 2))
  const contentTranslateY = Math.max(0, (1 - scrollY) * 50)

  return (
    <div
      ref={cardRef}
      className="group relative h-[600px] overflow-hidden rounded-2xl"
      style={{
        opacity: contentOpacity,
      }}
    >
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
          transformOrigin: "center",
        }}
      >
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        <div className="from-background via-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      {/* Content Overlay */}
      <div
        className="relative flex h-full flex-col justify-between p-8 md:p-12"
        style={{
          transform: `translateY(${contentTranslateY}px)`,
        }}
      >
        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {project.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-secondary/50 text-foreground border-border/50 border px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="space-y-4">
          {/* Location Badge */}
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="text-2xl">{project.flag}</span>
            <span className="font-medium">{project.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-foreground max-w-4xl text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="bg-primary/0 group-hover:bg-primary/5 pointer-events-none absolute inset-0 transition-colors duration-500" />
    </div>
  )
}

export default function FeaturedProjects() {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const [headerOpacity, setHeaderOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect()
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight
        setHeaderOpacity(Math.min(1, Math.max(0, scrollProgress * 2)))
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="bg-background min-h-screen px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Section Header */}
        <h2
          ref={headerRef}
          className="text-center text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          style={{
            opacity: headerOpacity,
            transform: `translateY(${(1 - headerOpacity) * 30}px)`,
          }}
        >
          FEATURED PROJECTS
        </h2>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
      {/* View More Projects Button */}
      <div className="flex justify-center py-12">
        <Button
          variant="outline"
          size="lg"
          className="border-foreground text-foreground hover:bg-foreground hover:text-background border-2 px-8 py-6 text-lg transition-all duration-300"
        >
          View More Projects
        </Button>
      </div>
    </section>
  )
}
