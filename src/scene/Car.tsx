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
  isMobilePortrait?: boolean;
}

// Configurable Steering & Input Parameters
const STEERING_CONFIG = {
  SENSITIVITY: 0.008,      // Smooth drag sensitivity for pointer/touch
  KEYBOARD_SPEED: 7.5,     // Keyboard lane steering speed (units/sec)
  DEAD_ZONE: 3,            // Minimum pixel delta threshold
  MAX_STEER_DELTA: 0.35,   // Maximum target X shift per input update (prevents sudden jumps)
  MAX_LANE_X: 5.2,         // Road boundary bounds [-5.2, 5.2]
  DAMPING_FACTOR: 6.0,     // Weight & smooth lerping factor
};

export const Car: React.FC<CarProps> = ({
  position,
  targetZ,
  isAutoDriving,
  onUpdateState,
  hasStarted,
  hasFinished,
  isMobilePortrait = false,
}) => {
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Physics & Steering State
  const posRef = useRef<[number, number, number]>(position);
  const speedRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const targetXRef = useRef<number>(position[0]);
  const scrollVelocityRef = useRef<number>(0);

  // Sync external position changes (teleport on crash/reset)
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

    // RESTORED TOUCH / POINTER DRAG STEERING SYSTEM
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if (!hasStarted || hasFinished || isMobilePortrait) return;

      // Ignore interactive HUD elements (buttons, modals, etc.)
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button, a, input, select, [role="button"]') ||
         target.classList.contains('pointer-events-auto'))
      ) {
        return;
      }

      isPointerDown = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown || !hasStarted || hasFinished || isMobilePortrait) return;

      const diffX = e.clientX - pointerStartX;
      const diffY = pointerStartY - e.clientY; // Positive diffY is swipe UP (forward)

      // Apply Dead Zone check to ignore minor jitter
      if (Math.abs(diffX) >= STEERING_CONFIG.DEAD_ZONE) {
        // Intuitive Mapping: Swipe/Drag LEFT (diffX < 0) moves car LEFT (decreases X)
        // Swipe/Drag RIGHT (diffX > 0) moves car RIGHT (increases X)
        const steerDelta = Math.min(
          STEERING_CONFIG.MAX_STEER_DELTA,
          Math.max(-STEERING_CONFIG.MAX_STEER_DELTA, diffX * STEERING_CONFIG.SENSITIVITY)
        );

        targetXRef.current = Math.min(
          STEERING_CONFIG.MAX_LANE_X,
          Math.max(-STEERING_CONFIG.MAX_LANE_X, targetXRef.current + steerDelta)
        );

        pointerStartX = e.clientX;
      }

      // Vertical drag drives forward / backward
      if (Math.abs(diffY) >= STEERING_CONFIG.DEAD_ZONE) {
        scrollVelocityRef.current += diffY * 0.4;
        pointerStartY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    // Wheel / Trackpad listener
    const handleWheel = (e: WheelEvent) => {
      if (!hasStarted || hasFinished || isMobilePortrait) return;

      const clampedDeltaY = Math.min(100, Math.max(-100, e.deltaY));
      const clampedDeltaX = Math.min(100, Math.max(-100, e.deltaX));

      // Vertical scroll drives forward/backward
      scrollVelocityRef.current += clampedDeltaY * 0.6;

      // Horizontal trackpad scroll: e.deltaX > 0 is scroll RIGHT (move RIGHT)
      if (Math.abs(clampedDeltaX) >= STEERING_CONFIG.DEAD_ZONE) {
        const wheelSteerDelta = Math.min(
          STEERING_CONFIG.MAX_STEER_DELTA,
          Math.max(-STEERING_CONFIG.MAX_STEER_DELTA, clampedDeltaX * 0.006)
        );

        targetXRef.current = Math.min(
          STEERING_CONFIG.MAX_LANE_X,
          Math.max(-STEERING_CONFIG.MAX_LANE_X, targetXRef.current + wheelSteerDelta)
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [hasStarted, hasFinished, isMobilePortrait]);

  useFrame((_, delta) => {
    if (!carGroupRef.current) return;

    // IF GAME HAS NOT STARTED (LAUNCH PAD), FINISHED, OR IN MOBILE PORTRAIT LOCK: FREEZE MOVEMENT
    if (!hasStarted || hasFinished || isMobilePortrait) {
      speedRef.current = 0;
      scrollVelocityRef.current = 0;
      onUpdateState(posRef.current, rotationRef.current, 0);
      return;
    }

    let speed = speedRef.current;
    let currentX = posRef.current[0];
    let currentZ = posRef.current[2];
    let rotation = rotationRef.current;

    // Dampen vertical scroll velocity
    const scrollImpulse = scrollVelocityRef.current;
    scrollVelocityRef.current = THREE.MathUtils.lerp(scrollVelocityRef.current, 0, delta * 5);

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
      // Manual Controls: Keyboard (W/S/A/D or Arrows) or Touch/Scroll
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

      // Keyboard Lane Steering
      if (isSteeringLeft) {
        targetXRef.current = Math.max(
          -STEERING_CONFIG.MAX_LANE_X,
          targetXRef.current - delta * STEERING_CONFIG.KEYBOARD_SPEED
        );
      } else if (isSteeringRight) {
        targetXRef.current = Math.min(
          STEERING_CONFIG.MAX_LANE_X,
          targetXRef.current + delta * STEERING_CONFIG.KEYBOARD_SPEED
        );
      }
    }

    // Smooth Weight-based Position Lerping (Damping factor simulates car weight)
    currentX = THREE.MathUtils.lerp(
      currentX,
      targetXRef.current,
      delta * STEERING_CONFIG.DAMPING_FACTOR
    );

    // Calculate dynamic steering tilt roll based on horizontal movement
    const xVelocity = targetXRef.current - currentX;
    const targetRotation = Math.min(0.2, Math.max(-0.2, -xVelocity * 0.15));
    rotation = THREE.MathUtils.lerp(rotation, targetRotation, delta * 8);

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

          {/* Headlights */}
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
