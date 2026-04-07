"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHero3DProps {
  title: string
  subtitle: string
  description: string
  badge?: string
  ctaText?: string
  ctaOnClick?: () => void
  visual?: React.ReactNode
}

export function PageHero3D({
  title,
  subtitle,
  description,
  badge,
  ctaText = "Learn More",
  ctaOnClick,
  visual,
}: PageHero3DProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(140,198,63,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(166,226,75,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading mb-6 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
            >
              <span className="text-foreground">{title}</span>
              <br />
              <span className="from-primary to-primary animate-gradient via-hover-accent bg-gradient-to-r bg-[length:200%_auto] bg-clip-text text-transparent">
                {subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground mb-8 max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25 shadow-lg"
                onClick={ctaOnClick}
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>

          {/* Right Side - 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/20 h-64 w-64 rounded-full blur-3xl sm:h-80 sm:w-80" />
            </div>

            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="touch-none"
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <directionalLight position={[-10, 10, 5]} intensity={0.5} color="#8cc63f" />

              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  {visual}
                </Float>
                <Environment preset="city" />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={(Math.PI * 3) / 4}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="border-primary/10 absolute top-1/4 left-10 h-64 w-64 rounded-full border opacity-50 blur-2xl" />
        <div className="border-secondary/10 absolute right-10 bottom-1/4 h-80 w-80 rounded-full border opacity-30 blur-3xl" />
      </div>

      <div className="from-background absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  )
}
