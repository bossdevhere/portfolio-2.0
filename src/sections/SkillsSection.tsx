import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolio';

export const SkillsSection: React.FC = () => {
  return (
    <div className="space-y-6 text-[#F5F5F5]">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.2em] uppercase">
            SECTION 05 / 07 — CAPABILITIES
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            TECH MATRIX
          </h2>
        </div>
        <span className="font-mono text-xs text-[#8A8A8A]">SYSTEM / V2.0</span>
      </div>

      <div className="space-y-6 font-mono">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div key={idx} className="hud-panel p-5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#00ff66] tracking-widest uppercase">
                // {category.name}
              </span>
              <span className="text-[10px] text-[#8A8A8A]">0{idx + 1}</span>
            </div>

            <div className="hud-line-green" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between text-xs"
                >
                  <span className="text-[#F5F5F5] font-semibold">{skill.name}</span>
                  <span className="text-[#00ff66] text-[10px] font-bold">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
