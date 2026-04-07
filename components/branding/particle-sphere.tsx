"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleSphereProps {
  count?: number
  radius?: number
  particleSize?: number
  color?: string
  hoverColor?: string
}

export function ParticleSphere({
  count = 800,
  radius = 2,
  particleSize = 0.03,
  color = "#3b82f6",
  hoverColor = "#60a5fa",
}: ParticleSphereProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const { camera, gl } = useThree()
  const [hovered, setHovered] = useState(false)

  // Track mouse position
  const mouse = useMemo(() => new THREE.Vector2(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])

  // Generate sphere points using fibonacci spiral + velocity/position tracking
  const { basePositions, currentPositions, velocities } = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const currPos: THREE.Vector3[] = []
    const vels: THREE.Vector3[] = []

    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const theta = (2 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      const pos = new THREE.Vector3(x, y, z)
      positions.push(pos)
      currPos.push(pos.clone())
      vels.push(new THREE.Vector3(0, 0, 0))
    }

    return { basePositions: positions, currentPositions: currPos, velocities: vels }
  }, [count, radius])

  // Mouse tracking on canvas
  const onPointerMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / gl.domElement.clientWidth) * 2 - 1
    mouse.y = -(e.clientY / gl.domElement.clientHeight) * 2 + 1
  }

  gl.domElement.addEventListener("pointermove", onPointerMove)

  // Animation frame with electron-like repulsion physics
  useFrame((state, delta) => {
    if (!meshRef.current) return

    const dummy = new THREE.Object3D()
    const time = state.clock.elapsedTime

    // Get cursor position in 3D space using raycaster
    raycaster.setFromCamera(mouse, camera)
    const cursorWorld = new THREE.Vector3()
    raycaster.ray.at(5, cursorWorld) // Get point 5 units along the ray

    for (let i = 0; i < count; i++) {
      const basePos = basePositions[i]!
      const currPos = currentPositions[i]!
      const vel = velocities[i]!

      // Rotate base position slowly
      const rotatedBase = basePos.clone()
      rotatedBase.applyAxisAngle(new THREE.Vector3(0, 1, 0), time * 0.15)

      if (hovered) {
        // Calculate distance from cursor to particle
        const toCursor = currPos.clone().sub(cursorWorld)
        const distance = toCursor.length()

        // Electron-like repulsion: inverse square force
        // Like charges repel - stronger when closer
        const repulsionRadius = 3.5
        if (distance < repulsionRadius && distance > 0.01) {
          const repulsionStrength = 10.0
          const force = repulsionStrength / (distance * distance)

          // Direction away from cursor (repulsion)
          const repulsionDir = toCursor.normalize()

          // Apply force to velocity
          vel.add(repulsionDir.multiplyScalar(force * delta))
        }
      }

      // Spring force - pulls particles back to original sphere position
      const toBase = rotatedBase.clone().sub(currPos)
      const springStrength = hovered ? 1.5 : 6.0
      vel.add(toBase.multiplyScalar(springStrength * delta))

      // Damping - simulates friction/drag
      vel.multiplyScalar(0.94)

      // Update position based on velocity
      currPos.add(vel.clone().multiplyScalar(delta * 60))

      // Subtle floating animation
      const floatOffset = Math.sin(time * 2 + i * 0.05) * 0.01

      dummy.position.set(currPos.x, currPos.y + floatOffset, currPos.z)

      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true

    // Color transition on hover
    const material = meshRef.current.material as THREE.MeshBasicMaterial
    const targetColor = hovered ? new THREE.Color(hoverColor) : new THREE.Color(color)
    material.color.lerp(targetColor, delta * 5)
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[particleSize, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </instancedMesh>
  )
}

export default ParticleSphere
