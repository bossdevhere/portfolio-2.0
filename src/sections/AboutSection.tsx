import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-6 text-[#F5F5F5]">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.2em] uppercase">
            SECTION 01 / 07 — DOSSIER
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            {PERSONAL_INFO.name}
          </h2>
        </div>
        <span className="font-mono text-xs text-[#8A8A8A]">{PERSONAL_INFO.role.toUpperCase()}</span>
      </div>

      <p className="text-sm font-mono text-[#8A8A8A] leading-relaxed">
        {PERSONAL_INFO.bio}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-4 hud-panel border border-white/10 rounded-xl space-y-1">
          <span className="text-[#00ff66] font-bold uppercase block">// 3D WEB GRAPHICS</span>
          <p className="text-[#8A8A8A]">Interactive WebGL, Three.js, R3F & GSAP animations.</p>
        </div>

        <div className="p-4 hud-panel border border-white/10 rounded-xl space-y-1">
          <span className="text-[#00ff66] font-bold uppercase block">// FULL-STACK ARCHITECTURE</span>
          <p className="text-[#8A8A8A]">Modular frontend applications, Node.js & high-scale APIs.</p>
        </div>

        <div className="p-4 hud-panel border border-white/10 rounded-xl space-y-1">
          <span className="text-[#00ff66] font-bold uppercase block">// CREATIVE TECH</span>
          <p className="text-[#8A8A8A]">Blending gaming mechanics with web application workflows.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#8A8A8A]">
          <MapPin className="w-3.5 h-3.5 text-[#00ff66]" />
          <span>{PERSONAL_INFO.location.toUpperCase()}</span>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded-lg transition-all"
          >
            <GithubIcon className="w-4 h-4 text-[#00ff66]" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded-lg transition-all"
          >
            <LinkedinIcon className="w-4 h-4 text-[#00ff66]" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00ff66] text-[#050505] font-bold rounded-lg transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL</span>
          </a>
        </div>
      </div>
    </div>
  );
};
