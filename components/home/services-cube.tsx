"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

interface ServicesCubeProps {
  autoRotate?: boolean
  size?: number
}

// Services to display on each face of the cube
const CUBE_SERVICES = [
  { text: "Branding", face: "front" },
  { text: "Web Dev", face: "back" },
  { text: "Mobile Dev", face: "right" },
  { text: "UI/UX", face: "left" },
  { text: "Logo Design", face: "top" },
  { text: "SEO", face: "bottom" },
]

function CubeFaceText({
  text,
  position,
  rotation,
}: {
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={0.28}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.015}
      outlineColor="#8cc63f"
      fontWeight="bold"
    >
      {text}
    </Text>
  )
}

export function ServicesCube({ autoRotate = true, size = 2.8 }: ServicesCubeProps) {
  const cubeRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const halfSize = size / 2 + 0.02 // Slightly outside cube face

  // Calculate positions for each face
  const faceConfigs: { text: string; position: [number, number, number]; rotation: [number, number, number] }[] = [
    { text: "Branding", position: [0, 0, halfSize], rotation: [0, 0, 0] },
    { text: "Web Dev", position: [0, 0, -halfSize], rotation: [0, Math.PI, 0] },
    { text: "Mobile Dev", position: [halfSize, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { text: "UI/UX", position: [-halfSize, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    { text: "Logo Design", position: [0, halfSize, 0], rotation: [-Math.PI / 2, 0, 0] },
    { text: "SEO", position: [0, -halfSize, 0], rotation: [Math.PI / 2, 0, 0] },
  ]

  // Animation frame for rotation
  useFrame((state, delta) => {
    if (!cubeRef.current) return

    if (autoRotate && !hovered) {
      cubeRef.current.rotation.y += delta * 0.4
      cubeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  const edgesGeometry = useMemo(() => {
    const boxGeometry = new THREE.BoxGeometry(size, size, size)
    return new THREE.EdgesGeometry(boxGeometry)
  }, [size])

  return (
    <group ref={cubeRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Main cube body - glassmorphism */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial
          color="#0b0f3b"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glowing edges */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#8cc63f" transparent opacity={0.9} />
      </lineSegments>

      {/* Service labels on each face */}
      {faceConfigs.map((config, index) => (
        <CubeFaceText key={index} text={config.text} position={config.position} rotation={config.rotation} />
      ))}

      {/* Accent lights */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#8cc63f" />
      <pointLight position={[-2, -2, -2]} intensity={0.3} color="#a6e24b" />
    </group>
  )
}

export default ServicesCube
