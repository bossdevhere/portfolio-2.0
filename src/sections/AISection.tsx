import React from 'react';
import { AI_PROJECTS } from '../data/portfolio';
import { Brain, Cpu } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';

export const AISection: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center space-x-4 border-b border-cyan-500/30 pb-4">
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
          <Brain className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            AI & MACHINE LEARNING
          </h2>
          <p className="text-cyan-400 font-rajdhani text-lg font-medium">
            Intelligent Systems, Neural Networks & Autonomous Agents
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AI_PROJECTS.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md">
                  {item.category}
                </span>
                {item.metrics && (
                  <span className="text-xs text-cyan-300 font-mono flex items-center">
                    <Cpu className="w-3 h-3 mr-1" />
                    {item.metrics}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold font-rajdhani text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-3 border-t border-slate-800/80 mt-2">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
