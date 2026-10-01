import { ProjectItem, ExperienceItem, SkillCategory, SectionWaypoint } from '../types';

export const SECTION_WAYPOINTS: SectionWaypoint[] = [
  {
    id: 'start',
    title: 'LAUNCHPAD',
    subtitle: 'Futuristic Night Track',
    zPosition: 0,
    iconName: 'Play',
    color: '#00f0ff',
  },
  {
    id: 'about',
    title: 'ABOUT ME',
    subtitle: 'Architect & Creative Technologist',
    zPosition: -70,
    iconName: 'User',
    color: '#7000ff',
  },
  {
    id: 'experience',
    title: 'EXPERIENCE',
    subtitle: 'Career & Milestones',
    zPosition: -150,
    iconName: 'Briefcase',
    color: '#ff007f',
  },
  {
    id: 'projects',
    title: 'FEATURED PROJECTS',
    subtitle: 'Full-Stack & Web Apps',
    zPosition: -240,
    iconName: 'Code',
    color: '#00ff66',
  },
  {
    id: 'skills',
    title: 'TECH MATRIX',
    subtitle: 'Core Capabilities & Tools',
    zPosition: -330,
    iconName: 'Cpu',
    color: '#ffaa00',
  },
  {
    id: 'ai',
    title: 'AI & MACHINE LEARNING',
    subtitle: 'Intelligent Systems & Neural Nets',
    zPosition: -420,
    iconName: 'Brain',
    color: '#00d2ff',
  },
  {
    id: 'games',
    title: 'CREATIVE & GAMES',
    subtitle: '3D Simulation & Graphics',
    zPosition: -510,
    iconName: 'Gamepad2',
    color: '#e040fb',
  },
  {
    id: 'contact',
    title: 'CONTACT & RESUME',
    subtitle: 'Get In Touch',
    zPosition: -600,
    iconName: 'Mail',
    color: '#00ffcc',
  },
];

export const PERSONAL_INFO = {
  name: 'Deven Rajput',
  role: 'Full Stack Engineer & Creative Technologist',
  tagline: 'Crafting immersive 3D web experiences, high-performance applications, and AI-driven platforms.',
  bio: 'Passionate developer with expertise in React, Three.js, TypeScript, Node.js, and modern WebGL graphics. I bridge the gap between complex software engineering and interactive visual design to build memorable digital products.',
  location: 'Mumbai, India',
  email: 'devenrajput.dev@gmail.com',
  github: 'https://github.com/bossdevhere',
  linkedin: 'https://linkedin.com/in/devenrajput',
  twitter: 'https://twitter.com/devenrajput',
  resumeUrl: '#',
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Full Stack & 3D Developer',
    company: 'Apex Digital Labs',
    period: '2024 — Present',
    location: 'Remote',
    description: [
      'Led development of interactive 3D web applications using React, Three.js, R3F, and GSAP.',
      'Optimized 3D asset pipelines, reducing GLTF bundle sizes by 65% and achieving steady 60 FPS performance.',
      'Architected micro-frontend systems and high-throughput REST/GraphQL APIs for enterprise clients.'
    ],
    skills: ['React', 'Three.js', 'R3F', 'TypeScript', 'Node.js', 'WebGL', 'Tailwind CSS']
  },
  {
    id: 'exp-2',
    role: 'Frontend & Interactive Engineer',
    company: 'Nexus Creative Studio',
    period: '2022 — 2024',
    location: 'Hybrid',
    description: [
      'Built custom WebGL shaders, particle systems, and kinetic UI animations for award-winning marketing sites.',
      'Collaborated with 3D artists to integrate complex rigged GLTF models and WebAudio synthesizers.',
      'Implemented automated CI/CD deployment workflows and cross-browser performance benchmarks.'
    ],
    skills: ['React', 'GSAP', 'Three.js', 'Vite', 'CSS Modules', 'Web Audio API']
  },
  {
    id: 'exp-3',
    role: 'Software Development Engineer',
    company: 'InnovateX Technologies',
    period: '2021 — 2022',
    location: 'On-site',
    description: [
      'Developed real-time dashboard analytics platforms processing over 500k daily WebSocket events.',
      'Designed modular React component libraries with 95%+ unit test coverage using Jest & React Testing Library.'
    ],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Docker']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'CyberVerse 3D Metaverse',
    category: 'Interactive 3D / WebGL',
    description: 'Real-time multiplayer 3D virtual environment with spatial audio, custom avatar customization, and dynamic lighting.',
    tags: ['Three.js', 'React', 'TypeScript', 'WebSockets', 'GLSL'],
    github: 'https://github.com/bossdevhere/cyberverse-3d',
    link: 'https://cyberverse-demo.com',
    featured: true,
    metrics: '60 FPS • Multi-user Spatial Audio'
  },
  {
    id: 'proj-2',
    title: 'NeuralVision AI Studio',
    category: 'AI / Computer Vision',
    description: 'Browser-based generative AI design tool providing instant text-to-3D mesh generation and real-time PBR material preview.',
    tags: ['Python', 'FastAPI', 'React', 'Three.js', 'PyTorch'],
    github: 'https://github.com/bossdevhere/neural-vision-ai',
    link: 'https://neuralvision.app',
    featured: true,
    metrics: 'Sub-second Inference • PBR Renderer'
  },
  {
    id: 'proj-3',
    title: 'HyperDrive Telemetry Systems',
    category: 'Full Stack Dashboard',
    description: 'High-frequency telemetry dashboard for electric vehicle fleets featuring real-time 3D canvas rendering and anomaly detection.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Go'],
    github: 'https://github.com/bossdevhere/hyperdrive-telemetry',
    link: 'https://telemetry-demo.app',
    featured: true,
    metrics: '50k msg/sec • Zero Latency'
  },
  {
    id: 'proj-4',
    title: 'Pulse Audio Synthesizer',
    category: 'Web Audio / Creative Coding',
    description: 'Node-based modular audio synthesizer built inside Web Audio API with visual equalizer reactive 3D visualizers.',
    tags: ['JavaScript', 'Web Audio API', 'Canvas2D', 'GSAP'],
    github: 'https://github.com/bossdevhere/pulse-audio-synth',
    link: 'https://pulse-synth.dev',
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend & 3D Web',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Three.js / React Three Fiber', level: 90 },
      { name: 'GLSL Shaders & WebGL', level: 85 },
      { name: 'GSAP Animation', level: 90 },
      { name: 'Tailwind CSS / HTML5', level: 95 },
    ]
  },
  {
    name: 'Backend & Cloud',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Python / FastAPI', level: 82 },
      { name: 'PostgreSQL / MongoDB', level: 85 },
      { name: 'REST & GraphQL APIs', level: 90 },
      { name: 'Docker / CI/CD', level: 80 },
    ]
  },
  {
    name: 'Tools & Ecosystem',
    skills: [
      { name: 'Git & GitHub Workflows', level: 95 },
      { name: 'Vite / Webpack', level: 90 },
      { name: 'Blender 3D Modeling', level: 78 },
      { name: 'Figma UI/UX Design', level: 85 },
    ]
  }
];

