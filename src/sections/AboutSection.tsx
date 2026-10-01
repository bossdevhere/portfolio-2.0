import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { User, MapPin, Mail, Award, Code, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Header Banner */}
      <div className="flex items-center space-x-4 border-b border-cyan-500/30 pb-4">
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-orbitron text-white tracking-wide">
            {PERSONAL_INFO.name}
          </h2>
          <p className="text-cyan-400 font-rajdhani text-lg font-medium">
            {PERSONAL_INFO.role}
          </p>
        </div>
      </div>

      {/* Bio Paragraph */}
      <p className="text-slate-300 text-base leading-relaxed">
        {PERSONAL_INFO.bio}
      </p>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start space-x-3">
          <Code className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-white font-rajdhani text-lg">3D Web Specialist</h4>
            <p className="text-xs text-slate-400 mt-1">
              Building interactive WebGL & Three.js experiences with high performance.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start space-x-3">
          <Award className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-white font-rajdhani text-lg">Full-Stack Architect</h4>
            <p className="text-xs text-slate-400 mt-1">
              Designing modular frontend components and high-scale API systems.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start space-x-3">
          <Compass className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-white font-rajdhani text-lg">Creative Mindset</h4>
            <p className="text-xs text-slate-400 mt-1">
              Blending game design mechanics with web application workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Details & Quick Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-sm">
        <div className="flex items-center space-x-2 text-slate-400">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>{PERSONAL_INFO.location}</span>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 rounded-lg transition-all border border-slate-700"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 rounded-lg transition-all border border-slate-700"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
