import React from 'react';
import { Play, Volume2, VolumeX, ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  audioMuted,
  onToggleAudio,
}) => {
  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-between p-8 md:p-12 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/90 backdrop-blur-sm text-white select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
            CYBERDRIVE V2.0 • 3D ENGINE READY
          </span>
        </div>

        <button
          onClick={onToggleAudio}
          className="p-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-xl border border-slate-700/80 transition-all flex items-center space-x-2 text-xs font-mono"
        >
          {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <span>{audioMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </button>
      </div>

      {/* Hero Title & Start Button */}
      <div className="max-w-2xl mx-auto text-center space-y-6 my-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Portfolio Experience</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tight text-white leading-tight">
          DEVEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">RAJPUT</span>
        </h1>

        <p className="text-lg md:text-xl font-rajdhani text-slate-300 font-medium max-w-xl mx-auto">
          Full Stack Engineer & Creative Technologist. Drive through my interactive portfolio inside a futuristic night-time city.
        </p>

        {/* Big Start Engine Button */}
        <div className="pt-4">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black font-orbitron text-lg tracking-widest rounded-2xl shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>START ENGINE</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Legend & Recruiter Note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-6">
        <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
          <div>
            <span className="text-white font-semibold font-orbitron">Drive Controls:</span>
            <p className="text-slate-400">Scroll Down / Up, or use W/S/A/D to drive forward & backward.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <span className="text-white font-semibold">Instant Navigation:</span>
            <p className="text-slate-400">Click any section on the HUD top bar to auto-cruise instantly.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="text-white font-semibold">Recruiter Ready:</span>
            <p className="text-slate-400">Readable HTML/React overlays for easy project evaluation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
