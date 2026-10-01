import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <group>
      {/* Dark Ambient Lighting */}
      <ambientLight color="#0c1222" intensity={1.5} />

      {/* Cyber Blue Moonlight Directional Light */}
      <directionalLight
        position={[20, 40, 10]}
        color="#00d2ff"
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0005}
      />

      {/* Purple Fill Hemisphere Light */}
      <hemisphereLight
        args={['#00f0ff', '#1a0033', 0.8]}
      />
    </group>
  );
};
