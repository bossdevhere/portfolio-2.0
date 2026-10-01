import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolio';
import { Cpu } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center space-x-4 border-b border-amber-500/30 pb-4">
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
          <Cpu className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            TECH MATRIX & CAPABILITIES
          </h2>
          <p className="text-amber-400 font-rajdhani text-lg font-medium">
            Core Technical Skills, Frameworks & Tooling
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div key={idx} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <h3 className="text-lg font-bold font-rajdhani text-amber-400 mb-4 tracking-wider uppercase">
              // {category.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-amber-400 font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
