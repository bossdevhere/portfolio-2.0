import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { Mail, RotateCcw, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

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
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6 pointer-events-auto select-none">
      <div className="relative w-full max-w-2xl hud-panel p-8 md:p-12 text-center rounded-2xl space-y-8">
        <div className="space-y-3">
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.3em] uppercase block">
            07 / 07 — FINAL DESTINATION
          </span>

          <h1 className="text-3xl md:text-5xl font-black font-orbitron text-[#F5F5F5] tracking-tight uppercase">
            THE ROAD ENDS HERE.
          </h1>

          <div className="w-16 h-0.5 bg-[#00ff66] mx-auto opacity-80" />

          <p className="text-lg md:text-xl font-rajdhani font-semibold text-[#8A8A8A] tracking-wider uppercase">
            LET'S BUILD SOMETHING GREAT.
          </p>
        </div>

        {/* Final Stats Grid */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10 font-mono">
          <div>
            <span className="text-[10px] text-[#8A8A8A] uppercase block">FINAL SCORE</span>
            <span className="text-xl md:text-2xl font-bold text-[#00ff66] font-orbitron">
              {score.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#8A8A8A] uppercase block">DISTANCE</span>
            <span className="text-xl md:text-2xl font-bold text-[#F5F5F5] font-orbitron">
              4.8 KM
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#8A8A8A] uppercase block">PROJECTS EXPLORED</span>
            <span className="text-xl md:text-2xl font-bold text-[#F5F5F5] font-orbitron">
              07
            </span>
          </div>
        </div>

        {/* Social / Contact Direct Links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded-xl text-xs font-mono transition-all"
          >
            <GithubIcon className="w-4 h-4 text-[#00ff66]" />
            <span>GITHUB</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded-xl text-xs font-mono transition-all"
          >
            <LinkedinIcon className="w-4 h-4 text-[#00ff66]" />
            <span>LINKEDIN</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center space-x-2 px-5 py-3 bg-[#00ff66] text-[#050505] font-bold rounded-xl text-xs font-mono hover:bg-[#00ff66]/90 transition-all shadow-lg shadow-[#00ff66]/10"
          >
            <Mail className="w-4 h-4" />
            <span>GET IN TOUCH</span>
          </a>

          <a
            href={PERSONAL_INFO.resumeUrl}
            download
            className="flex items-center space-x-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded-xl text-xs font-mono transition-all"
          >
            <FileText className="w-4 h-4 text-[#00ff66]" />
            <span>RESUME PDF</span>
          </a>
        </div>

        {/* Restart Button */}
        <div className="pt-2">
          <button
            onClick={onPlayAgain}
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#8A8A8A] hover:text-[#00ff66] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART JOURNEY TO LAUNCH PAD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
