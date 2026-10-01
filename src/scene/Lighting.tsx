import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <group>
      {/* Dark Ambient Ambient Lighting */}
      <ambientLight color="#0c1222" intensity={1.2} />

      {/* Cyber Blue Moonlight Directional Light */}
      <directionalLight
        position={[30, 50, 20]}
        color="#00d2ff"
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Purple Fill Hemisphere Light */}
      <hemisphereLight
        args={['#00f0ff', '#1a0033', 0.8]}
      />
    </group>
  );
};
