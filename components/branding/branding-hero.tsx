"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { ParticleSphere } from "./particle-sphere"

export default function BrandingHero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 lg:px-8">
        {/* Background gradient */}
        {/* <div className="from-primary/5 via-background to-secondary/5 absolute inset-0 bg-gradient-to-br" /> */}

        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="font-heading text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-foreground block">WHEN YOU</span>
                <span className="text-foreground block">STAND OUT,</span>
                <span className="text-primary block">YOU WIN.</span>
              </h1>

              <p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0">
                Whether you're creating a brand from the ground up or reimagining your business identity.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Start Your Brand
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  View Portfolio
                </Button>
              </div>
            </div>

            {/* Right - 3D Particle Sphere */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Glow effect behind sphere */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/20 h-48 w-48 rounded-full blur-3xl sm:h-64 sm:w-64" />
              </div>

              {/* 3D Canvas with Particle Sphere */}
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                className="touch-none"
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

                <Suspense fallback={null}>
                  <ParticleSphere count={1000} radius={2} particleSize={0.025} color="#3b82f6" hoverColor="#60a5fa" />
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>

              {/* Floating decorative elements */}
              <div className="border-primary/30 pointer-events-none absolute top-10 -right-4 h-16 w-16 rounded-full border opacity-60" />
              <div className="border-secondary/20 pointer-events-none absolute bottom-20 -left-8 h-24 w-24 rounded-full border opacity-40" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
