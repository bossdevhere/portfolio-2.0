import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  carPosition: [number, number, number];
  carRotation: number;
  carSpeed: number;
  cameraMode: 'third-person' | 'hood' | 'top-down';
}

export const CameraController: React.FC<CameraControllerProps> = ({
  carPosition,
  carSpeed,
  cameraMode,
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
      // As car speeds up, camera pulls back slightly and lowers
      const speedOffset = (carSpeed / 100) * 2;
      targetCamPos.current.set(
        x * 0.4, // Slight lateral lag for cinematic feel
        y + 3.2,
        z + 8.5 + speedOffset
      );
      targetLookAt.current.set(x * 0.2, y + 1.2, z - 15);
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
      const targetFov = 60 + (carSpeed / 120) * 15; // Warp up to 75 FOV at max speed
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 4);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
