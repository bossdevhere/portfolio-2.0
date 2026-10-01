import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  carPosition: [number, number, number];
  carRotation: number;
  carSpeed: number;
  cameraMode: 'third-person' | 'hood' | 'top-down';
  hasCrashed?: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  carPosition,
  carSpeed,
  cameraMode,
  hasCrashed = false,
}) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const [x, y, z] = carPosition;

    if (cameraMode === 'hood') {
      // Hood / Cockpit Driver View
      targetCamPos.current.set(x, y + 0.8, z - 0.5);
      targetLookAt.current.set(x, y + 0.8, z - 20);
    } else if (cameraMode === 'top-down') {
      // Satellite / Top-down Tactical View
      targetCamPos.current.set(x, y + 25, z + 5);
      targetLookAt.current.set(x, y, z - 10);
    } else {
      // Default: Cinematic Third-Person Chase Cam
      const speedOffset = (carSpeed / 100) * 2;
      targetCamPos.current.set(
        x * 0.4,
        y + 3.2,
        z + 8.5 + speedOffset
      );
      targetLookAt.current.set(x * 0.2, y + 1.2, z - 15);
    }

    // Apply subtle 3D camera shake during collision (does NOT affect HUD)
    if (hasCrashed) {
      targetCamPos.current.x += (Math.random() - 0.5) * 0.3;
      targetCamPos.current.y += (Math.random() - 0.5) * 0.3;
    }

    // Smooth Lerp Camera Position
    camera.position.lerp(targetCamPos.current, delta * 5);

    // Smooth Lerp Camera LookAt Target
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const lookTarget = targetLookAt.current.clone().sub(camera.position).normalize();
    currentLookAt.lerp(lookTarget, delta * 6);
    camera.lookAt(
      camera.position.x + currentLookAt.x * 20,
      camera.position.y + currentLookAt.y * 20,
      camera.position.z + currentLookAt.z * 20
    );

    // Dynamic FOV Speed Warp Effect
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = 60 + (carSpeed / 120) * 15;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 4);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
