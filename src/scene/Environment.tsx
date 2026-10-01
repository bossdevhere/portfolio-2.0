import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Environment: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);

  // Generate 40 cyber skyscrapers along left and right sides of the road
  const buildings = useMemo(() => {
    const list = [];
    const NUM_BUILDINGS = 40;

    for (let i = 0; i < NUM_BUILDINGS; i++) {
      const isLeft = i % 2 === 0;
      const x = isLeft ? -(22 + Math.random() * 20) : 22 + Math.random() * 20;
      const z = 20 - i * 16;
      const height = 18 + Math.random() * 40;
      const width = 8 + Math.random() * 10;
      const depth = 8 + Math.random() * 10;
      const colorHex = i % 3 === 0 ? '#080d1a' : i % 3 === 1 ? '#0e0a20' : '#05101a';
      const neonColor = i % 4 === 0 ? '#00f0ff' : i % 4 === 1 ? '#7000ff' : i % 4 === 2 ? '#ff00aa' : '#00ff66';

      list.push({ x, z, height, width, depth, colorHex, neonColor, id: i });
    }
    return list;
  }, []);

  // Optimized floating cyber dust particles
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = -Math.random() * 650;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group>
      {/* Skybox & Dark Atmospheric Fog */}
      <color attach="background" args={['#030712']} />
      <fogExp2 attach="fog" args={['#04091a', 0.007]} />

      {/* Futuristic Cyber Skyscrapers (Optimized: No heavy shadow maps) */}
      {buildings.map((b) => (
        <group key={b.id} position={[b.x, b.height / 2, b.z]}>
          {/* Building Main Tower */}
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color={b.colorHex}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Roof Neon Beacon */}
          <mesh position={[0, b.height / 2 + 0.3, 0]}>
            <boxGeometry args={[b.width * 0.8, 0.4, b.depth * 0.8]} />
            <meshBasicMaterial color={b.neonColor} />
          </mesh>
        </group>
      ))}

      {/* Street Light Poles along the track (Optimized: Emissive glowing lamps, no 60 dynamic spotlights!) */}
      {Array.from({ length: 25 }).map((_, idx) => {
        const zPos = 20 - idx * 26;
        return (
          <group key={idx}>
            {/* Left Street Light */}
            <group position={[-9, 0, zPos]}>
              <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 6]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[1, 5.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <cylinderGeometry args={[0.05, 0.05, 2.5]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[2, 5.3, 0]}>
                <boxGeometry args={[0.5, 0.15, 0.3]} />
                <meshBasicMaterial color="#00f0ff" />
              </mesh>
            </group>

            {/* Right Street Light */}
            <group position={[9, 0, zPos]}>
              <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 6]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[-1, 5.8, 0]} rotation={[0, 0, Math.PI / 6]}>
                <cylinderGeometry args={[0.05, 0.05, 2.5]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[-2, 5.3, 0]}>
                <boxGeometry args={[0.5, 0.15, 0.3]} />
                <meshBasicMaterial color="#7000ff" />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Cyber Floating Particle Dust System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color="#00f0ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
