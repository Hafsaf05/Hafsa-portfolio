"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'Python', pos: [0, 0, 0], color: '#00f2ff' },
  { name: 'TensorFlow', pos: [2, 1, -1], color: '#bc13fe' },
  { name: 'PyTorch', pos: [-2, 1, 1], color: '#bc13fe' },
  { name: 'NLP', pos: [1, -2, 2], color: '#ff00e5' },
  { name: 'Computer Vision', pos: [-1, -2, -2], color: '#ff00e5' },
  { name: 'Next.js', pos: [3, -1, 0], color: '#00ff9f' },
  { name: 'Three.js', pos: [-3, -1, 0], color: '#00ff9f' },
];

const Node = ({ name, position, color }: { name: string, position: [number, number, number], color: string }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[0.2, 32, 32]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </Sphere>
      <Text
        position={[position[0], position[1] + 0.4, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </Float>
  );
};

const Connections = () => {
  return (
    <>
      {skills.slice(1).map((skill, i) => (
        <Line
          key={i}
          points={[[0, 0, 0], skill.pos as [number, number, number]]}
          color="#ffffff"
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      ))}
    </>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Connections />
      {skills.map((skill, i) => (
        <Node key={i} name={skill.name} position={skill.pos as [number, number, number]} color={skill.color} />
      ))}
    </group>
  );
};

const SkillConstellation: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] bg-black/20 rounded-lg overflow-hidden border border-white/5">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default SkillConstellation;
