import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Bvh } from '@react-three/drei';
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
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.5, 8.5], fov: 60, near: 0.1, far: 300 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: true,
        }}
      >
        <AdaptiveDpr pixelated />
        <Bvh firstHitOnly>
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
        </Bvh>
      </Canvas>
    </div>
  );
};
