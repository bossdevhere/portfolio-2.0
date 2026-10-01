import React from 'react';
import { useProgress } from '@react-three/drei';
import { Car } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin flex items-center justify-center" />
        <Car className="w-8 h-8 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
      </div>

      <h1 className="text-2xl font-bold font-orbitron text-white tracking-widest mb-2">
        DEVEN RAJPUT
      </h1>
      <p className="text-cyan-400 font-rajdhani text-sm tracking-wider uppercase mb-6">
        INITIALIZING 3D CYBERDRIVE PORTFOLIO
      </p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-3">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 rounded-full"
          style={{ width: `${Math.min(100, Math.round(progress))}%` }}
        />
      </div>

      <span className="font-mono text-cyan-400 text-xs font-semibold">
        {Math.min(100, Math.round(progress))}% LOADED
      </span>
    </div>
  );
};
