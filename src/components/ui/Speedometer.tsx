import React from 'react';

interface SpeedometerProps {
  speed: number;
  isAutoDriving: boolean;
}

export const Speedometer: React.FC<SpeedometerProps> = ({ speed, isAutoDriving }) => {
  // Determine simulated gear
  const gear = speed === 0 ? 'P' : isAutoDriving ? 'D' : speed > 0 ? 'D' : 'R';
  const rpmPercent = Math.min(100, Math.round((speed / 120) * 100));

  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center space-x-4 select-none border border-cyan-500/30">
      {/* Gear Badge */}
      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
        <span className="font-orbitron font-black text-2xl text-cyan-400">
          {gear}
        </span>
      </div>

      {/* Digital Speed Reading */}
      <div>
        <div className="flex items-baseline space-x-1">
          <span className="font-orbitron font-black text-3xl text-white tracking-tight">
            {speed}
          </span>
          <span className="font-mono text-xs text-cyan-400 font-bold">KM/H</span>
        </div>

        {/* RPM Bar */}
        <div className="w-28 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-1">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 transition-all duration-150"
            style={{ width: `${rpmPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
