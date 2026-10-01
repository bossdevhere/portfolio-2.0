import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Bvh } from '@react-three/drei';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { Road } from './Road';
import { Car } from './Car';
import { CameraController } from './CameraController';
import { Obstacles } from './Obstacles';
import { SectionId } from '../types';

interface WorldProps {
  currentSection: SectionId;
  targetZPosition: number;
  isAutoDriving: boolean;
  onUpdateCarState: (pos: [number, number, number], rotation: number, speed: number) => void;
  onSelectSection: (sectionId: SectionId) => void;
  audioMuted: boolean;
  cameraMode: 'third-person' | 'hood' | 'top-down';
  onCollision: () => void;
  onScorePass: (points: number, label: string) => void;
  hasStarted: boolean;
  hasFinished: boolean;
  carPosition: [number, number, number];
  carSpeed: number;
  hasCrashed: boolean;
}

export const World: React.FC<WorldProps> = ({
  currentSection,
  targetZPosition,
  isAutoDriving,
  onUpdateCarState,
  onSelectSection,
  audioMuted,
  cameraMode,
  onCollision,
  onScorePass,
  hasStarted,
  hasFinished,
  carPosition,
  carSpeed,
  hasCrashed,
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
              position={carPosition}
              targetZ={targetZPosition}
              isAutoDriving={isAutoDriving}
              onUpdateState={onUpdateCarState}
              audioMuted={audioMuted}
              hasStarted={hasStarted}
              hasFinished={hasFinished}
            />
            <Obstacles
              playerPos={carPosition}
              carSpeed={carSpeed}
              onCollision={onCollision}
              onScorePass={onScorePass}
              isGameActive={hasStarted && !hasFinished}
              hasCrashed={hasCrashed}
            />
            <CameraController
              carPosition={carPosition}
              carRotation={0}
              carSpeed={carSpeed}
              cameraMode={cameraMode}
              hasCrashed={hasCrashed}
            />
          </Suspense>
        </Bvh>
      </Canvas>
    </div>
  );
};
