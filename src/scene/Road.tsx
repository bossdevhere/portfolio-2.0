import React from 'react';
import { SECTION_WAYPOINTS } from '../data/portfolio';
import { SectionId } from '../types';

interface RoadProps {
  currentSection: SectionId;
  onSelectSection: (sectionId: SectionId) => void;
}

export const Road: React.FC<RoadProps> = ({ currentSection, onSelectSection }) => {
  const ROAD_WIDTH = 14;
  const ROAD_LENGTH = 700; // Covers Z from +30 to -670

  return (
    <group position={[0, 0, 0]}>
      {/* Main Asphalt Road Plane */}
      <mesh receiveShadow position={[0, -0.01, -320]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROAD_WIDTH, ROAD_LENGTH]} />
        <meshStandardMaterial
          color="#0a0d18"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Cyber Grid Lines on Road */}
      <gridHelper
        args={[ROAD_LENGTH, 140, '#00f0ff', '#002b4d']}
        position={[0, 0.01, -320]}
        rotation={[0, 0, 0]}
      />

      {/* Left Neon Guardrail Strip */}
      <mesh position={[-ROAD_WIDTH / 2 - 0.2, 0.2, -320]}>
        <boxGeometry args={[0.3, 0.4, ROAD_LENGTH]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <pointLight position={[-ROAD_WIDTH / 2, 0.5, -320]} color="#00f0ff" intensity={1.5} distance={15} />

      {/* Right Neon Guardrail Strip */}
      <mesh position={[ROAD_WIDTH / 2 + 0.2, 0.2, -320]}>
        <boxGeometry args={[0.3, 0.4, ROAD_LENGTH]} />
        <meshBasicMaterial color="#7000ff" />
      </mesh>
      <pointLight position={[ROAD_WIDTH / 2, 0.5, -320]} color="#7000ff" intensity={1.5} distance={15} />

      {/* Center Dashed Yellow/Cyan Lane Lines */}
      {Array.from({ length: 70 }).map((_, i) => (
        <mesh key={i} position={[0, 0.02, 20 - i * 10]}>
          <boxGeometry args={[0.25, 0.01, 4]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#ff00aa'} />
        </mesh>
      ))}

      {/* Section Checkpoint Gantries & Holographic Displays */}
      {SECTION_WAYPOINTS.map((waypoint) => {
        const isActive = currentSection === waypoint.id;
        const color = waypoint.color || '#00f0ff';

        return (
          <group key={waypoint.id} position={[0, 0, waypoint.zPosition]}>
            {/* Holographic Ground Checkpoint Ring */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.03, 0]}
              onClick={() => onSelectSection(waypoint.id)}
            >
              <ringGeometry args={[4, 5.5, 32]} />
              <meshBasicMaterial
                color={color}
                side={2}
                transparent
                opacity={isActive ? 0.8 : 0.4}
              />
            </mesh>

            {/* Futuristic Overhead Arch / Gantry Structures */}
            <group position={[0, 0, 0]}>
              {/* Left Arch Pillar */}
              <mesh position={[-ROAD_WIDTH / 2 - 0.5, 3.5, 0]}>
                <boxGeometry args={[0.6, 7, 0.6]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[-ROAD_WIDTH / 2 - 0.5, 3.5, 0]}>
                <boxGeometry args={[0.7, 7.1, 0.1]} />
                <meshBasicMaterial color={color} />
              </mesh>

              {/* Right Arch Pillar */}
              <mesh position={[ROAD_WIDTH / 2 + 0.5, 3.5, 0]}>
                <boxGeometry args={[0.6, 7, 0.6]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh position={[ROAD_WIDTH / 2 + 0.5, 3.5, 0]}>
                <boxGeometry args={[0.7, 7.1, 0.1]} />
                <meshBasicMaterial color={color} />
              </mesh>

              {/* Overhead Bridge Beam */}
              <mesh position={[0, 6.8, 0]}>
                <boxGeometry args={[ROAD_WIDTH + 2, 0.8, 0.8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
              </mesh>

              {/* Glowing Banner Sign on Gantry */}
              <mesh position={[0, 7.5, 0]}>
                <boxGeometry args={[10, 1.6, 0.1]} />
                <meshBasicMaterial color="#030712" />
              </mesh>
              <mesh position={[0, 7.5, 0.06]}>
                <planeGeometry args={[9.8, 1.4]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={isActive ? 0.9 : 0.6}
                />
              </mesh>

              {/* Gantry Spotlights pointing down */}
              <pointLight position={[0, 6.5, 0]} color={color} intensity={isActive ? 6 : 3} distance={12} />
            </group>

            {/* Floating Holographic Icon Orbs on Sides */}
            <mesh position={[-ROAD_WIDTH / 2 - 3, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
              <octahedronGeometry args={[0.9]} />
              <meshBasicMaterial color={color} wireframe />
            </mesh>
            <mesh position={[ROAD_WIDTH / 2 + 3, 2.5, 0]} rotation={[0, -Math.PI / 4, 0]}>
              <octahedronGeometry args={[0.9]} />
              <meshBasicMaterial color={color} wireframe />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
