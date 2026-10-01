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
            SECTION 01 / 06 — DOSSIER
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            {PERSONAL_INFO.name}
          </h2>
        </div>
        <span className="font-mono text-xs text-[#8A8A8A]">{PERSONAL_INFO.role.toUpperCase()}</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <p className="text-[#F5F5F5] text-sm leading-relaxed">
          "{PERSONAL_INFO.introduction}"
        </p>

        <p className="text-[#8A8A8A] leading-relaxed">
          {PERSONAL_INFO.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
        {PERSONAL_INFO.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 bg-white/5 text-[#00ff66] border border-white/10 rounded"
          >
            #{tag}
          </span>
        ))}
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
            className="flex items-center space-x-2 px-4 py-2 bg-[#00ff66] text-[#050505] font-bold rounded-lg transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL</span>
          </a>
        </div>
      </div>
    </div>
  );
};
