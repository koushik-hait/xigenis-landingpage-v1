"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, User, Mail, MessageSquare, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl"
    >
      {/* Decorative background glow */}
      <div className="bg-primary/10 pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Get In Touch</h2>
          <p className="text-white/40">Have a project in mind? Let's build something extraordinary together.</p>
        </div>

        <form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-primary ml-1 text-xs font-black tracking-widest uppercase">Name</label>
              <div className="group relative">
                <Input
                  placeholder="John Doe"
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="focus:border-primary focus:ring-primary/20 h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-white transition-all placeholder:text-white/20"
                />
                <User
                  className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transition-colors ${
                    focused === "name" ? "text-primary" : "text-white/20"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-primary ml-1 text-xs font-black tracking-widest uppercase">Email</label>
              <div className="group relative">
                <Input
                  type="email"
                  placeholder="john@example.com"
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="focus:border-primary focus:ring-primary/20 h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-white transition-all placeholder:text-white/20"
                />
                <Mail
                  className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transition-colors ${
                    focused === "email" ? "text-primary" : "text-white/20"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-primary ml-1 text-xs font-black tracking-widest uppercase">Service Type</label>
            <div className="group relative">
              <Input
                placeholder="Branding, Web Development, etc."
                onFocus={() => setFocused("service")}
                onBlur={() => setFocused(null)}
                className="focus:border-primary focus:ring-primary/20 h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-white transition-all placeholder:text-white/20"
              />
              <Briefcase
                className={`absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transition-colors ${
                  focused === "service" ? "text-primary" : "text-white/20"
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-primary ml-1 text-xs font-black tracking-widest uppercase">Message</label>
            <div className="group relative">
              <Textarea
                placeholder="Tell us about your project..."
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="focus:border-primary focus:ring-primary/20 min-h-[160px] resize-none rounded-2xl border-white/10 bg-white/5 pt-4 pl-12 text-white transition-all placeholder:text-white/20"
              />
              <MessageSquare
                className={`absolute top-6 left-4 h-5 w-5 transition-colors ${
                  focused === "message" ? "text-primary" : "text-white/20"
                }`}
              />
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90 group h-16 w-full rounded-2xl text-lg font-black text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]">
            SEND MESSAGE
            <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
