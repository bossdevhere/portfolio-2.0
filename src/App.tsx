import React, { Suspense, useRef } from 'react';
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
          mobileInputRef={mobileInputRef}
          showMobileControls={showMobileControls}
        />
      )}
    </div>
  );
};

export default App;
