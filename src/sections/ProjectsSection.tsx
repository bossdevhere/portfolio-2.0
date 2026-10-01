import React from 'react';
import { PROJECTS_DATA } from '../data/portfolio';
import { Code, ExternalLink, Zap } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';

export const ProjectsSection: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center space-x-4 border-b border-emerald-500/30 pb-4">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
          <Code className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            FEATURED PROJECTS
          </h2>
          <p className="text-emerald-400 font-rajdhani text-lg font-medium">
            Full-Stack Systems & 3D Interactive Web Apps
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                  {project.category}
                </span>
                {project.metrics && (
                  <span className="text-xs text-slate-400 flex items-center font-mono">
                    <Zap className="w-3 h-3 text-amber-400 mr-1" />
                    {project.metrics}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold font-rajdhani text-white group-hover:text-emerald-300 transition-colors mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-3 border-t border-slate-800/80 mt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-emerald-400 hover:underline font-semibold ml-auto"
                >
                  <span>Live Launch</span>
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
