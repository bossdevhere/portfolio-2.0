import React from 'react';
import { ScoreEntry } from '../../types';
import { Trophy, Medal, X, Flame } from 'lucide-react';

interface LeaderboardModalProps {
  leaderboard: ScoreEntry[];
  highScore: number;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  leaderboard,
  highScore,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto">
      <div className="relative w-full max-w-md glass-panel-purple rounded-3xl p-6 md:p-8 border border-cyan-500/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700/80 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-orbitron text-white tracking-wide">
              CYBER LEADERBOARD
            </h2>
            <p className="text-xs text-amber-400 font-rajdhani font-medium">
              Top Cyberdrive Records & High Scores
            </p>
          </div>
        </div>

        {/* Personal Best High Score Banner */}
        <div className="p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-2xl mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono text-slate-300">YOUR HIGH SCORE</span>
          </div>
          <span className="text-xl font-bold font-orbitron text-amber-400">
            {highScore} PTS
          </span>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2.5">
          {leaderboard.map((entry, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                idx === 0
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                  : idx === 1
                  ? 'bg-slate-300/10 border-slate-400/30 text-slate-200 font-semibold'
                  : idx === 2
                  ? 'bg-amber-700/10 border-amber-700/30 text-amber-400 font-semibold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 font-mono text-sm text-center">
                  {idx === 0 ? <Medal className="w-5 h-5 text-amber-400 inline" /> : `#${idx + 1}`}
                </span>
                <span className="font-rajdhani text-base">{entry.name}</span>
              </div>
              <span className="font-orbitron font-bold text-sm">
                {entry.score} PTS
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
