'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Box, Sphere, Torus, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5
    }
    return s
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#EC4899"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingCube({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={ref} args={[0.6, 0.6, 0.6]} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe
        />
      </Box>
    </Float>
  )
}

function GlowingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#EC4899"
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#F59E0B"
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>
    </Float>
  )
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1.5}>
      <Torus ref={ref} args={[2.5, 0.05, 16, 100]} position={[0, 0, -1]}>
        <MeshWobbleMaterial
          color="#10B981"
          transparent
          opacity={0.25}
          factor={0.3}
          speed={1}
        />
      </Torus>
    </Float>
  )
}

function CodeBlock() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
      <Box ref={ref} args={[1.8, 1.2, 0.05]} position={[2.5, 0.5, -0.5]}>
        <meshStandardMaterial
          color="#1E293B"
          transparent
          opacity={0.7}
          metalness={0.5}
          roughness={0.3}
        />
      </Box>
    </Float>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#EC4899" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#F59E0B" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#10B981" />

      <GlowingSphere />
      <FloatingTorus />
      <CodeBlock />
      <Particles count={300} />
      
      <FloatingCube position={[-3, 1.5, -2]} color="#EC4899" speed={0.8} />
      <FloatingCube position={[3.5, -1, -1.5]} color="#F59E0B" speed={1.2} />
      <FloatingCube position={[-2, -1.5, 1]} color="#10B981" speed={0.6} />
      <FloatingCube position={[1, 2, -3]} color="#EC4899" speed={1} />
      <FloatingCube position={[-4, 0, -2]} color="#F59E0B" speed={0.9} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <SceneContent />
    </Canvas>
  )
}
