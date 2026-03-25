"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles as Sparkles3D, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Contournement typage React 19 + R3F v8
const Group = "group" as any;
const MeshBasicMaterial = "meshBasicMaterial" as any;

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    }
  });

  return (
    <Group ref={groupRef}>
      <Sparkles3D count={300} scale={20} size={3} speed={0.3} opacity={0.4} color="#60a5fa" />
      <Sparkles3D count={150} scale={20} size={2} speed={0.2} opacity={0.3} color="#c084fc" />
      <Sphere args={[2.5, 32, 32]} position={[0, 0, -2]}>
        <MeshBasicMaterial color="#3b82f6" wireframe={true} transparent opacity={0.06} />
      </Sphere>
      <Sphere args={[4, 24, 24]} position={[0, 0, -8]}>
        <MeshBasicMaterial color="#9333ea" wireframe={true} transparent opacity={0.04} />
      </Sphere>
    </Group>
  );
}

export default function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full opacity-70">
      <Scene />
    </Canvas>
  );
}
