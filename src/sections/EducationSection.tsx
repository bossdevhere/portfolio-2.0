import React from 'react';
import { EDUCATION_DATA } from '../data/portfolio';

export const EducationSection: React.FC = () => {
  return (
    <div className="space-y-6 text-[#F5F5F5]">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs text-[#00ff66] tracking-[0.2em] uppercase">
            SECTION 02 / 07 — ACADEMIC FOUNDATION
          </span>
          <h2 className="text-2xl font-bold font-orbitron text-[#F5F5F5] uppercase tracking-wider mt-1">
            EDUCATION
          </h2>
        </div>
      </div>

      <div className="space-y-4 font-mono">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.id}
            className="hud-panel p-5 rounded-xl border border-white/10 space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between text-xs text-[#8A8A8A]">
              <span className="text-[#00ff66] font-bold uppercase">{item.period}</span>
              <span>{item.gpaOrGrade}</span>
            </div>

            <h3 className="text-lg font-bold font-orbitron text-[#F5F5F5] uppercase">
              {item.degree}
            </h3>

            <p className="text-xs text-[#8A8A8A] font-semibold">{item.institution}</p>

            <div className="hud-line" />

            <ul className="space-y-1 text-xs text-[#8A8A8A] list-disc list-inside pt-1">
              {item.details.map((detail, idx) => (
                <li key={idx} className="leading-relaxed">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
