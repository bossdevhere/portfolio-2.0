import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface PauseModalProps {
  onResume: () => void;
  onRestart: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({ onResume, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050505]/90 backdrop-blur-md text-[#F5F5F5] select-none font-mono">
      <div className="max-w-md w-full p-8 bg-black/80 border border-white/10 rounded-2xl shadow-2xl text-center space-y-6">
        {/* Top Header Tag */}
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="text-xs text-[#00ff66] tracking-[0.25em] uppercase font-bold">
              SYSTEM PAUSED
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-orbitron tracking-tight text-[#F5F5F5] uppercase">
            GAME PAUSED
          </h2>

          <div className="w-16 h-0.5 bg-[#00ff66] mx-auto opacity-80" />
        </div>

        {/* Modal Buttons */}
        <div className="flex flex-col space-y-3 pt-2">
          <button
            onClick={onResume}
            className="w-full py-4 px-6 bg-[#00ff66] text-[#050505] font-black font-orbitron text-sm tracking-[0.15em] rounded-xl hover:bg-[#00ff66]/90 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-[#00ff66]/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RESUME ENGINE</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3.5 px-6 bg-white/5 hover:bg-white/10 border border-white/15 text-[#8A8A8A] hover:text-[#00ff66] font-orbitron text-xs tracking-[0.15em] rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESTART TRACK</span>
          </button>
        </div>

        {/* ESC Key Hint for Desktop */}
        <div className="text-[10px] text-[#8A8A8A] uppercase tracking-widest pt-2 border-t border-white/10">
          PRESS <span className="text-[#F5F5F5]">ESC</span> OR TAP RESUME TO CONTINUE
        </div>
      </div>
    </div>
  );
};

export default PauseModal;
