import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { Car, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const { progress } = useProgress();
  const [fakeProgress, setFakeProgress] = useState(0);

  useEffect(() => {
    // Smooth progress timer to give WebGL shaders time to compile smoothly
    const interval = setInterval(() => {
      setFakeProgress((prev) => {
        const target = Math.max(prev + 5, progress);
        if (target >= 100) {
          clearInterval(interval);
          if (onLoaded) setTimeout(onLoaded, 300);
          return 100;
        }
        return target;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [progress, onLoaded]);

  const displayProgress = Math.min(100, Math.round(fakeProgress));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-white select-none">
      {/* Outer Glowing Hexagon Spinner */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 border-r-purple-500 animate-spin flex items-center justify-center shadow-2xl shadow-cyan-500/20" />
        <Car className="w-10 h-10 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
      </div>

      {/* Cyber Title */}
      <h1 className="text-2xl font-black font-orbitron text-white tracking-widest mb-1">
        DEVEN RAJPUT
      </h1>
      <p className="text-cyan-400 font-rajdhani text-sm tracking-widest uppercase mb-6 flex items-center space-x-2">
        <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
        <span>PRE-COMPILING SHADERS & 3D ASSETS</span>
      </p>

      {/* Progress Bar Container */}
      <div className="w-72 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-3 p-0.5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 transition-all duration-150 rounded-full shadow-lg shadow-cyan-500/50"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      <div className="flex items-center space-x-4 font-mono text-xs">
        <span className="text-slate-400">STATUS: OPTIMIZING SHADERS</span>
        <span className="text-cyan-400 font-bold">{displayProgress}%</span>
      </div>
    </div>
  );
};
