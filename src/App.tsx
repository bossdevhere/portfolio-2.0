import React, { Suspense } from 'react';
import { useGameState } from './hooks/useGameState';
import { World } from './scene/World';
import { StartScreen } from './components/StartScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { PortfolioUI } from './components/PortfolioUI';

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

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {/* CRT Scanline Atmospheric Overlay */}
      <div className="scanlines" />

      {/* 3D World Canvas */}
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
        /* HUD UI Overlay */
        <PortfolioUI
          state={state}
          onSelectSection={navigateToSection}
          onOpenModal={openModal}
          onCloseModal={closeModal}
          onToggleAudio={toggleAudio}
          onSetCameraMode={setCameraMode}
          onRestartTrack={playAgain}
          onPlayAgain={playAgain}
        />
      )}
    </div>
  );
};

export default App;
