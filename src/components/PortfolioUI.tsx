import React, { useEffect, useRef } from 'react';
import { GameState, SectionId } from '../types';
import { SectionTransitionBanner } from './ui/SectionTransitionBanner';
import { LeaderboardModal } from './ui/LeaderboardModal';
import { FinishModal } from './ui/FinishModal';
import { AboutSection } from '../sections/AboutSection';
import { EducationSection } from '../sections/EducationSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ContactSection } from '../sections/ContactSection';
import { X, Volume2, VolumeX, Trophy } from 'lucide-react';
import { SECTION_WAYPOINTS } from '../data/portfolio';
import gsap from 'gsap';

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
  onPlayAgain,
}) => {
  const currentWaypointIndex = SECTION_WAYPOINTS.findIndex(w => w.id === state.currentSection);
  const currentWaypoint = SECTION_WAYPOINTS[currentWaypointIndex] || SECTION_WAYPOINTS[0];
  const totalJourneySections = SECTION_WAYPOINTS.length - 1; // Excluding start/finish

  // Format speed string e.g. 087
  const speedStr = String(state.carSpeed).padStart(3, '0');
  const isHighSpeed = state.carSpeed > 80;

  // Format section counter e.g. 03 / 07
  const sectionNumStr = String(Math.max(1, currentWaypointIndex)).padStart(2, '0');
  const totalNumStr = String(totalJourneySections).padStart(2, '0');

  // GSAP score popups ref map
  const popupRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Animate new score popups with GSAP
    state.scorePopups.forEach((popup) => {
      const el = popupRefs.current[popup.id];
      if (el) {
        gsap.timeline()
          .fromTo(
            el,
            { opacity: 0, scale: 0.8, y: 10 },
            { opacity: 1, scale: 1, y: -10, duration: 0.3, ease: 'back.out(1.7)' }
          )
          .to(el, { opacity: 0, y: -25, duration: 0.5, delay: 0.5, ease: 'power2.in' });
      }
    });
  }, [state.scorePopups]);

  return (
    <div className="ui-hud-layer select-none">
      {/* Collision Red Flash Overlay (localized vignette, stable HUD) */}
      {state.hasCrashed && (
        <div className="fixed inset-0 z-20 pointer-events-none bg-red-600/20 backdrop-blur-[2px] transition-all" />
      )}

      {/* Main Minimal In-Game Racing HUD (Active when PLAYING) */}
      <div className="fixed inset-0 p-6 md:p-10 pointer-events-none flex flex-col justify-between z-30 font-mono">
        {/* TOP ROW */}
        <div className="flex items-start justify-between w-full">
          {/* TOP LEFT */}
          <div className="pointer-events-auto flex items-center space-x-3">
            <div>
              <span className="hud-label block">DEVEN / DRIVE</span>
              <div className="hud-line-green w-20 mt-1" />
            </div>

            <button
              onClick={onToggleAudio}
              className="p-2 bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-[#00ff66] rounded border border-white/10 transition-all text-xs cursor-pointer"
            >
              {state.audioMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#00ff66]" />}
            </button>
          </div>

          {/* TOP RIGHT: Section Indicator */}
          <div className="text-right pointer-events-auto flex flex-col items-end">
            <div className="flex items-baseline space-x-1.5 font-orbitron font-black text-sm text-[#F5F5F5]">
              <span className="text-[#00ff66]">{sectionNumStr}</span>
              <span className="text-[#8A8A8A]">/</span>
              <span>{totalNumStr}</span>
            </div>

            <span className="hud-label font-bold text-xs tracking-widest text-[#F5F5F5] uppercase mt-0.5">
              {currentWaypoint.title}
            </span>

            {/* Subtle Progress Indicator Dots */}
            <div className="flex items-center space-x-1 mt-1.5 opacity-80">
              {SECTION_WAYPOINTS.map((w, idx) => {
                const isPassed = idx <= currentWaypointIndex;
                return (
                  <React.Fragment key={w.id}>
                    <span
                      onClick={() => onSelectSection(w.id)}
                      className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                        isPassed ? 'bg-[#00ff66] shadow-sm shadow-[#00ff66]' : 'bg-white/20'
                      }`}
                    />
                    {idx < SECTION_WAYPOINTS.length - 1 && (
                      <span className="w-2 h-0.5 bg-white/10" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Leaderboard Button */}
            <button
              onClick={() => onOpenModal('leaderboard')}
              className="mt-2.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] text-[#8A8A8A] hover:text-[#00ff66] transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Trophy className="w-3 h-3 text-[#00ff66]" />
              <span>LEADERBOARD</span>
            </button>
          </div>
        </div>

        {/* Floating GSAP Score Popups */}
        <div className="absolute top-24 right-10 flex flex-col items-end space-y-1.5 pointer-events-none">
          {state.scorePopups.map((popup) => (
            <div
              key={popup.id}
              ref={(el) => {
                if (el) popupRefs.current[popup.id] = el;
              }}
              className={`px-3 py-1 rounded text-xs font-orbitron font-black tracking-wider uppercase ${
                popup.points >= 10
                  ? 'bg-[#00ff66] text-[#050505] shadow-lg shadow-[#00ff66]/40'
                  : popup.points >= 5
                  ? 'bg-white text-[#050505]'
                  : 'bg-white/10 text-[#00ff66] border border-[#00ff66]/40'
              }`}
            >
              {popup.label}
            </div>
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div className="flex items-end justify-between w-full">
          {/* BOTTOM LEFT: SCORE */}
          <div className="pointer-events-auto">
            <span className="hud-label block">SCORE</span>
            <span className="hud-value text-2xl md:text-3xl text-[#F5F5F5] block">
              {state.score.toLocaleString()}
            </span>
            <div className="hud-line-green w-28 mt-1" />
          </div>

          {/* BOTTOM RIGHT: SPEEDOMETER */}
          <div className="text-right pointer-events-auto">
            <div className="flex items-baseline justify-end space-x-1">
              <span
                className={`font-orbitron font-black text-4xl md:text-5xl transition-colors ${
                  isHighSpeed ? 'text-[#00ff66]' : 'text-[#F5F5F5]'
                }`}
              >
                {speedStr}
              </span>
            </div>
            <span className="hud-label font-bold text-xs tracking-widest text-[#8A8A8A] block -mt-1">
              KM / H
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Section Intro Transition */}
      <SectionTransitionBanner
        waypoint={currentWaypoint}
        sectionIndex={currentWaypointIndex}
        totalSections={SECTION_WAYPOINTS.length}
      />

      {/* Leaderboard Modal */}
      {state.activeModal === 'leaderboard' && (
        <LeaderboardModal
          leaderboard={state.leaderboard}
          highScore={state.highScore}
          onClose={onCloseModal}
        />
      )}

      {/* Finish Line Final Screen */}
      {state.hasFinished && (
        <FinishModal
          score={state.score}
          highScore={state.highScore}
          onPlayAgain={onPlayAgain}
        />
      )}

      {/* Section Content Modals */}
      {state.activeModal && state.activeModal !== 'leaderboard' && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 pointer-events-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[85vh] hud-panel rounded-2xl p-6 md:p-10 overflow-y-auto border border-white/10 shadow-2xl">
            <button
              onClick={onCloseModal}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-[#F5F5F5] rounded border border-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
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
