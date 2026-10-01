import React from 'react';

export const MobileOrientationGate: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#050505] text-[#F5F5F5] select-none font-mono">
      {/* Top Status Indicator */}
      <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          <span className="text-xs tracking-widest text-[#8A8A8A] uppercase">
            SYSTEM DETECTED: PORTRAIT
          </span>
        </div>
        <span className="text-xs tracking-widest text-[#00ff66] uppercase font-bold">
          LANDSCAPE MODE REQUIRED
        </span>
      </div>

      {/* Center Phone Rotation Visual & Typography */}
      <div className="my-auto text-center space-y-8 max-w-sm flex flex-col items-center">
        {/* Animated Phone Rotation Widget */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Subtle Outer Neon Pulse Ring */}
          <div
            className="absolute inset-0 rounded-full border border-[#00ff66]/30 animate-ping pointer-events-none"
            style={{ animationDuration: '2.5s' }}
          />
          <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />

          {/* Rotating Phone SVG Illustration */}
          <div className="animate-phone-rotate relative w-16 h-28 border-2 border-[#00ff66] rounded-2xl p-1.5 flex flex-col justify-between items-center bg-[#050505] shadow-xl shadow-[#00ff66]/20">
            {/* Top Speaker Ear-piece */}
            <div className="w-6 h-1 rounded-full bg-[#00ff66]/80" />

            {/* Inner Display Screen */}
            <div className="w-full flex-1 my-1.5 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center space-y-1 overflow-hidden p-1">
              <div className="w-8 h-1 rounded-full bg-[#00ff66]/90 animate-pulse" />
              <div className="w-5 h-0.5 rounded-full bg-white/30" />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-4 h-1 rounded-full bg-white/50" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <span className="text-xs text-[#00ff66] tracking-[0.25em] uppercase block font-bold">
            00 / 07 — ACTION REQUIRED
          </span>

          <h2 className="text-3xl sm:text-4xl font-black font-orbitron tracking-tight text-[#F5F5F5] uppercase">
            ROTATE YOUR DEVICE
          </h2>

          <div className="w-16 h-0.5 bg-[#00ff66] mx-auto opacity-80" />

          <p className="text-xs sm:text-sm text-[#8A8A8A] uppercase tracking-wider leading-relaxed px-2">
            Turn your phone sideways to enter the drive.
          </p>
        </div>
      </div>

      {/* Bottom Technical Footnote */}
      <div className="w-full border-t border-white/10 pt-4 text-center text-[10px] text-[#8A8A8A] uppercase tracking-widest">
        DEVEN: THE DRIVE • LANDSCAPE DISPLAY LOCK ENABLED
      </div>
    </div>
  );
};

export default MobileOrientationGate;
