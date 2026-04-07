"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, MeshWobbleMaterial, Text, useTexture, RoundedBox, Float } from "@react-three/drei"
import * as THREE from "three"

// --- About Visual: Abstract floating shapes ---
export function AboutVisual() {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.cos(t / 4) / 8
    meshRef.current.rotation.y = Math.sin(t / 4) / 8
    meshRef.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <group ref={meshRef}>
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#8cc63f" speed={2} distort={0.4} />
      </mesh>
      <mesh position={[1, 0.5, -1]}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <MeshWobbleMaterial color="#a6e24b" speed={3} factor={0.6} />
      </mesh>
      <mesh position={[0.5, -0.8, 0.5]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#8cc63f" emissive="#4d7c0f" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// --- Blog Visual: Floating content cards ---
export function BlogVisual() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.sin(i * 1.5) * 2, Math.cos(i * 1.5) * 2, -i]}
            rotation={[Math.random(), Math.random(), Math.random()]}
          >
            <boxGeometry args={[1, 1.4, 0.1]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#8cc63f" : "#a6e24b"} />
          </mesh>
        ))}
      </Float>
    </group>
  )
}

// --- Branding Visual: Megaabyte Logo ---
export function BrandingVisual() {
  // Use texture for the logo
  const logoTexture = useTexture("/assets/megaabyte.png")
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.5
  })

  return (
    <group ref={meshRef}>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={logoTexture} transparent opacity={1} />
      </mesh>
      <RoundedBox args={[3.2, 3.2, 0.1]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.3}
        />
      </RoundedBox>
    </group>
  )
}

// --- Career Visual: Growth sculpture ---
export function CareerVisual() {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    meshRef.current.rotation.y += 0.01
  })

  return (
    <group ref={meshRef}>
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.3 - 1.5, 0]} rotation={[0, i * 0.5, 0]}>
          <boxGeometry args={[i * 0.2 + 0.5, 0.2, i * 0.2 + 0.5]} />
          <meshStandardMaterial color={`hsl(${80 + i * 5}, 80%, 50%)`} />
        </mesh>
      ))}
    </group>
  )
}

// --- Design Visual: Fluid creative mesh ---
export function DesignVisual() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 128, 128]} />
      <MeshDistortMaterial color="#a6e24b" speed={4} distort={0.5} radius={1} />
    </mesh>
  )
}

// --- Projects Visual: Dynamic grid ---
export function ProjectsVisual() {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t + i) * 0.01
      child.rotation.x += 0.01
      child.rotation.z += 0.01
    })
  })

  return (
    <group ref={meshRef}>
      {[...Array(27)].map((_, i) => (
        <mesh
          key={i}
          position={[((i % 3) - 1) * 1.2, ((Math.floor(i / 3) % 3) - 1) * 1.2, (Math.floor(i / 9) - 1) * 1.2]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#8cc63f" wireframe={i % 2 === 0} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// --- Technology Visual: Tech core ---
export function TechnologyVisual() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8cc63f" wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#a6e24b" emissive="#a6e24b" emissiveIntensity={2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#a6e24b" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#8cc63f" />
      </mesh>
    </group>
  )
}
