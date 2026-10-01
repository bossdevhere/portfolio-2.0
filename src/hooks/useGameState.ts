import { useState, useCallback } from 'react';
import { SectionId, GameState } from '../types';
import { SECTION_WAYPOINTS } from '../data/portfolio';

const INITIAL_STATE: GameState = {
  hasStarted: false,
  currentSection: 'start',
  targetZPosition: 0,
  carPosition: [0, 0, 0],
  carRotation: 0,
  carSpeed: 0,
  isAutoDriving: false,
  activeModal: null,
  audioMuted: false,
  cameraMode: 'third-person',
  debugMode: false,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  const startExperience = useCallback(() => {
    setState((prev) => ({
      ...prev,
      hasStarted: true,
      currentSection: 'about',
      targetZPosition: SECTION_WAYPOINTS[1].zPosition, // Drive to ABOUT ME
      isAutoDriving: true,
      carSpeed: 60,
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
      activeModal: null, // close modal while traveling
    }));
  }, []);

  const updateCarState = useCallback((position: [number, number, number], rotation: number, speed: number) => {
    setState((prev) => {
      // Check which section we are nearest to based on Z position
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

      // Check if auto drive reached target
      const targetDist = Math.abs(prev.targetZPosition - currentZ);
      const isStillAutoDriving = prev.isAutoDriving && targetDist > 2;

      return {
        ...prev,
        carPosition: position,
        carRotation: rotation,
        carSpeed: speed,
        currentSection: closestSection,
        isAutoDriving: isStillAutoDriving,
      };
    });
  }, []);

  const openModal = useCallback((sectionId: SectionId) => {
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

  const restartTrack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentSection: 'start',
      targetZPosition: 0,
      carPosition: [0, 0, 0],
      carRotation: 0,
      carSpeed: 0,
      isAutoDriving: false,
      activeModal: null,
    }));
  }, []);

  return {
    state,
    startExperience,
    navigateToSection,
    updateCarState,
    openModal,
    closeModal,
    toggleAudio,
    setCameraMode,
    restartTrack,
  };
}
