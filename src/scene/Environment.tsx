import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Environment: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);

  // Generate 40 cyber skyscrapers along the left and right sides of the road track
  const buildings = useMemo(() => {
    const list = [];
    const NUM_BUILDINGS = 50;

    for (let i = 0; i < NUM_BUILDINGS; i++) {
      const isLeft = i % 2 === 0;
      const x = isLeft ? -(22 + Math.random() * 25) : 22 + Math.random() * 25;
      const z = 20 - i * 14;
      const height = 15 + Math.random() * 45;
      const width = 8 + Math.random() * 12;
      const depth = 8 + Math.random() * 12;
      const colorHex = i % 3 === 0 ? '#0a192f' : i % 3 === 1 ? '#110c28' : '#071520';
      const neonColor = i % 4 === 0 ? '#00f0ff' : i % 4 === 1 ? '#7000ff' : i % 4 === 2 ? '#ff00aa' : '#00ff66';

      list.push({ x, z, height, width, depth, colorHex, neonColor, id: i });
    }
    return list;
  }, []);

  // Generate 500 cyber floating dust particles
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 25;
      pos[i * 3 + 2] = -Math.random() * 700;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Skybox & Dark Atmospheric Fog */}
      <color attach="background" args={['#030712']} />
      <fogExp2 attach="fog" args={['#04091a', 0.0075]} />

      {/* Futuristic Cyber Skyscrapers */}
      {buildings.map((b) => (
        <group key={b.id} position={[b.x, b.height / 2, b.z]}>
          {/* Building Main Tower Mesh */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color={b.colorHex}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Roof Neon Beacon */}
          <mesh position={[0, b.height / 2 + 0.5, 0]}>
            <boxGeometry args={[b.width * 0.8, 0.4, b.depth * 0.8]} />
            <meshBasicMaterial color={b.neonColor} />
          </mesh>
          <pointLight
            position={[0, b.height / 2 + 1, 0]}
            color={b.neonColor}
            intensity={2}
            distance={20}
          />
        </group>
      ))}

      {/* Street Light Poles along the track */}
      {Array.from({ length: 30 }).map((_, idx) => {
        const zPos = 20 - idx * 24;
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
              <spotLight
                position={[2, 5.2, 0]}
                target-position={[0, 0, zPos]}
                color="#00f0ff"
                intensity={4}
                distance={18}
                angle={0.6}
              />
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
              <spotLight
                position={[-2, 5.2, 0]}
                target-position={[0, 0, zPos]}
                color="#7000ff"
                intensity={4}
                distance={18}
                angle={0.6}
              />
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
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
