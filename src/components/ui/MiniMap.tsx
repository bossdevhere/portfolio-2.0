import React from 'react';
import { SECTION_WAYPOINTS } from '../../data/portfolio';
import { SectionId } from '../../types';

interface MiniMapProps {
  carZ: number;
  currentSection: SectionId;
}

export const MiniMap: React.FC<MiniMapProps> = ({ carZ, currentSection }) => {
  // Track starts at Z = 0, ends at Z = -600 (total track length 600m)
  const trackLength = 600;
  const progressPercent = Math.min(100, Math.max(0, (-carZ / trackLength) * 100));

  return (
    <div className="glass-panel p-3 rounded-2xl border border-cyan-500/20 select-none hidden md:block">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
          CIRCUIT RADAR
        </span>
        <span className="font-mono text-[10px] text-slate-400">
          {Math.round(progressPercent)}%
        </span>
      </div>

      {/* Vertical Track Progress Bar */}
      <div className="relative w-28 h-32 bg-slate-950/80 rounded-xl border border-slate-800 p-2 flex flex-col justify-between items-center">
        {/* Track Line */}
        <div className="absolute top-3 bottom-3 w-1 bg-slate-800 rounded-full" />

        {/* Waypoint Dots */}
        {SECTION_WAYPOINTS.map((w) => {
          const topPercent = (Math.abs(w.zPosition) / trackLength) * 80 + 10;
          const isActive = currentSection === w.id;

          return (
            <div
              key={w.id}
              style={{ top: `${topPercent}%` }}
              className={`absolute w-2.5 h-2.5 rounded-full transform -translate-x-1/2 left-1/2 transition-all ${
                isActive ? 'bg-cyan-400 ring-4 ring-cyan-500/30 scale-125' : 'bg-slate-700'
              }`}
            />
          );
        })}

        {/* Car Indicator Blip */}
        <div
          style={{ top: `${(Math.abs(carZ) / trackLength) * 80 + 10}%` }}
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg shadow-cyan-400/80 animate-pulse border-2 border-white z-10"
        />
      </div>
    </div>
  );
};
