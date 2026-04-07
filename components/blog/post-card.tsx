"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"

interface PostCardProps {
  id: string
  title: string
  date: string
  author: string
  excerpt: string
  index: number
}

export function PostCard({ id, title, date, author, excerpt, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card hover:border-primary/50 group hover:shadow-primary/10 relative overflow-hidden rounded-2xl border transition-all hover:shadow-2xl"
    >
      <Link href={`/blog/posts/${id}`} className="block p-6">
        <div className="text-muted-foreground mb-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {author}
          </div>
        </div>

        <h3 className="font-heading group-hover:text-primary mb-3 text-xl font-bold transition-colors">{title}</h3>

        <p className="text-muted-foreground mb-6 line-clamp-2 text-sm">{excerpt}</p>

        <div className="text-primary flex items-center text-sm font-medium">
          Read More
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}
