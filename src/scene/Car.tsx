import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingJoystick } from '../components/ui/FloatingJoystick';

interface CarProps {
  position: [number, number, number];
  targetZ: number;
  isAutoDriving: boolean;
  onUpdateState: (pos: [number, number, number], rotation: number, speed: number) => void;
  audioMuted: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
}

// Configurable Steering & Input Parameters
const STEERING_CONFIG = {
  KEYBOARD_SPEED: 7.5,     // Keyboard lane steering speed (units/sec)
  DEAD_ZONE: 0.08,         // Normalized analog steering dead zone threshold
  MAX_STEER_DELTA: 0.35,   // Maximum target X shift per input update
  MAX_LANE_X: 5.2,         // Road boundary bounds [-5.2, 5.2]
  DAMPING_FACTOR: 6.0,     // Weight & smooth lerping factor
  JOYSTICK_RADIUS: 45,     // Floating joystick radius in pixels
};

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

  // Physics & Steering State
  const posRef = useRef<[number, number, number]>(position);
  const speedRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);
  const targetXRef = useRef<number>(position[0]);
  const scrollVelocityRef = useRef<number>(0);

  // Floating Analog Joystick State & Refs
  const activePointerIdRef = useRef<number | null>(null);
  const isJoystickActiveRef = useRef<boolean>(false);
  const basePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const knobPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const analogSteerRef = useRef<number>(0);

  const [joystickUI, setJoystickUI] = useState<{
    active: boolean;
    basePos: { x: number; y: number };
    knobPos: { x: number; y: number };
  }>({
    active: false,
    basePos: { x: 0, y: 0 },
    knobPos: { x: 0, y: 0 },
  });

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

    // FLOATING ANALOG JOYSTICK POINTER HANDLERS
    const handlePointerDown = (e: PointerEvent) => {
      if (!hasStarted || hasFinished) return;

      // Ignore interactive HUD elements (buttons, modals, etc.)
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button, a, input, select, [role="button"]') ||
         target.classList.contains('pointer-events-auto'))
      ) {
        return;
      }

      // Ignore secondary touches if joystick is already active
      if (activePointerIdRef.current !== null) return;

      activePointerIdRef.current = e.pointerId;
      isJoystickActiveRef.current = true;
      basePosRef.current = { x: e.clientX, y: e.clientY };
      knobPosRef.current = { x: 0, y: 0 };
      analogSteerRef.current = 0;

      setJoystickUI({
        active: true,
        basePos: { x: e.clientX, y: e.clientY },
        knobPos: { x: 0, y: 0 },
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isJoystickActiveRef.current || e.pointerId !== activePointerIdRef.current) return;

      const dx = e.clientX - basePosRef.current.x;
      const dy = e.clientY - basePosRef.current.y;
      const dist = Math.hypot(dx, dy);
      const clampedDist = Math.min(dist, STEERING_CONFIG.JOYSTICK_RADIUS);
      const angle = Math.atan2(dy, dx);

      const knobX = Math.cos(angle) * clampedDist;
      const knobY = Math.sin(angle) * clampedDist;

      let normX = knobX / STEERING_CONFIG.JOYSTICK_RADIUS;
      if (Math.abs(normX) < STEERING_CONFIG.DEAD_ZONE) {
        normX = 0;
      }

      analogSteerRef.current = normX;
      knobPosRef.current = { x: knobX, y: knobY };

      // Optional vertical drag for scroll velocity adjustment
      if (Math.abs(dy) >= 10) {
        scrollVelocityRef.current += -dy * 0.02;
      }

      setJoystickUI({
        active: true,
        basePos: basePosRef.current,
        knobPos: { x: knobX, y: knobY },
      });
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId === activePointerIdRef.current) {
        activePointerIdRef.current = null;
        isJoystickActiveRef.current = false;
        analogSteerRef.current = 0;
        knobPosRef.current = { x: 0, y: 0 };

        setJoystickUI({
          active: false,
          basePos: { x: 0, y: 0 },
          knobPos: { x: 0, y: 0 },
        });
      }
    };

    // Wheel / Trackpad listener
    const handleWheel = (e: WheelEvent) => {
      if (!hasStarted || hasFinished) return;

      const clampedDeltaY = Math.min(100, Math.max(-100, e.deltaY));
      const clampedDeltaX = Math.min(100, Math.max(-100, e.deltaX));

      // Vertical scroll drives forward/backward
      scrollVelocityRef.current += clampedDeltaY * 0.6;

      // Horizontal trackpad scroll: e.deltaX > 0 is scroll RIGHT (move RIGHT)
      if (Math.abs(clampedDeltaX) >= 5) {
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
  }, [hasStarted, hasFinished]);

  useFrame((_, delta) => {
    if (!carGroupRef.current) return;

    // IF GAME HAS NOT STARTED (LAUNCH PAD) OR FINISHED: FREEZE MOVEMENT
    if (!hasStarted || hasFinished) {
      speedRef.current = 0;
      scrollVelocityRef.current = 0;
      isJoystickActiveRef.current = false;
      analogSteerRef.current = 0;
      activePointerIdRef.current = null;
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
      // Manual Controls: Floating Joystick or Keyboard
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
      } else if (isJoystickActiveRef.current) {
        // Cruise forward smoothly when actively steering with touch joystick
        speed = THREE.MathUtils.lerp(speed, -75, delta * 3);
      } else {
        speed = THREE.MathUtils.lerp(speed, 0, delta * (isHandbrake ? 8 : 2));
      }

      // Horizontal Steering: Floating Joystick takes precedence during active touch
      if (isJoystickActiveRef.current) {
        targetXRef.current = analogSteerRef.current * STEERING_CONFIG.MAX_LANE_X;
      } else {
        // Releasing touch joystick smoothly returns steering target to neutral (0)
        if (analogSteerRef.current === 0 && !isSteeringLeft && !isSteeringRight) {
          targetXRef.current = THREE.MathUtils.lerp(targetXRef.current, 0, delta * 4);
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
    <>
      {/* Visual Floating Analog Joystick DOM overlay */}
      <Html fullscreen style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 50 }}>
        <FloatingJoystick
          active={joystickUI.active}
          basePos={joystickUI.basePos}
          knobPos={joystickUI.knobPos}
          radius={STEERING_CONFIG.JOYSTICK_RADIUS}
        />
      </Html>

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
    </>
  );
};
