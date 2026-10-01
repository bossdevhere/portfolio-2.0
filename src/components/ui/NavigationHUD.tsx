import React from 'react';
import { SECTION_WAYPOINTS } from '../../data/portfolio';
import { SectionId } from '../../types';
import { User, Briefcase, Code, Cpu, Brain, Gamepad2, Mail, Play } from 'lucide-react';

interface NavigationHUDProps {
  currentSection: SectionId;
  onSelectSection: (sectionId: SectionId) => void;
  onOpenModal: (sectionId: SectionId) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Play: <Play className="w-4 h-4" />,
  User: <User className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Code: <Code className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
};

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentSection,
  onSelectSection,
  onOpenModal,
}) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30 max-w-full px-4">
      <div className="glass-panel px-3 py-2 rounded-2xl flex items-center space-x-1.5 overflow-x-auto no-scrollbar border border-cyan-500/20 shadow-2xl shadow-cyan-950/50">
        {SECTION_WAYPOINTS.map((waypoint) => {
          const isActive = currentSection === waypoint.id;
          const isStart = waypoint.id === 'start';

          return (
            <button
              key={waypoint.id}
              onClick={() => {
                onSelectSection(waypoint.id);
                if (!isStart) {
                  onOpenModal(waypoint.id);
                }
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <span>{ICON_MAP[waypoint.iconName]}</span>
              <span className="font-rajdhani font-semibold text-sm">
                {waypoint.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
