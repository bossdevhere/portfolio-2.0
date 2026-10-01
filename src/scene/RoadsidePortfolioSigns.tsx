import React from 'react';
import { Checkpoint3D } from './Checkpoint3D';
import { PERSONAL_INFO, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, SKILL_CATEGORIES } from '../data/portfolio';
import { ExternalLink, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';

interface RoadsidePortfolioSignsProps {
  carZ: number;
}

export const RoadsidePortfolioSigns: React.FC<RoadsidePortfolioSignsProps> = ({ carZ }) => {
  return (
    <group>
      {/* CHECKPOINT 01: ABOUT ME (LEFT SIDE, Z = -70) */}
      <Checkpoint3D
        id="about"
        number="01 / ABOUT"
        title="DEVEN RAJPUT"
        subtitle="FULL STACK DEVELOPER • AI / ML ENTHUSIAST"
        side="left"
        position={[-10.5, 3.2, -70]}
        carZ={carZ}
      >
        <p className="text-xs text-[#F5F5F5] leading-relaxed">
          "{PERSONAL_INFO.introduction}"
        </p>
        <p className="text-[11px] text-[#8A8A8A] leading-relaxed">
          {PERSONAL_INFO.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PERSONAL_INFO.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/5 text-[#00ff66] border border-white/10 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </Checkpoint3D>

      {/* CHECKPOINT 02: EDUCATION (RIGHT SIDE, Z = -140) */}
      <Checkpoint3D
        id="education"
        number="02 / EDUCATION"
        title="B.TECH — COMPUTER SCIENCE"
        subtitle="AI & MACHINE LEARNING SPECIALIZATION"
        side="right"
        position={[10.5, 3.2, -140]}
        carZ={carZ}
      >
        {EDUCATION_DATA.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8A8A8A]">
              <span className="text-[#00ff66] font-bold">{item.institution}</span>
              <span>{item.period}</span>
            </div>
            <div className="hud-line" />
            <ul className="space-y-1 text-xs text-[#8A8A8A] list-disc list-inside">
              {item.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </Checkpoint3D>

      {/* CHECKPOINT 03: EXPERIENCE (LEFT SIDE, Z = -220) */}
      <Checkpoint3D
        id="experience"
        number="03 / EXPERIENCE"
        title="CAREER MILESTONES"
        subtitle="SUAS ENTERPRISE & BRAINCELL INFOTECH"
        side="left"
        position={[-10.5, 3.2, -220]}
        carZ={carZ}
      >
        <div className="space-y-3 text-xs">
          {EXPERIENCE_DATA.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[#F5F5F5]">{exp.role}</span>
                <span className="text-[#00ff66] text-[10px]">{exp.period}</span>
              </div>
              <p className="text-[11px] text-[#8A8A8A]">{exp.company}</p>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {exp.skills.map((s, idx) => (
                  <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-[#F5F5F5] rounded border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Checkpoint3D>

      {/* CHECKPOINT 04: PROJECTS (RIGHT SIDE, Z = -300) */}
      <Checkpoint3D
        id="projects"
        number="04 / PROJECTS"
        title="SKIPPR & FEATURED WORK"
        subtitle="FULL STACK / MOBILE / AI"
        side="right"
        position={[10.5, 3.2, -300]}
        carZ={carZ}
      >
        <div className="space-y-3 text-xs">
          {PROJECTS_DATA.slice(0, 3).map((proj, idx) => (
            <div key={proj.id} className="p-2.5 bg-white/5 rounded border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F5F5F5]">{proj.title}</span>
                <span className="text-[10px] text-[#00ff66]">{proj.category}</span>
              </div>
              <p className="text-[11px] text-[#8A8A8A] leading-tight">{proj.description}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[9px] text-[#F5F5F5] bg-black/40 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-[10px] text-[#00ff66] hover:underline font-bold"
                  >
                    <span>VIEW PROJECT</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Checkpoint3D>

      {/* CHECKPOINT 05: TECH MATRIX (LEFT SIDE, Z = -380) */}
      <Checkpoint3D
        id="skills"
        number="05 / TECH MATRIX"
        title="TECHNICAL CAPABILITIES"
        subtitle="FRONTEND • BACKEND • AI/ML • MOBILE • TOOLS"
        side="left"
        position={[-10.5, 3.2, -380]}
        carZ={carZ}
      >
        <div className="space-y-2 text-[11px]">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="text-[#00ff66] font-bold text-[10px] uppercase">// {cat.name}</span>
              <p className="text-[#F5F5F5]">
                {cat.skills.map((s) => s.name).join(' • ')}
              </p>
            </div>
          ))}
        </div>
      </Checkpoint3D>

      {/* CHECKPOINT 06: CONTACT (RIGHT SIDE, Z = -460) */}
      <Checkpoint3D
        id="contact"
        number="06 / CONTACT"
        title="LET'S BUILD SOMETHING GREAT"
        subtitle="GET IN TOUCH"
        side="right"
        position={[10.5, 3.2, -460]}
        carZ={carZ}
      >
        <div className="space-y-3 text-xs">
          <p className="text-[#8A8A8A]">
            Direct email: <span className="text-[#F5F5F5] font-bold">{PERSONAL_INFO.email}</span>
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded text-[11px]"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>GITHUB</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded text-[11px]"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>LINKEDIN</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#00ff66] text-[#050505] font-bold rounded text-[11px]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>EMAIL</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#F5F5F5] border border-white/10 rounded text-[11px]"
            >
              <FileText className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>RESUME</span>
            </a>
          </div>
        </div>
      </Checkpoint3D>
    </group>
  );
};
