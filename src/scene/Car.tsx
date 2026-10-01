import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CarProps {
  position: [number, number, number];
  targetZ: number;
  isAutoDriving: boolean;
  onUpdateState: (pos: [number, number, number], rotation: number, speed: number) => void;
  audioMuted: boolean;
}

export const Car: React.FC<CarProps> = ({
  targetZ,
  isAutoDriving,
  onUpdateState,
}) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Physics state
  const posRef = useRef<[number, number, number]>([0, 0, 0]);
  const speedRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const targetXRef = useRef<number>(0);

  // Keyboard control states
  const keys = useRef<{ [key: string]: boolean }>({});

  // Check if external GLTF car model exists safely
  const [modelLoaded, setModelLoaded] = useState(false);
  let customCarModel: any = null;

  try {
    const gltf = useGLTF('/assets/car/car.glb');
    if (gltf && gltf.scene) {
      customCarModel = gltf.scene;
    }
  } catch {
    // Fallback to procedural high-tech cyber car if no file exists yet
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!carGroupRef.current) return;

    let speed = speedRef.current;
    let currentX = posRef.current[0];
    let currentZ = posRef.current[2];
    let rotation = rotationRef.current;

    // Acceleration & Controls Logic
    if (isAutoDriving) {
      // Smooth auto cruise control towards targetZ
      const distToTarget = targetZ - currentZ;
      if (Math.abs(distToTarget) > 1) {
        // Drive towards negative Z
        const direction = Math.sign(distToTarget);
        speed = THREE.MathUtils.lerp(speed, direction * 75, delta * 3);
      } else {
        speed = THREE.MathUtils.lerp(speed, 0, delta * 5);
      }
      targetXRef.current = THREE.MathUtils.lerp(targetXRef.current, 0, delta * 2);
    } else {
      // Manual Player Controls (W/S or Up/Down, A/D or Left/Right)
      const isAccelerating = keys.current['KeyW'] || keys.current['ArrowUp'];
      const isBraking = keys.current['KeyS'] || keys.current['ArrowDown'];
      const isSteeringLeft = keys.current['KeyA'] || keys.current['ArrowLeft'];
      const isSteeringRight = keys.current['KeyD'] || keys.current['ArrowRight'];
      const isHandbrake = keys.current['Space'];

      if (isAccelerating) {
        speed = THREE.MathUtils.lerp(speed, -110, delta * 2.5); // Negative Z is forward
      } else if (isBraking) {
        speed = THREE.MathUtils.lerp(speed, 35, delta * 3); // Reverse
      } else {
        speed = THREE.MathUtils.lerp(speed, 0, delta * (isHandbrake ? 8 : 2));
      }

      // Lateral Lane Steering (X-axis)
      if (isSteeringLeft) {
        targetXRef.current = Math.max(-5.5, targetXRef.current - delta * 12);
        rotation = THREE.MathUtils.lerp(rotation, 0.15, delta * 8);
      } else if (isSteeringRight) {
        targetXRef.current = Math.min(5.5, targetXRef.current + delta * 12);
        rotation = THREE.MathUtils.lerp(rotation, -0.15, delta * 8);
      } else {
        rotation = THREE.MathUtils.lerp(rotation, 0, delta * 6);
      }
    }

    // Update X position smoothly towards target steering
    currentX = THREE.MathUtils.lerp(currentX, targetXRef.current, delta * 8);

    // Update Z position based on speed (km/h conversion)
    const distanceDelta = (speed * delta * 0.28);
    currentZ += distanceDelta;

    // Clamp track boundaries so car never falls off track (Track Z range: 10 down to -650)
    currentZ = Math.min(15, Math.max(-650, currentZ));

    // Store updated positions
    posRef.current = [currentX, 0.35, currentZ];
    speedRef.current = speed;
    rotationRef.current = rotation;

    // Apply to 3D object transform
    carGroupRef.current.position.set(currentX, 0.35, currentZ);
    carGroupRef.current.rotation.y = rotation;
    carGroupRef.current.rotation.z = -rotation * 0.4; // Steering tilt roll

    // Animate Wheels spinning proportional to speed
    wheelsRef.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += speed * delta * 0.15;
    });

    // Send state back to game state manager
    onUpdateState(posRef.current, rotation, Math.abs(Math.round(speed)));
  });

  return (
    <group ref={carGroupRef} position={[0, 0.35, 0]}>
      {customCarModel ? (
        <primitive object={customCarModel} scale={[1, 1, 1]} />
      ) : (
        /* Procedural Cyberpunk Sports Car Mesh */
        <group>
          {/* Main Car Chassis / Metallic Body */}
          <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
            <boxGeometry args={[1.9, 0.55, 4.2]} />
            <meshStandardMaterial
              color="#070b19"
              metalness={0.9}
              roughness={0.15}
              envMapIntensity={1.5}
            />
          </mesh>

          {/* Sleek Aerodynamic Roof Canopy */}
          <mesh castShadow position={[0, 0.85, -0.2]}>
            <boxGeometry args={[1.4, 0.45, 2.2]} />
            <meshPhysicalMaterial
              color="#001830"
              metalness={0.8}
              roughness={0.05}
              transmission={0.4}
              ior={1.5}
            />
          </mesh>

          {/* Dual Cyan LED Headlights */}
          <group position={[0, 0.45, -2.05]}>
            <mesh position={[-0.65, 0, 0]}>
              <boxGeometry args={[0.45, 0.12, 0.1]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            <mesh position={[0.65, 0, 0]}>
              <boxGeometry args={[0.45, 0.12, 0.1]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>

            {/* Projected Headlight Beams */}
            <spotLight
              position={[0, 0, 0]}
              target-position={[0, -0.5, -25]}
              color="#00f0ff"
              intensity={8}
              distance={40}
              angle={0.5}
              penumbra={0.4}
              castShadow
            />
          </group>

          {/* Red Laser Taillight Bar */}
          <group position={[0, 0.5, 2.05]}>
            <mesh>
              <boxGeometry args={[1.7, 0.12, 0.1]} />
              <meshBasicMaterial color="#ff0055" />
            </mesh>
            <pointLight color="#ff0055" intensity={4} distance={8} />
          </group>

          {/* Neon Blue Underglow Chassis Lighting */}
          <pointLight position={[0, -0.1, 0]} color="#00f0ff" intensity={3} distance={6} />

          {/* Cyber Exhaust Thrusters Glow */}
          <mesh position={[-0.4, 0.3, 2.1]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh position={[0.4, 0.3, 2.1]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* 4 Alloy Wheels with Glowing Calipers */}
          {[
            [-0.95, 0.15, -1.3], // Front Left
            [0.95, 0.15, -1.3],  // Front Right
            [-0.95, 0.15, 1.3],   // Rear Left
            [0.95, 0.15, 1.3],    // Rear Right
          ].map((pos, idx) => (
            <group
              key={idx}
              position={pos as [number, number, number]}
              ref={(el) => {
                if (el) wheelsRef.current[idx] = el;
              }}
            >
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
                <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.3} />
              </mesh>
              {/* Alloy Rim Accent */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.32, 12]} />
                <meshBasicMaterial color="#00f0ff" wireframe />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
};
