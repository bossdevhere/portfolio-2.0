import { ProjectItem, ExperienceItem, SkillCategory, SectionWaypoint, EducationItem } from '../types';

export const SECTION_WAYPOINTS: SectionWaypoint[] = [
  {
    id: 'start',
    title: 'LAUNCHING PAD',
    subtitle: 'Start Track',
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
    id: 'education',
    title: 'EDUCATION',
    subtitle: 'Academic Foundations',
    zPosition: -140,
    iconName: 'GraduationCap',
    color: '#ff007f',
  },
  {
    id: 'experience',
    title: 'EXPERIENCE',
    subtitle: 'Career & Milestones',
    zPosition: -220,
    iconName: 'Briefcase',
    color: '#00ff66',
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    subtitle: 'Full-Stack & Web Apps',
    zPosition: -300,
    iconName: 'Code',
    color: '#ffaa00',
  },
  {
    id: 'skills',
    title: 'TECH MATRIX',
    subtitle: 'Core Capabilities & Tools',
    zPosition: -380,
    iconName: 'Cpu',
    color: '#00d2ff',
  },
  {
    id: 'contact',
    title: 'CONTACT',
    subtitle: 'Get In Touch',
    zPosition: -460,
    iconName: 'Mail',
    color: '#e040fb',
  },
  {
    id: 'finish',
    title: 'FINISH LINE',
    subtitle: 'Victory Checkpoint',
    zPosition: -540,
    iconName: 'Trophy',
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

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science',
    institution: 'University Department of Computer Science & Engineering',
    period: '2020 — 2024',
    gpaOrGrade: 'First Class with Distinction (8.9 / 10 CGPA)',
    details: [
      'Specialized in Computer Graphics, Algorithms, Software Architecture, and Web Engineering.',
      'Published research paper on WebGL performance optimizations in interactive web applications.',
      'Led the university Coding & Robotics Club, organizing regional hackathons with 500+ attendees.'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary School Certificate (HSC) — Science & Mathematics',
    institution: 'State Board of Secondary & Higher Secondary Education',
    period: '2018 — 2020',
    gpaOrGrade: '91.4% Marks',
    details: [
      'Top 1% in Mathematics, Physics, and Computer Science.',
      'Built early Java & C++ arcade games as high school capstone projects.'
    ]
  }
];

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
      'Collaborated with 3D artists to integrate complex rigged GLTF models and WebAudio synthesizers.'
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
      'Designed modular React component libraries with 95%+ unit test coverage.'
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

export const AI_PROJECTS: ProjectItem[] = [
  {
    id: 'ai-1',
    title: 'Autonomous Navigation Sim',
    category: 'Robotics & Reinforcement Learning',
    description: '3D vehicle agent trained using Deep Q-Learning (DQN) to navigate obstacle courses smoothly in web browser.',
    tags: ['Python', 'TensorFlow.js', 'Three.js', 'Physics.js'],
    github: 'https://github.com/bossdevhere/auto-nav-sim',
    metrics: '98.4% Accuracy • Real-time Reinforcement'
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
