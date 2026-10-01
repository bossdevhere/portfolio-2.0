import React from 'react';

interface FloatingJoystickProps {
  active: boolean;
  basePos: { x: number; y: number };
  knobPos: { x: number; y: number };
  radius?: number;
}

export const FloatingJoystick: React.FC<FloatingJoystickProps> = ({
  active,
  basePos,
  knobPos,
  radius = 45,
}) => {
  if (!active) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-150 select-none"
      style={{
        left: `${basePos.x}px`,
        top: `${basePos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Translucent Joystick Base */}
      <div
        className="relative rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center shadow-2xl"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
      >
        {/* Subtle Neon Pulse Accent Ring */}
        <div className="absolute inset-0 rounded-full border border-[#00ff66]/40 pointer-events-none animate-pulse" />

        {/* Center Neutral Guide Dot */}
        <div className="absolute w-2 h-2 rounded-full bg-white/30 pointer-events-none" />

        {/* Moving Analog Knob */}
        <div
          className="absolute w-10 h-10 rounded-full bg-[#00ff66] shadow-lg shadow-[#00ff66]/60 border border-white/50 flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#050505]/70" />
        </div>
      </div>
    </div>
  );
};
