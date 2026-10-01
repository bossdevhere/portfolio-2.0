import React from 'react';
import { GameState, SectionId } from '../types';
import { Speedometer } from './ui/Speedometer';
import { NavigationHUD } from './ui/NavigationHUD';
import { MiniMap } from './ui/MiniMap';
import { SoundControls } from './ui/SoundControls';
import { AboutSection } from '../sections/AboutSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { AISection } from '../sections/AISection';
import { GamesSection } from '../sections/GamesSection';
import { ContactSection } from '../sections/ContactSection';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { SECTION_WAYPOINTS } from '../data/portfolio';

interface PortfolioUIProps {
  state: GameState;
  onSelectSection: (sectionId: SectionId) => void;
  onOpenModal: (sectionId: SectionId) => void;
  onCloseModal: () => void;
  onToggleAudio: () => void;
  onSetCameraMode: (mode: 'third-person' | 'hood' | 'top-down') => void;
  onRestartTrack: () => void;
}

export const PortfolioUI: React.FC<PortfolioUIProps> = ({
  state,
  onSelectSection,
  onOpenModal,
  onCloseModal,
  onToggleAudio,
  onSetCameraMode,
  onRestartTrack,
}) => {
  const currentWaypointIndex = SECTION_WAYPOINTS.findIndex(w => w.id === state.currentSection);
  const nextWaypoint = SECTION_WAYPOINTS[currentWaypointIndex + 1];
  const prevWaypoint = SECTION_WAYPOINTS[currentWaypointIndex - 1];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-6 select-none">
      {/* Top Header Bar */}
      <NavigationHUD
        currentSection={state.currentSection}
        onSelectSection={onSelectSection}
        onOpenModal={onOpenModal}
      />

      {/* Top Right Controls (Sound & Camera) */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <SoundControls
          audioMuted={state.audioMuted}
          onToggleAudio={onToggleAudio}
          cameraMode={state.cameraMode}
          onSetCameraMode={onSetCameraMode}
          onRestartTrack={onRestartTrack}
        />
      </div>

      {/* Bottom HUD Bar */}
      <div className="flex items-end justify-between w-full mt-auto">
        {/* Speedometer */}
        <div className="pointer-events-auto">
          <Speedometer speed={state.carSpeed} isAutoDriving={state.isAutoDriving} />
        </div>

        {/* Driving Help / Next Section Hint */}
        <div className="hidden lg:flex items-center space-x-3 pointer-events-auto glass-panel px-4 py-2.5 rounded-2xl border border-cyan-500/20 text-xs font-mono text-slate-300">
          {prevWaypoint && (
            <button
              onClick={() => onSelectSection(prevWaypoint.id)}
              className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{prevWaypoint.title}</span>
            </button>
          )}

          <span className="text-slate-600">|</span>

          <span className="text-slate-400">
            [W/S/A/D] Steer & Drive • [Click HUD] Auto-cruise
          </span>

          {nextWaypoint && (
            <>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => onSelectSection(nextWaypoint.id)}
                className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
              >
                <span>{nextWaypoint.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Circuit Radar MiniMap */}
        <div className="pointer-events-auto">
          <MiniMap carZ={state.carPosition[2]} currentSection={state.currentSection} />
        </div>
      </div>

      {/* Interactive Floating Modal Dialog for Sections */}
      {state.activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[85vh] glass-panel-purple rounded-3xl p-6 md:p-8 overflow-y-auto border border-cyan-500/30 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={onCloseModal}
              className="absolute top-6 right-6 p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700/80 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content Router */}
            {state.activeModal === 'about' && <AboutSection />}
            {state.activeModal === 'experience' && <ExperienceSection />}
            {state.activeModal === 'projects' && <ProjectsSection />}
            {state.activeModal === 'skills' && <SkillsSection />}
            {state.activeModal === 'ai' && <AISection />}
            {state.activeModal === 'games' && <GamesSection />}
            {state.activeModal === 'contact' && <ContactSection />}
          </div>
        </div>
      )}
    </div>
  );
};
