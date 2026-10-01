import React, { useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export interface MobileInputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

interface MobileControlsProps {
  mobileInputRef: React.RefObject<MobileInputState | null>;
  isGameActive: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  mobileInputRef,
  isGameActive,
}) => {
  // Reset all input states when game becomes inactive or unmounts
  useEffect(() => {
    if (!isGameActive && mobileInputRef.current) {
      mobileInputRef.current.up = false;
      mobileInputRef.current.down = false;
      mobileInputRef.current.left = false;
      mobileInputRef.current.right = false;
    }
  }, [isGameActive, mobileInputRef]);

  if (!isGameActive) return null;

  const setInput = (key: keyof MobileInputState, value: boolean) => {
    if (mobileInputRef.current) {
      mobileInputRef.current[key] = value;
    }
  };

  const bindPointerEvents = (key: keyof MobileInputState) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      setInput(key, true);
    },
    onPointerUp: (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      setInput(key, false);
    },
    onPointerCancel: (e: React.PointerEvent) => {
      e.preventDefault();
      setInput(key, false);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      setInput(key, false);
    },
  });

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto select-none font-mono">
      {/* Minimal Translucent D-Pad Layout */}
      <div className="flex flex-col items-center gap-1.5 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl">
        {/* UP BUTTON (ACCELERATE) */}
        <button
          {...bindPointerEvents('up')}
          aria-label="Accelerate"
          className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {/* LEFT / RIGHT ROW */}
        <div className="flex items-center gap-1.5">
          <button
            {...bindPointerEvents('left')}
            aria-label="Steer Left"
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            {...bindPointerEvents('right')}
            aria-label="Steer Right"
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* DOWN BUTTON (BRAKE / REVERSE) */}
        <button
          {...bindPointerEvents('down')}
          aria-label="Brake"
          className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
