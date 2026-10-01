import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ObstaclesProps {
  playerPos: [number, number, number];
  onCollision: () => void;
  isGameActive: boolean;
}

interface TrafficVehicle {
  id: number;
  type: 'car' | 'truck';
  x: number;
  z: number;
  speed: number;
  color: string;
  width: number;
  height: number;
  length: number;
}

export const Obstacles: React.FC<ObstaclesProps> = ({ playerPos, onCollision, isGameActive }) => {
  const groupRef = useRef<THREE.Group>(null);
  const vehiclesRef = useRef<THREE.Group[]>([]);
  const lastCollisionTime = useRef<number>(0);

  // Generate 16 obstacle vehicles across 3 highway lanes
  const trafficVehicles = useMemo<TrafficVehicle[]>(() => {
    const list: TrafficVehicle[] = [];
    const lanes = [-4, 0, 4]; // Left, center, right lanes
    const colors = ['#ff0055', '#ffaa00', '#aa00ff', '#00ff66', '#00e5ff'];

    for (let i = 0; i < 16; i++) {
      const isTruck = i % 3 === 0;
      const lane = lanes[i % 3];
      const z = -40 - i * 35; // Spaced out along the track
      const speed = isTruck ? 15 + Math.random() * 10 : 25 + Math.random() * 15;

      list.push({
        id: i,
        type: isTruck ? 'truck' : 'car',
        x: lane,
        z,
        speed,
        color: colors[i % colors.length],
        width: isTruck ? 2.4 : 1.8,
        height: isTruck ? 2.2 : 1.1,
        length: isTruck ? 5.5 : 3.6,
      });
    }
    return list;
  }, []);

  useFrame((_, delta) => {
    if (!isGameActive) return;

    const [px, py, pz] = playerPos;
    const now = performance.now();

    // Move traffic vehicles along the track
    trafficVehicles.forEach((veh, idx) => {
      const meshGroup = vehiclesRef.current[idx];
      if (!meshGroup) return;

      // Move obstacle forward or backward
      veh.z += veh.speed * delta * 0.4;
      if (veh.z > 15) {
        veh.z = -560; // Loop back to start of track
      }

      meshGroup.position.set(veh.x, veh.height / 2, veh.z);

      // Bounding Box Collision Detection
      const dx = Math.abs(px - veh.x);
      const dz = Math.abs(pz - veh.z);

      // Hitbox thresholds
      const hitWidth = (1.9 + veh.width) * 0.45;
      const hitLength = (4.2 + veh.length) * 0.42;

      if (dx < hitWidth && dz < hitLength) {
        // Cooldown of 1.5s between collision triggers
        if (now - lastCollisionTime.current > 1500) {
          lastCollisionTime.current = now;
          onCollision();
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {trafficVehicles.map((veh, idx) => (
        <group
          key={veh.id}
          ref={(el) => {
            if (el) vehiclesRef.current[idx] = el;
          }}
          position={[veh.x, veh.height / 2, veh.z]}
        >
          {veh.type === 'truck' ? (
            /* Cyber Cargo Truck */
            <group>
              {/* Truck Container Cab */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[veh.width, veh.height, veh.length]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Neon Accent Strip */}
              <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[veh.width + 0.05, 0.2, veh.length + 0.05]} />
                <meshBasicMaterial color={veh.color} />
              </mesh>
              {/* Red Tail Warning Lights */}
              <mesh position={[0, 0, veh.length / 2 + 0.05]}>
                <boxGeometry args={[veh.width * 0.8, 0.3, 0.1]} />
                <meshBasicMaterial color="#ff0044" />
              </mesh>
            </group>
          ) : (
            /* Cyber Sedan / Traffic Car */
            <group>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[veh.width, veh.height, veh.length]} />
                <meshStandardMaterial color="#1e1028" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[0, veh.height / 2 + 0.1, 0]}>
                <boxGeometry args={[veh.width * 0.8, 0.3, veh.length * 0.5]} />
                <meshBasicMaterial color={veh.color} />
              </mesh>
              <mesh position={[0, 0, veh.length / 2 + 0.05]}>
                <boxGeometry args={[veh.width * 0.8, 0.15, 0.1]} />
                <meshBasicMaterial color="#ff0055" />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};
