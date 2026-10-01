import React from 'react';
import { EDUCATION_DATA } from '../data/portfolio';
import { GraduationCap, Award, Calendar } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center space-x-4 border-b border-pink-500/30 pb-4">
        <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl text-pink-400">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            EDUCATION & ACADEMICS
          </h2>
          <p className="text-pink-400 font-rajdhani text-lg font-medium">
            Degrees, Certifications & Honors
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-pink-500/40 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold font-rajdhani text-white">
                {item.degree}
              </h3>
              <span className="text-xs px-3 py-1 bg-pink-500/10 text-pink-300 border border-pink-500/30 rounded-full font-mono flex items-center">
                <Calendar className="w-3 h-3 inline mr-1" />
                {item.period}
              </span>
            </div>

            <p className="text-sm font-semibold text-cyan-400 mb-2">
              {item.institution}
            </p>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{item.gpaOrGrade}</span>
            </div>

            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
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
