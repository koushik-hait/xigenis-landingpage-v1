"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import { ArrowRight, Globe } from "lucide-react"

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
    title: "Revolutionizing Niche Tech Paradigms",
    categories: ["Strategy", "Design", "Identity"],
    location: "US Technology Corp",
    flag: "🇺🇸",
    image: "https://images.pexels.com/photos/1181332/pexels-photo-1181332.jpeg",
  },
  {
    id: 2,
    title: "Global E-Commerce Transformation",
    categories: ["E-Commerce", "UX Design", "Global Branding"],
    location: "RetailCo Group",
    flag: "🇬🇧",
    image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg",
  },
  {
    id: 3,
    title: "Next-Gen Enterprise Ecosystem",
    categories: ["Ecosystem", "Design System", "Architecture"],
    location: "DesignHub Global",
    flag: "🇨🇦",
    image: "https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg",
  },
]

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smooth parallax values
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="relative flex h-[100vh] items-center justify-center py-20">
      <motion.div
        style={{ opacity, scale }}
        className="group relative aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] md:aspect-[21/9]"
      >
        {/* Parallax Image */}
        <motion.div style={{ y: springY }} className="absolute inset-0 h-[120%] w-full">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <div className="grid items-end gap-8 md:grid-cols-[1fr,auto]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-widest text-white/70 uppercase backdrop-blur-md"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <div className="text-primary flex items-center gap-2">
                  <span className="text-lg">{project.flag}</span>
                  <span className="text-sm font-bold tracking-widest uppercase opacity-70">{project.location}</span>
                </div>
                <h3 className="text-3xl leading-[0.9] font-bold tracking-tighter text-white md:text-5xl lg:text-7xl">
                  {project.title}
                </h3>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hidden h-24 w-24 items-center justify-center rounded-full text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] lg:flex"
            >
              <ArrowRight className="h-10 w-10 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="relative bg-black select-none">
      {/* Background Text Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
        <h2 className="absolute top-0 -left-[10vw] text-[30vw] leading-none font-black tracking-tighter whitespace-nowrap text-white">
          PORTFOLIO
        </h2>
      </div>

      <div className="relative z-10 px-4">
        {/* Sticky-ish Title */}
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="bg-primary/40 mb-8 h-px w-24" />
            <h2 className="text-6xl leading-[0.8] font-black tracking-tight text-white md:text-8xl lg:text-[10rem]">
              FEATURED
              <br />
              <span className="from-primary bg-gradient-to-r to-blue-400 bg-clip-text text-transparent">PROJECTS</span>
            </h2>
          </motion.div>
        </div>

        {/* Projects List */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Section */}
        <div className="flex h-[60vh] flex-col items-center justify-center space-y-12 text-center">
          <h4 className="max-w-2xl px-6 text-2xl font-bold text-white/40 md:text-4xl">
            Ready to build your next brand masterpiece with us?
          </h4>
          <Button
            variant="outline"
            size="lg"
            className="group hover:border-primary h-auto rounded-full border-white/20 bg-transparent px-12 py-6 text-xl font-bold text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            Explore Full Archive
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
