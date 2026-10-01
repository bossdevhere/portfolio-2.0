import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { Road } from './Road';
import { Car } from './Car';
import { CameraController } from './CameraController';
import { SectionId } from '../types';

interface WorldProps {
  currentSection: SectionId;
  targetZPosition: number;
  isAutoDriving: boolean;
  onUpdateCarState: (pos: [number, number, number], rotation: number, speed: number) => void;
  onSelectSection: (sectionId: SectionId) => void;
  audioMuted: boolean;
  cameraMode: 'third-person' | 'hood' | 'top-down';
}

export const World: React.FC<WorldProps> = ({
  currentSection,
  targetZPosition,
  isAutoDriving,
  onUpdateCarState,
  onSelectSection,
  audioMuted,
  cameraMode,
}) => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 8.5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Environment />
          <Road currentSection={currentSection} onSelectSection={onSelectSection} />
          <Car
            position={[0, 0.35, 0]}
            targetZ={targetZPosition}
            isAutoDriving={isAutoDriving}
            onUpdateState={onUpdateCarState}
            audioMuted={audioMuted}
          />
          <CameraController
            carPosition={[0, 0.35, targetZPosition]}
            carRotation={0}
            carSpeed={0}
            cameraMode={cameraMode}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
