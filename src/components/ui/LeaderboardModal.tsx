import React from 'react';
import { ScoreEntry } from '../../types';
import { Trophy, X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto select-none">
      <div className="relative w-full max-w-md hud-panel rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-[#F5F5F5] rounded border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-[#00ff66]" />
          <div>
            <h2 className="text-xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wide">
              LEADERBOARD
            </h2>
            <span className="font-mono text-xs text-[#8A8A8A]">TOP SCORES RECORDED</span>
          </div>
        </div>

        {/* High Score Banner */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between font-mono">
          <span className="text-xs text-[#8A8A8A]">YOUR HIGH SCORE</span>
          <span className="text-xl font-bold font-orbitron text-[#00ff66]">
            {highScore.toLocaleString()} PTS
          </span>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2 font-mono text-xs">
          {leaderboard.map((entry, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-center justify-between ${
                idx === 0
                  ? 'bg-[#00ff66]/10 border-[#00ff66]/40 text-[#00ff66] font-bold'
                  : 'bg-white/5 border-white/5 text-[#F5F5F5]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 font-mono text-center text-[#8A8A8A]">
                  #{idx + 1}
                </span>
                <span>{entry.name.toUpperCase()}</span>
              </div>
              <span className="font-orbitron font-bold">
                {entry.score.toLocaleString()} PTS
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
