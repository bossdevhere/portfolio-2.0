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
  hasStarted: boolean;
  hasFinished: boolean;
}

export const Car: React.FC<CarProps> = ({
  position,
  targetZ,
  isAutoDriving,
  onUpdateState,
  hasStarted,
  hasFinished,
}) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Physics state
  const posRef = useRef<[number, number, number]>(position);
  const speedRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const targetXRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const scrollSteerRef = useRef<number>(0);

  // Sync external position changes
  useEffect(() => {
    const distZ = Math.abs(posRef.current[2] - position[2]);
    if (distZ > 5) {
      posRef.current = [...position];
      speedRef.current = 0;
      targetXRef.current = position[0];
      if (carGroupRef.current) {
        carGroupRef.current.position.set(...position);
      }
    }
  }, [position]);

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
    // Fallback to procedural high-tech cyber car
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    // Scroll Wheel / Trackpad listener for forward/backward & left/right driving
    const handleWheel = (e: WheelEvent) => {
      if (!hasStarted || hasFinished) return;
      const clampedDeltaY = Math.min(100, Math.max(-100, e.deltaY));
      const clampedDeltaX = Math.min(100, Math.max(-100, e.deltaX));

      // Vertical scroll drives forward/backward
      scrollVelocityRef.current += clampedDeltaY * 0.8;

      // Horizontal scroll (Trackpad two-finger left/right or mouse tilt) steers left/right
      if (Math.abs(clampedDeltaX) > 1) {
        scrollSteerRef.current += clampedDeltaX * 0.08;
      }
    };

    // Touch swipe listener for mobile scrolling (both vertical & horizontal)
    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!hasStarted || hasFinished) return;
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;

      const deltaY = touchStartY - touchY;
      const deltaX = touchStartX - touchX;

      scrollVelocityRef.current += deltaY * 0.5;
      scrollSteerRef.current += deltaX * 0.05;

      touchStartY = touchY;
      touchStartX = touchX;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [hasStarted, hasFinished]);

  useFrame((_, delta) => {
    if (!carGroupRef.current) return;

    // IF GAME HAS NOT STARTED (LAUNCH PAD) OR FINISHED: FREEZE MOVEMENT
    if (!hasStarted || hasFinished) {
      speedRef.current = 0;
      scrollVelocityRef.current = 0;
      scrollSteerRef.current = 0;
      onUpdateState(posRef.current, rotationRef.current, 0);
      return;
    }

    let speed = speedRef.current;
    let currentX = posRef.current[0];
    let currentZ = posRef.current[2];
    let rotation = rotationRef.current;

    // Dampen scroll velocity & steering impulse
    const scrollImpulse = scrollVelocityRef.current;
    const scrollSteerImpulse = scrollSteerRef.current;
    scrollVelocityRef.current = THREE.MathUtils.lerp(scrollVelocityRef.current, 0, delta * 5);
    scrollSteerRef.current = THREE.MathUtils.lerp(scrollSteerRef.current, 0, delta * 6);

    // Acceleration & Controls Logic
    if (isAutoDriving) {
      const distToTarget = targetZ - currentZ;
      if (Math.abs(distToTarget) > 1) {
        const direction = Math.sign(distToTarget);
        speed = THREE.MathUtils.lerp(speed, direction * 75, delta * 3);
      } else {
        speed = THREE.MathUtils.lerp(speed, 0, delta * 5);
      }
      targetXRef.current = THREE.MathUtils.lerp(targetXRef.current, 0, delta * 2);
    } else {
      // Manual Player Controls
      const isAccelerating = keys.current['KeyW'] || keys.current['ArrowUp'];
      const isBraking = keys.current['KeyS'] || keys.current['ArrowDown'];
      const isSteeringLeft = keys.current['KeyA'] || keys.current['ArrowLeft'];
      const isSteeringRight = keys.current['KeyD'] || keys.current['ArrowRight'];
      const isHandbrake = keys.current['Space'];

      if (isAccelerating) {
        speed = THREE.MathUtils.lerp(speed, -110, delta * 2.5);
      } else if (isBraking) {
        speed = THREE.MathUtils.lerp(speed, 40, delta * 3);
      } else if (Math.abs(scrollImpulse) > 0.5) {
        const targetScrollSpeed = -scrollImpulse * 1.5;
        speed = THREE.MathUtils.lerp(speed, targetScrollSpeed, delta * 4);
      } else {
        speed = THREE.MathUtils.lerp(speed, 0, delta * (isHandbrake ? 8 : 2));
      }

      // Lateral Lane Steering (X-axis) - Keyboard W/S/A/D OR Horizontal Scroll / Touch Swipe
      if (isSteeringLeft) {
        targetXRef.current = Math.max(-5.5, targetXRef.current - delta * 12);
        rotation = THREE.MathUtils.lerp(rotation, 0.15, delta * 8);
      } else if (isSteeringRight) {
        targetXRef.current = Math.min(5.5, targetXRef.current + delta * 12);
        rotation = THREE.MathUtils.lerp(rotation, -0.15, delta * 8);
      } else if (Math.abs(scrollSteerImpulse) > 0.01) {
        // Horizontal Scroll / Trackpad left-right steering
        targetXRef.current = Math.min(5.5, Math.max(-5.5, targetXRef.current + scrollSteerImpulse));
        rotation = THREE.MathUtils.lerp(rotation, -Math.sign(scrollSteerImpulse) * 0.15, delta * 8);
      } else {
        rotation = THREE.MathUtils.lerp(rotation, 0, delta * 6);
      }
    }

    // Update X position smoothly towards target steering
    currentX = THREE.MathUtils.lerp(currentX, targetXRef.current, delta * 8);

    // Update Z position based on speed
    const distanceDelta = (speed * delta * 0.28);
    currentZ += distanceDelta;

    // Clamp track boundaries
    currentZ = Math.min(15, Math.max(-560, currentZ));

    // Store updated positions
    posRef.current = [currentX, 0.35, currentZ];
    speedRef.current = speed;
    rotationRef.current = rotation;

    // Apply to 3D object transform
    carGroupRef.current.position.set(currentX, 0.35, currentZ);
    carGroupRef.current.rotation.y = rotation;
    carGroupRef.current.rotation.z = -rotation * 0.4;

    // Animate Wheels spinning proportional to speed
    wheelsRef.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += speed * delta * 0.15;
    });

    onUpdateState(posRef.current, rotation, Math.abs(Math.round(speed)));
  });

  return (
    <group ref={carGroupRef} position={position}>
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

          {/* Headlights (Always glowing green/cyan) */}
          <group position={[0, 0.45, -2.05]}>
            <mesh position={[-0.65, 0, 0]}>
              <boxGeometry args={[0.45, 0.12, 0.1]} />
              <meshBasicMaterial color="#00ff66" />
            </mesh>
            <mesh position={[0.65, 0, 0]}>
              <boxGeometry args={[0.45, 0.12, 0.1]} />
              <meshBasicMaterial color="#00ff66" />
            </mesh>

            <spotLight
              position={[0, 0, 0]}
              target-position={[0, -0.5, -25]}
              color="#00ff66"
              intensity={hasStarted && !hasFinished ? 8 : 2}
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
              <meshBasicMaterial color="#ff0044" />
            </mesh>
            <pointLight color="#ff0044" intensity={3} distance={8} />
          </group>

          {/* Underglow Lighting */}
          <pointLight position={[0, -0.1, 0]} color="#00ff66" intensity={hasStarted ? 3 : 1} distance={6} />

          {/* 4 Alloy Wheels */}
          {[
            [-0.95, 0.15, -1.3],
            [0.95, 0.15, -1.3],
            [-0.95, 0.15, 1.3],
            [0.95, 0.15, 1.3],
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
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.32, 12]} />
                <meshBasicMaterial color="#00ff66" wireframe />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
};
