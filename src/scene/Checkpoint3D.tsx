import React from 'react';
import { Html } from '@react-three/drei';

interface Checkpoint3DProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  side: 'left' | 'right';
  position: [number, number, number]; // [x, y, z]
  carZ: number;
  children: React.ReactNode;
}

export const Checkpoint3D: React.FC<Checkpoint3DProps> = ({
  number,
  title,
  subtitle,
  side,
  position,
  carZ,
  children,
}) => {
  const [x, y, z] = position;
  const distZ = carZ - z; // positive when car is in front of sign, negative when past

  // Sign starts becoming visible 60m before reaching, stays visible while passing, fades 60m after
  const absDist = Math.abs(distZ);
  if (absDist > 65) return null;

  // Calculate smooth distance-based opacity
  const opacity = Math.max(0, Math.min(1, (65 - absDist) / 15));

  const isLeft = side === 'left';
  const rotationY = isLeft ? 0.35 : -0.35; // Angle slightly toward road

  return (
    <group position={[x, y, z]} rotation={[0, rotationY, 0]}>
      {/* 3D Roadside Mounting Post / Pillar */}
      <mesh position={[0, -y / 2, 0]}>
        <cylinderGeometry args={[0.12, 0.18, y, 16]} />
        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Post Neon Accent Rail */}
      <mesh position={[0, -y / 2, 0]}>
        <cylinderGeometry args={[0.14, 0.14, y, 8]} />
        <meshBasicMaterial color="#00ff66" wireframe />
      </mesh>

      {/* Sign Frame Box */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[7.2, 5.2, 0.1]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Outer Neon Border */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[7.3, 5.3]} />
        <meshBasicMaterial color="#00ff66" wireframe />
      </mesh>

      {/* 3D World-Space HTML Sign Content */}
      <Html
        transform
        distanceFactor={12}
        position={[0, 0, 0.06]}
        style={{
          opacity,
          transition: 'opacity 0.2s ease-out',
          pointerEvents: opacity > 0.3 ? 'auto' : 'none',
        }}
      >
        <div className="w-[520px] hud-panel p-6 rounded-xl border border-[#00ff66]/30 shadow-2xl text-[#F5F5F5] font-mono select-none">
          {/* Sign Top Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <span className="font-orbitron font-bold text-xs text-[#00ff66] tracking-[0.2em]">
              {number}
            </span>
            <span className="text-[10px] text-[#8A8A8A] uppercase">
              // {side.toUpperCase()} ROADSIDE SIGN
            </span>
          </div>

          <h2 className="font-orbitron font-black text-2xl text-[#F5F5F5] tracking-wider uppercase mb-1">
            {title}
          </h2>

          {subtitle && (
            <p className="text-xs text-[#00ff66] font-semibold tracking-wide uppercase mb-3">
              {subtitle}
            </p>
          )}

          <div className="hud-line-green mb-3" />

          {/* Custom Section Content */}
          <div className="space-y-3">{children}</div>
        </div>
      </Html>
    </group>
  );
};
