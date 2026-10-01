import React, { Suspense, useRef, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { useMobileOrientation } from './hooks/useMobileOrientation';
import { World } from './scene/World';
import { StartScreen } from './components/StartScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { PortfolioUI } from './components/PortfolioUI';
import { MobileOrientationGate } from './components/MobileOrientationGate';
import { MobileInputState } from './components/ui/MobileControls';

export const App: React.FC = () => {
  const {
    state,
    startExperience,
    navigateToSection,
    updateCarState,
    addObstacleScore,
    handleCollision,
    openModal,
    closeModal,
    toggleAudio,
    setCameraMode,
    togglePause,
    resumeGame,
    playAgain,
  } = useGameState();

  const { isMobile, isPortrait, isMobilePortrait } = useMobileOrientation();
  const showMobileControls = isMobile && !isPortrait;

  // Shared high-performance mutable input ref for mobile D-pad controls
  const mobileInputRef = useRef<MobileInputState>({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  // Global ESC key listener for Desktop pause/resume (unfocused window support)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        if (state.hasStarted && !state.hasFinished) {
          e.preventDefault();
          togglePause();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.hasStarted, state.hasFinished, togglePause]);

  // Clear all mobile & keyboard input states when orientation changes or pause/crash occurs
  useEffect(() => {
    if (isMobilePortrait || state.isPaused || state.hasCrashed || state.hasFinished) {
      if (mobileInputRef.current) {
        mobileInputRef.current.up = false;
        mobileInputRef.current.down = false;
        mobileInputRef.current.left = false;
        mobileInputRef.current.right = false;
      }
    }
  }, [isMobilePortrait, state.isPaused, state.hasCrashed, state.hasFinished]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505]">
      {/* Mobile Orientation Gate Overlay (ONLY active when isMobile AND isPortrait) */}
      {isMobilePortrait && <MobileOrientationGate />}

      {/* Subtle Vignette Ambient Overlay */}
      <div className="vignette-overlay" />

      {/* 3D World Canvas (Game Layer) */}
      <Suspense fallback={<LoadingScreen />}>
        <World
          currentSection={state.currentSection}
          targetZPosition={state.targetZPosition}
          isAutoDriving={state.isAutoDriving}
          onUpdateCarState={updateCarState}
          onSelectSection={navigateToSection}
          audioMuted={state.audioMuted}
          cameraMode={state.cameraMode}
          onCollision={handleCollision}
          onScorePass={addObstacleScore}
          hasStarted={state.hasStarted}
          hasFinished={state.hasFinished}
          isPaused={state.isPaused}
          isMobilePortrait={isMobilePortrait}
          mobileInputRef={mobileInputRef}
          carPosition={state.carPosition}
          carSpeed={state.carSpeed}
          hasCrashed={state.hasCrashed}
        />
      </Suspense>

      {/* Start Screen initial overlay */}
      {!state.hasStarted ? (
        <StartScreen
          onStart={startExperience}
          audioMuted={state.audioMuted}
          onToggleAudio={toggleAudio}
        />
      ) : (
        /* HUD UI Overlay (Stable Layer) */
        <PortfolioUI
          state={state}
          onSelectSection={navigateToSection}
          onOpenModal={openModal}
          onCloseModal={closeModal}
          onToggleAudio={toggleAudio}
          onSetCameraMode={setCameraMode}
          onRestartTrack={playAgain}
          onPlayAgain={playAgain}
          onTogglePause={togglePause}
          onResumeGame={resumeGame}
          mobileInputRef={mobileInputRef}
          showMobileControls={showMobileControls}
        />
      )}
    </div>
  );
};

export default App;
