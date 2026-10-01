import { useState, useCallback, useEffect, useRef } from 'react';
import { SectionId, GameState, ScoreEntry, ScorePopup } from '../types';
import { SECTION_WAYPOINTS } from '../data/portfolio';
import { SCORING_CONFIG } from '../config/scoring';

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
      isPaused: false,
      leaderboard: savedLeaderboard,
      scorePopups: [],
    };
  });

  // Track passive driving timer
  const lastPassiveScoreTimeRef = useRef<number>(Date.now());

  // Passive Driving Score: +1 point every 1 second when actively driving
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (
        state.hasStarted &&
        state.carSpeed > 5 &&
        !state.hasCrashed &&
        !state.hasFinished &&
        !state.isPaused &&
        !state.activeModal
      ) {
        if (now - lastPassiveScoreTimeRef.current >= SCORING_CONFIG.PASSIVE_SCORE_INTERVAL_MS) {
          lastPassiveScoreTimeRef.current = now;

          if (SCORING_CONFIG.DEBUG_SCORING) {
            console.log('[Scoring] Passive driving -> +1 point');
          }

          setState((prev) => {
            const nextScore = prev.score + 1;
            const nextHighScore = Math.max(prev.highScore, nextScore);
            if (nextHighScore > prev.highScore) {
              localStorage.setItem('cyberdrive_highscore', nextHighScore.toString());
            }
            return {
              ...prev,
              score: nextScore,
              highScore: nextHighScore,
            };
          });
        }
      } else {
        lastPassiveScoreTimeRef.current = now;
      }
    }, 200);

    return () => clearInterval(timer);
  }, [state.hasStarted, state.carSpeed, state.hasCrashed, state.hasFinished, state.activeModal]);

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
      activeModal: sectionId === 'start' || sectionId === 'finish' ? null : sectionId,
    }));
  }, []);

  const updateCarState = useCallback((position: [number, number, number], rotation: number, speed: number) => {
    setState((prev) => {
      const currentZ = position[2];
      let closestSection = prev.currentSection;
      let minDistance = Infinity;
      let activeNearCheckpoint: SectionId | null = null;

      // Distance-based Checkpoint Content triggering
      for (const w of SECTION_WAYPOINTS) {
        const dist = Math.abs(w.zPosition - currentZ);
        if (dist < minDistance) {
          minDistance = dist;
          closestSection = w.id;
        }

        // If car is within 10 meters of a checkpoint, make its content visible!
        if (dist <= 10 && w.id !== 'start' && w.id !== 'finish') {
          activeNearCheckpoint = w.id;
        }
      }

      // Check if player reached FINISH LINE (Z <= -535)
      const isFinish = currentZ <= -535 && !prev.hasFinished;

      const targetDist = Math.abs(prev.targetZPosition - currentZ);
      const isStillAutoDriving = prev.isAutoDriving && targetDist > 2;

      // Retain activeModal if manually opened via click or if car is currently at a checkpoint
      const newActiveModal = prev.activeModal === 'leaderboard'
        ? 'leaderboard'
        : (activeNearCheckpoint || (prev.isAutoDriving ? prev.activeModal : null));

      return {
        ...prev,
        carPosition: position,
        carRotation: rotation,
        carSpeed: speed,
        currentSection: closestSection,
        isAutoDriving: isStillAutoDriving,
        hasFinished: prev.hasFinished || isFinish,
        activeModal: newActiveModal,
      };
    });
  }, []);

  // Award points when an obstacle is passed
  const addObstacleScore = useCallback((points: number, label: string) => {
    const popupId = Date.now() + Math.random();

    setState((prev) => {
      const nextScore = prev.score + points;
      const nextHighScore = Math.max(prev.highScore, nextScore);
      if (nextHighScore > prev.highScore) {
        localStorage.setItem('cyberdrive_highscore', nextHighScore.toString());
      }

      const newPopup: ScorePopup = { id: popupId, label, points };
      const updatedPopups = [...prev.scorePopups, newPopup];

      return {
        ...prev,
        score: nextScore,
        highScore: nextHighScore,
        scorePopups: updatedPopups,
      };
    });

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        scorePopups: prev.scorePopups.filter((p) => p.id !== popupId),
      }));
    }, 1200);
  }, []);

  // Collision handler
  const handleCollision = useCallback(() => {
    setState((prev) => {
      const currentZ = prev.carPosition[2];

      let respawnWaypoint = SECTION_WAYPOINTS[0];
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
        scorePopups: [],
        activeModal: null,
      };
    });

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

  const togglePause = useCallback(() => {
    setState((prev) => {
      if (!prev.hasStarted || prev.hasFinished) return prev;
      const nextPaused = !prev.isPaused;
      return {
        ...prev,
        isPaused: nextPaused,
        carSpeed: nextPaused ? 0 : prev.carSpeed,
      };
    });
  }, []);

  const resumeGame = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  // Play Again / Reset Game
  const playAgain = useCallback(() => {
    setState((prev) => {
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
        isPaused: false,
        score: 0,
        leaderboard: updatedLeaderboard,
        scorePopups: [],
      };
    });
  }, []);

  return {
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
  };
}
