import React from 'react';
import { PROJECTS_DATA } from '../data/portfolio';
import { ExternalLink, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';

export const ProjectsSection: React.FC = () => {
  return (
    <div className="space-y-6 text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.2em] uppercase">
            SECTION 04 / 07 — MISSION BRIEFING
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            FEATURED PROJECTS
          </h2>
        </div>
        <Terminal className="w-6 h-6 text-[#00ff66]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS_DATA.map((project, idx) => (
          <div
            key={project.id}
            className="hud-panel p-5 rounded-xl border border-white/10 hover:border-[#00ff66]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#8A8A8A]">
                <span>PROJECT {String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[#00ff66]">{project.category.toUpperCase()}</span>
              </div>

              <h3 className="text-xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wide">
                {project.title}
              </h3>

              <div className="hud-line" />

              <p className="text-xs text-[#8A8A8A] font-mono leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 bg-white/5 text-[#F5F5F5] border border-white/10 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 text-xs font-mono">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-[#8A8A8A] hover:text-[#00ff66] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>SOURCE CODE</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-[#00ff66] hover:underline font-bold ml-auto"
                >
                  <span>VIEW PROJECT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
