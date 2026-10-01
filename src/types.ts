export type SectionId = 
  | 'start'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'ai'
  | 'games'
  | 'contact';

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
  image?: string;
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

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface GameState {
  hasStarted: boolean;
  currentSection: SectionId;
  targetZPosition: number;
  carPosition: [number, number, number];
  carRotation: number;
  carSpeed: number; // km/h
  isAutoDriving: boolean;
  activeModal: SectionId | null;
  audioMuted: boolean;
  cameraMode: 'third-person' | 'hood' | 'top-down';
  debugMode: boolean;
}
