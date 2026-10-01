import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolio';

export const ExperienceSection: React.FC = () => {
  return (
    <div className="space-y-6 text-[#F5F5F5]">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.2em] uppercase">
            SECTION 03 / 07 — MILESTONES
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            EXPERIENCE
          </h2>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        {EXPERIENCE_DATA.map((item) => (
          <div
            key={item.id}
            className="hud-panel p-5 rounded-xl border border-white/10 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between text-xs text-[#8A8A8A]">
              <span className="text-[#00ff66] font-bold">{item.company.toUpperCase()}</span>
              <span>{item.period}</span>
            </div>

            <h3 className="text-lg font-bold font-orbitron text-[#F5F5F5] uppercase">
              {item.role}
            </h3>

            <div className="hud-line" />

            <ul className="space-y-1.5 text-xs text-[#8A8A8A] list-disc list-inside">
              {item.description.map((desc, idx) => (
                <li key={idx} className="leading-relaxed">
                  {desc}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] px-2 py-0.5 bg-white/5 text-[#F5F5F5] border border-white/10 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
