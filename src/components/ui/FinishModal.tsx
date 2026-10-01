import React from 'react';
import { Trophy, Play, Sparkles, Award } from 'lucide-react';

interface FinishModalProps {
  score: number;
  highScore: number;
  onPlayAgain: () => void;
}

export const FinishModal: React.FC<FinishModalProps> = ({
  score,
  highScore,
  onPlayAgain,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 pointer-events-auto">
      <div className="relative w-full max-w-lg glass-panel-purple rounded-3xl p-8 text-center border border-cyan-500/40 shadow-2xl space-y-6">
        {/* Glowing Trophy Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping" />
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/40">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Victory Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CIRCUIT COMPLETED</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black font-orbitron text-white tracking-wide">
            WELL DONE!
          </h2>

          <p className="text-cyan-400 font-rajdhani text-lg font-semibold">
            YOU REACHED THE FINISH LINE & EXPLORED THE PORTFOLIO!
          </p>
        </div>

        {/* Score Card */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div>
            <span className="text-xs font-mono text-slate-400">FINAL SCORE</span>
            <p className="text-2xl font-bold font-orbitron text-cyan-400">{score} PTS</p>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400">HIGH SCORE</span>
            <p className="text-2xl font-bold font-orbitron text-amber-400">{highScore} PTS</p>
          </div>
        </div>

        {/* Big Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black font-orbitron text-base tracking-widest rounded-2xl shadow-xl shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>PLAY AGAIN</span>
        </button>
      </div>
    </div>
  );
};