export const AI_PROJECTS: ProjectItem[] = [
  {
    id: 'ai-1',
    title: 'Autonomous Navigation Sim',
    category: 'Robotics & Reinforcement Learning',
    description: '3D vehicle agent trained using Deep Q-Learning (DQN) to navigate obstacle courses smoothly in web browser.',
    tags: ['Python', 'TensorFlow.js', 'Three.js', 'Physics.js'],
    github: 'https://github.com/bossdevhere/auto-nav-sim',
    metrics: '98.4% Accuracy • Real-time Reinforcement'
  },
  {
    id: 'ai-2',
    title: 'CodeSynth LLM Assistant',
    category: 'NLP & AI Code Gen',
    description: 'Context-aware developer assistant agent capable of auto-generating unit tests and architectural refactoring suggestions.',
    tags: ['TypeScript', 'LangChain', 'OpenAI API', 'React'],
    github: 'https://github.com/bossdevhere/codesynth-ai',
    metrics: 'Stream Processing • Multi-file Refactoring'
  }
];

export const GAME_PROJECTS: ProjectItem[] = [
  {
    id: 'game-1',
    title: 'Neon Overdrive 1984',
    category: '3D Arcade Racer',
    description: 'Retro synthwave infinite driving game with dynamic synth soundtrack, powerups, particle trails, and local highscores.',
    tags: ['Three.js', 'R3F', 'Howler.js', 'GSAP'],
    github: 'https://github.com/bossdevhere/neon-overdrive',
    link: 'https://neon-overdrive.play',
    metrics: '60 FPS • Custom Physics Engine'
  },
  {
    id: 'game-2',
    title: 'Orbit Siege VR',
    category: 'WebXR Space Combat',
    description: 'Immersive WebXR zero-gravity space shooter playable directly in browser or Meta Quest headsets.',
    tags: ['WebXR', 'Three.js', 'WebAudio API'],
    github: 'https://github.com/bossdevhere/orbit-siege-vr',
    metrics: 'Cross-platform VR Support'
  }
];
