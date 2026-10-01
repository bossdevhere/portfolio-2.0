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
    <>
      {/* BOTTOM-LEFT: FORWARD (↑) & BACKWARD (↓) CONTROLS */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto select-none font-mono">
        <div className="flex flex-col items-center gap-2 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl">
          {/* UP BUTTON (ACCELERATE / FORWARD) */}
          <button
            {...bindPointerEvents('up')}
            aria-label="Forward Accelerate"
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
          >
            <ChevronUp className="w-7 h-7" />
          </button>

          {/* DOWN BUTTON (BACKWARD / BRAKE) */}
          <button
            {...bindPointerEvents('down')}
            aria-label="Backward Brake"
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
          >
            <ChevronDown className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* BOTTOM-RIGHT: STEER LEFT (←) & STEER RIGHT (→) CONTROLS */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto select-none font-mono">
        <div className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl">
          {/* LEFT BUTTON (STEER LEFT) */}
          <button
            {...bindPointerEvents('left')}
            aria-label="Steer Left"
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* RIGHT BUTTON (STEER RIGHT) */}
          <button
            {...bindPointerEvents('right')}
            aria-label="Steer Right"
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/15 active:bg-[#00ff66]/30 active:border-[#00ff66] border border-white/15 text-[#F5F5F5] active:text-[#00ff66] flex items-center justify-center transition-all touch-none cursor-pointer"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileControls;
