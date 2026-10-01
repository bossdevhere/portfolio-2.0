import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolio';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center space-x-4 border-b border-purple-500/30 pb-4">
        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
          <Briefcase className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            CAREER EXPERIENCE
          </h2>
          <p className="text-purple-400 font-rajdhani text-lg font-medium">
            Professional Timeline & Key Milestones
          </p>
        </div>
      </div>

      <div className="relative border-l-2 border-purple-500/30 ml-4 pl-6 space-y-8">
        {EXPERIENCE_DATA.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-400 group-hover:bg-purple-400 transition-all shadow-md shadow-purple-500/50" />

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-purple-500/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold font-rajdhani text-white">
                  {item.role}
                </h3>
                <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full font-mono flex items-center space-x-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {item.period}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-sm text-cyan-400 mb-4">
                <span className="font-semibold">{item.company}</span>
                <span>•</span>
                <span className="text-slate-400 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {item.location}
                </span>
              </div>

              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside mb-4">
                {item.description.map((desc, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                {item.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
