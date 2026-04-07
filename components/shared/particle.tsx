"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useSpring, useTransform } from "framer-motion"
import * as THREE from "three"

type Props = { count: number }

export default function Particles({ count }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const { camera, gl } = useThree()
  const [scale, setScale] = useState(0)

  /* ---------- initial data ---------- */
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      pos.set([rand(), rand(), rand()], i * 3)
      // Change to green/lime color scheme
      const hue = 0.2 + Math.random() * 0.15 // Green to lime range
      c.setHSL(hue, 0.8, 0.6)
      col.set([c.r, c.g, c.b], i * 3)
    }
    return { positions: pos, colors: col }
  }, [count])

  /* ---------- geometry & material ---------- */
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.15, 16, 16) // Increased size for better interaction
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [colors])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.2,
        metalness: 0.8,
      }),
    []
  )

  /* ---------- mouse tracking ---------- */
  const [hovered, setHovered] = useState(false)
  const mouse = useMemo(() => new THREE.Vector2(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])

  const onPointerMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / gl.domElement.clientWidth) * 2 - 1
    mouse.y = -(e.clientY / gl.domElement.clientHeight) * 2 + 1
    // Always set hovered to true when mouse moves over canvas
    setHovered(true)
  }

  const onPointerLeave = () => {
    setHovered(false)
    springStrength.set(0)
  }

  gl.domElement.addEventListener("pointermove", onPointerMove)
  gl.domElement.addEventListener("pointerleave", onPointerLeave)

  /* ---------- spring value for scatter strength ---------- */
  const springStrength = useSpring(0, { stiffness: 220, damping: 25 })

  /* ---------- initial scale animation ---------- */
  const scaleSpring = useSpring(0.1, { stiffness: 120, damping: 20 })

  // Trigger scale animation on mount
  useMemo(() => {
    scaleSpring.set(1)
  }, [])

  /* ---------- per-frame animation ---------- */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    raycaster.setFromCamera(mouse, camera)

    const dummy = new THREE.Object3D()
    const origin = new THREE.Vector3()
    const direction = new THREE.Vector3()
    const currentScale = scaleSpring.get()

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3]
      const y = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]

      // base orbit position
      const base = new THREE.Vector3(
        x! * Math.cos(t + i) * 1.2,
        y! + Math.sin(t * 0.8 + i) * 0.5,
        z! * Math.sin(t + i) * 1.2
      )

      // scatter logic
      if (hovered) {
        // Get cursor world position at z=0 plane
        const cursorWorld = new THREE.Vector3()
        cursorWorld.set(mouse.x, mouse.y, 0).unproject(camera)

        const dist = base.distanceTo(cursorWorld)
        const radius = 3.0
        if (dist < radius) {
          const push = base
            .clone()
            .sub(cursorWorld)
            .normalize()
            .multiplyScalar((1 - dist / radius) * springStrength.get() * 2)
          base.add(push)
        }
      }

      dummy.position.copy(base)
      dummy.scale.setScalar(currentScale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      onPointerOver={(e) => {
        e.stopPropagation()
        springStrength.set(1.8) // push strength
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        springStrength.set(0)
      }}
    />
  )
}

function rand() {
  return (Math.random() - 0.5) * 8
}
