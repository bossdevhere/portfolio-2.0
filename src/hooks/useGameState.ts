import { useState, useCallback, useEffect } from 'react';
import { SectionId, GameState, ScoreEntry } from '../types';
import { SECTION_WAYPOINTS } from '../data/portfolio';

const INITIAL_LEADERBOARD: ScoreEntry[] = [
  { name: 'CyberRacer', score: 2850, date: '2026-09-28' },
  { name: 'ApexDev', score: 2400, date: '2026-09-25' },
  { name: 'ByteMaster', score: 1950, date: '2026-09-20' },
  { name: 'NeonGrid', score: 1500, date: '2026-09-18' },
];

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    const savedHighScore = parseInt(localStorage.getItem('cyberdrive_highscore') || '0', 10);
    const savedLeaderboard = JSON.parse(
      localStorage.getItem('cyberdrive_leaderboard') || JSON.stringify(INITIAL_LEADERBOARD)
    );

    return {
      hasStarted: false,
      currentSection: 'start',
      targetZPosition: 0,
      carPosition: [0, 0.35, 0],
      carRotation: 0,
      carSpeed: 0,
      isAutoDriving: false,
      activeModal: null,
      audioMuted: false,
      cameraMode: 'third-person',
      score: 0,
      highScore: savedHighScore,
      hasCrashed: false,
      hasFinished: false,
      leaderboard: savedLeaderboard,
    };
  });

  const startExperience = useCallback(() => {
    setState((prev) => ({
      ...prev,
      hasStarted: true,
      currentSection: 'start',
      targetZPosition: 0,
      isAutoDriving: false,
      carSpeed: 0,
    }));
  }, []);

  const navigateToSection = useCallback((sectionId: SectionId) => {
    const waypoint = SECTION_WAYPOINTS.find((w) => w.id === sectionId);
    if (!waypoint) return;

    setState((prev) => ({
      ...prev,
      currentSection: sectionId,
      targetZPosition: waypoint.zPosition,
      isAutoDriving: true,
      activeModal: null,
    }));
  }, []);

  const updateCarState = useCallback((position: [number, number, number], rotation: number, speed: number) => {
    setState((prev) => {
      const currentZ = position[2];
      let closestSection = prev.currentSection;
      let minDistance = Infinity;

      for (const w of SECTION_WAYPOINTS) {
        const dist = Math.abs(w.zPosition - currentZ);
        if (dist < minDistance) {
          minDistance = dist;
          closestSection = w.id;
        }
      }

      // Live Score Calculation based on distance traveled forward
      const distanceScore = Math.max(0, Math.round(Math.abs(currentZ) * 4));
      const newScore = Math.max(prev.score, distanceScore);

      // Check if player reached FINISH LINE (Z <= -535)
      const isFinish = currentZ <= -535 && !prev.hasFinished;

      // Update High Score
      const newHighScore = Math.max(prev.highScore, newScore);
      if (newHighScore > prev.highScore) {
        localStorage.setItem('cyberdrive_highscore', newHighScore.toString());
      }

      const targetDist = Math.abs(prev.targetZPosition - currentZ);
      const isStillAutoDriving = prev.isAutoDriving && targetDist > 2;

      return {
        ...prev,
        carPosition: position,
        carRotation: rotation,
        carSpeed: speed,
        currentSection: closestSection,
        isAutoDriving: isStillAutoDriving,
        score: newScore,
        highScore: newHighScore,
        hasFinished: prev.hasFinished || isFinish,
      };
    });
  }, []);

  // Collision handler: Teleport back to nearest checkpoint
  const handleCollision = useCallback(() => {
    setState((prev) => {
      const currentZ = prev.carPosition[2];
      
      // Find nearest previous checkpoint behind current position
      let respawnWaypoint = SECTION_WAYPOINTS[0]; // Default to Launching Pad
      for (const w of SECTION_WAYPOINTS) {
        if (w.zPosition > currentZ + 5) {
          respawnWaypoint = w;
        }
      }

      return {
        ...prev,
        hasCrashed: true,
        carPosition: [0, 0.35, respawnWaypoint.zPosition],
        targetZPosition: respawnWaypoint.zPosition,
        isAutoDriving: false,
        carSpeed: 0,
        score: Math.max(0, prev.score - 100), // Minor penalty
      };
    });

    // Reset crash flash state after 800ms
    setTimeout(() => {
      setState((prev) => ({ ...prev, hasCrashed: false }));
    }, 800);
  }, []);

  const openModal = useCallback((sectionId: SectionId | 'leaderboard') => {
    setState((prev) => ({
      ...prev,
      activeModal: sectionId,
      carSpeed: 0,
      isAutoDriving: false,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeModal: null,
    }));
  }, []);

  const toggleAudio = useCallback(() => {
    setState((prev) => ({
      ...prev,
      audioMuted: !prev.audioMuted,
    }));
  }, []);

  const setCameraMode = useCallback((mode: 'third-person' | 'hood' | 'top-down') => {
    setState((prev) => ({
      ...prev,
      cameraMode: mode,
    }));
  }, []);

  // Play Again / Reset Game to Launching Pad
  const playAgain = useCallback(() => {
    setState((prev) => {
      // Record score into leaderboard
      const newEntry: ScoreEntry = {
        name: 'Player 1',
        score: prev.score,
        date: new Date().toISOString().split('T')[0],
      };
      const updatedLeaderboard = [...prev.leaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      localStorage.setItem('cyberdrive_leaderboard', JSON.stringify(updatedLeaderboard));

      return {
        ...prev,
        currentSection: 'start',
        targetZPosition: 0,
        carPosition: [0, 0.35, 0],
        carRotation: 0,
        carSpeed: 0,
        isAutoDriving: false,
        activeModal: null,
        hasFinished: false,
        score: 0,
        leaderboard: updatedLeaderboard,
      };
    });
  }, []);

  return {
    state,
    startExperience,
    navigateToSection,
    updateCarState,
    handleCollision,
    openModal,
    closeModal,
    toggleAudio,
    setCameraMode,
    playAgain,
  };
}
