import React from 'react';
import { GameState, SectionId } from '../types';
import { Speedometer } from './ui/Speedometer';
import { NavigationHUD } from './ui/NavigationHUD';
import { MiniMap } from './ui/MiniMap';
import { SoundControls } from './ui/SoundControls';
import { LeaderboardModal } from './ui/LeaderboardModal';
import { FinishModal } from './ui/FinishModal';
import { AboutSection } from '../sections/AboutSection';
import { EducationSection } from '../sections/EducationSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ContactSection } from '../sections/ContactSection';
import { X, ChevronRight, ChevronLeft, Trophy, Flame, AlertTriangle } from 'lucide-react';
import { SECTION_WAYPOINTS } from '../data/portfolio';

interface PortfolioUIProps {
  state: GameState;
  onSelectSection: (sectionId: SectionId) => void;
  onOpenModal: (sectionId: SectionId | 'leaderboard') => void;
  onCloseModal: () => void;
  onToggleAudio: () => void;
  onSetCameraMode: (mode: 'third-person' | 'hood' | 'top-down') => void;
  onRestartTrack: () => void;
  onPlayAgain: () => void;
}

export const PortfolioUI: React.FC<PortfolioUIProps> = ({
  state,
  onSelectSection,
  onOpenModal,
  onCloseModal,
  onToggleAudio,
  onSetCameraMode,
  onRestartTrack,
  onPlayAgain,
}) => {
  const currentWaypointIndex = SECTION_WAYPOINTS.findIndex(w => w.id === state.currentSection);
  const nextWaypoint = SECTION_WAYPOINTS[currentWaypointIndex + 1];
  const prevWaypoint = SECTION_WAYPOINTS[currentWaypointIndex - 1];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-6 select-none">
      {/* Collision Red Flash Overlay */}
      {state.hasCrashed && (
        <div className="fixed inset-0 z-50 bg-red-600/30 backdrop-blur-sm flex items-center justify-center animate-ping">
          <div className="p-4 bg-red-950 border border-red-500 rounded-2xl flex items-center space-x-2 text-white font-orbitron font-bold shadow-2xl">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span>CRASH! RESPAWNING TO CHECKPOINT...</span>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <NavigationHUD
        currentSection={state.currentSection}
        onSelectSection={onSelectSection}
        onOpenModal={onOpenModal}
      />

      {/* Top Right Controls & Score Badge */}
      <div className="absolute top-4 right-4 pointer-events-auto flex items-center space-x-3">
        {/* Floating Score Feedback Popups */}
        <div className="flex flex-col items-end space-y-1 pointer-events-none mr-2">
          {state.scorePopups.map((popup) => (
            <div
              key={popup.id}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-lg animate-bounce transition-all ${
                popup.points >= 10
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 border border-amber-300 shadow-amber-500/50 text-sm'
                  : popup.points >= 5
                  ? 'bg-cyan-500 text-slate-950 border border-cyan-300 shadow-cyan-500/50'
                  : 'bg-emerald-500 text-slate-950 border border-emerald-300'
              }`}
            >
              {popup.label}
            </div>
          ))}
        </div>

        {/* Live Score Counter */}
        <div className="glass-panel px-4 py-2 rounded-xl border border-amber-500/30 flex items-center space-x-3">
          <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block -mb-1">SCORE</span>
            <span className="font-orbitron font-bold text-base text-amber-400">
              {state.score} PTS
            </span>
          </div>
        </div>

        {/* Leaderboard Button */}
        <button
          onClick={() => onOpenModal('leaderboard')}
          className="p-3 bg-slate-900/80 hover:bg-slate-800 text-amber-400 rounded-xl border border-amber-500/30 transition-all cursor-pointer"
          title="View Cyber Leaderboard"
        >
          <Trophy className="w-4 h-4" />
        </button>

        {/* Camera & Sound Controls */}
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
            [Scroll / W/S] Drive Forward & Backward • Avoid Obstacles!
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

      {/* Leaderboard Modal */}
      {state.activeModal === 'leaderboard' && (
        <LeaderboardModal
          leaderboard={state.leaderboard}
          highScore={state.highScore}
          onClose={onCloseModal}
        />
      )}

      {/* Finish Line Victory Modal */}
      {state.hasFinished && (
        <FinishModal
          score={state.score}
          highScore={state.highScore}
          onPlayAgain={onPlayAgain}
        />
      )}

      {/* Section Content Modals */}
      {state.activeModal && state.activeModal !== 'leaderboard' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[85vh] glass-panel-purple rounded-3xl p-6 md:p-8 overflow-y-auto border border-cyan-500/30 shadow-2xl">
            <button
              onClick={onCloseModal}
              className="absolute top-6 right-6 p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700/80 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {state.activeModal === 'about' && <AboutSection />}
            {state.activeModal === 'education' && <EducationSection />}
            {state.activeModal === 'experience' && <ExperienceSection />}
            {state.activeModal === 'projects' && <ProjectsSection />}
            {state.activeModal === 'skills' && <SkillsSection />}
            {state.activeModal === 'contact' && <ContactSection />}
          </div>
        </div>
      )}
    </div>
  );
};
