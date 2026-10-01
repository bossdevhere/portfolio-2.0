import React from 'react';
import { Volume2, VolumeX, Camera, RotateCcw } from 'lucide-react';

interface SoundControlsProps {
  audioMuted: boolean;
  onToggleAudio: () => void;
  cameraMode: 'third-person' | 'hood' | 'top-down';
  onSetCameraMode: (mode: 'third-person' | 'hood' | 'top-down') => void;
  onRestartTrack: () => void;
}

export const SoundControls: React.FC<SoundControlsProps> = ({
  audioMuted,
  onToggleAudio,
  cameraMode,
  onSetCameraMode,
  onRestartTrack,
}) => {
  const cycleCamera = () => {
    if (cameraMode === 'third-person') onSetCameraMode('hood');
    else if (cameraMode === 'hood') onSetCameraMode('top-down');
    else onSetCameraMode('third-person');
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Camera Mode Toggle */}
      <button
        onClick={cycleCamera}
        className="p-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-xl border border-slate-700/80 transition-all flex items-center space-x-2 text-xs font-mono"
        title="Change Camera View"
      >
        <Camera className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline uppercase">{cameraMode}</span>
      </button>

      {/* Restart Track */}
      <button
        onClick={onRestartTrack}
        className="p-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-xl border border-slate-700/80 transition-all text-xs font-mono"
        title="Restart Track to Start"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Audio Mute Button */}
      <button
        onClick={onToggleAudio}
        className="p-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-xl border border-slate-700/80 transition-all text-xs font-mono"
        title="Toggle Audio"
      >
        {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
      </button>
    </div>
  );
};
