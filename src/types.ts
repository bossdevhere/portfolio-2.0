export type SectionId = 
  | 'start'
  | 'about'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'finish';

export interface SectionWaypoint {
  id: SectionId;
  title: string;
  subtitle: string;
  zPosition: number;
  iconName: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpaOrGrade: string;
  details: string[];
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

export interface ScorePopup {
  id: number;
  label: string;
  points: number;
}

export interface GameState {
  hasStarted: boolean;
  currentSection: SectionId;
  targetZPosition: number;
  carPosition: [number, number, number];
  carRotation: number;
  carSpeed: number; // km/h
  isAutoDriving: boolean;
  activeModal: SectionId | 'leaderboard' | null;
  audioMuted: boolean;
  cameraMode: 'third-person' | 'hood' | 'top-down';
  score: number;
  highScore: number;
  hasCrashed: boolean;
  hasFinished: boolean;
  isPaused: boolean;
  leaderboard: ScoreEntry[];
  scorePopups: ScorePopup[];
}
