import React, { useRef } from 'react';
import { Power, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleStartEngine = () => {
    // Engine start GSAP animation
    if (buttonRef.current && containerRef.current) {
      gsap.timeline()
        .to(buttonRef.current, {
          scale: 0.95,
          backgroundColor: '#00ff66',
          color: '#050505',
          duration: 0.15,
        })
        .to(containerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: onStart,
        });
    } else {
      onStart();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex flex-col justify-between p-8 md:p-14 bg-gradient-to-b from-[#050505]/95 via-[#050505]/80 to-[#050505]/95 backdrop-blur-md text-[#F5F5F5] select-none"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-[#8A8A8A] uppercase">
            DEVEN / SYSTEM READY
          </span>
        </div>

        <button
          onClick={onToggleAudio}
          className="p-2.5 bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-[#00ff66] rounded-lg border border-white/10 transition-all flex items-center space-x-2 text-xs font-mono cursor-pointer"
        >
          {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00ff66]" />}
          <span>{audioMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
        </button>
      </div>

      {/* Main Center Content */}
      <div className="max-w-xl mx-auto text-center space-y-8 my-auto">
        <div className="space-y-3">
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.3em] uppercase block">
            01 / 07 — THE DRIVE
          </span>

          <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tight text-[#F5F5F5] uppercase">
            DEVEN RAJPUT
          </h1>

          <div className="w-24 h-0.5 bg-[#00ff66] mx-auto opacity-80" />

          <p className="text-sm md:text-base font-mono text-[#8A8A8A] uppercase tracking-wider">
            FULL STACK DEVELOPER & CREATIVE TECHNOLOGIST
          </p>
        </div>

        {/* Start Engine Button */}
        <div className="pt-2">
          <button
            ref={buttonRef}
            onClick={handleStartEngine}
            className="group relative inline-flex items-center space-x-3 px-10 py-5 bg-[#050505] border-2 border-[#00ff66] text-[#00ff66] font-black font-orbitron text-base tracking-[0.2em] rounded-xl hover:bg-[#00ff66] hover:text-[#050505] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#00ff66]/10 cursor-pointer"
          >
            <Power className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>START ENGINE</span>
          </button>
        </div>
      </div>

      {/* Bottom Technical Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#8A8A8A] border-t border-white/10 pt-4 gap-4">
        <div>
          <span className="text-[#F5F5F5]">DRIVE:</span> SCROLL DOWN / UP OR W/S/A/D
        </div>
        <div>
          <span className="text-[#F5F5F5]">STATUS:</span> LAUNCH PAD • GAMEPLAY FROZEN UNTIL IGNITION
        </div>
        <div>
          <span className="text-[#00ff66]">MODE:</span> INTERACTIVE PORTFOLIO
        </div>
      </div>
    </div>
  );
};
