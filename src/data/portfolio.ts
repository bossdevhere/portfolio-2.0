import { ProjectItem, ExperienceItem, SkillCategory, SectionWaypoint, EducationItem } from '../types';

export const SECTION_WAYPOINTS: SectionWaypoint[] = [
  {
    id: 'start',
    title: 'LAUNCH PAD',
    subtitle: 'Start Track',
    zPosition: 0,
    iconName: 'Play',
    color: '#00ff66',
  },
  {
    id: 'about',
    title: 'ABOUT ME',
    subtitle: 'Full Stack Developer & AI/ML Enthusiast',
    zPosition: -70,
    iconName: 'User',
    color: '#00ff66',
  },
  {
    id: 'education',
    title: 'EDUCATION',
    subtitle: 'B.Tech CSE (AI & ML) — CMR Engineering College',
    zPosition: -140,
    iconName: 'GraduationCap',
    color: '#00ff66',
  },
  {
    id: 'experience',
    title: 'EXPERIENCE',
    subtitle: 'SUAS Enterprise & Braincell Infotech',
    zPosition: -220,
    iconName: 'Briefcase',
    color: '#00ff66',
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    subtitle: 'Skippr, GNN Traffic Prediction & Mobile Apps',
    zPosition: -300,
    iconName: 'Code',
    color: '#00ff66',
  },
  {
    id: 'skills',
    title: 'TECH MATRIX',
    subtitle: 'Frontend, Backend, AI/ML & Mobile',
    zPosition: -380,
    iconName: 'Cpu',
    color: '#00ff66',
  },
  {
    id: 'contact',
    title: 'CONTACT',
    subtitle: 'Get In Touch',
    zPosition: -460,
    iconName: 'Mail',
    color: '#00ff66',
  },
  {
    id: 'finish',
    title: 'FINISH',
    subtitle: 'The Road Ends Here',
    zPosition: -540,
    iconName: 'Trophy',
    color: '#00ff66',
  },
];

export const PERSONAL_INFO = {
  name: 'Deven Rajput',
  displayName: 'Deven',
  role: 'Full Stack Developer',
  secondaryRole: 'AI / ML Enthusiast',
  introduction: "Hi, I'm Deven Rajput, a Computer Science Engineering graduate specializing in Artificial Intelligence and Machine Learning. I build mobile and web applications and enjoy turning real-world ideas into useful products.",
  description: 'I work mainly with React Native, Flutter, React, Node.js and modern backend technologies, while also exploring AI/ML and LLM-based applications.',
  tags: ['Developer', 'Builder', 'Mobile Developer', 'Web Developer', 'AI/ML Enthusiast'],
  location: 'Hyderabad, India',
  email: 'devenrajput.dev@gmail.com',
  github: 'https://github.com/bossdevhere',
  githubUsername: 'bossdevhere',
  portfolioUrl: 'https://devenrajput.vercel.app',
  linkedin: 'https://linkedin.com/in/devenrajput',
  resumeUrl: '#',
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.TECH — COMPUTER SCIENCE ENGINEERING',
    institution: 'CMR Engineering College (JNTU Hyderabad)',
    period: '2022 — 2026',
    gpaOrGrade: 'Specialization: Artificial Intelligence & Machine Learning',
    details: [
      'Degree: B.Tech in Computer Science Engineering',
      'Specialization: Artificial Intelligence & Machine Learning',
      'College: CMR Engineering College',
      'University Affiliation: JNTU Hyderabad',
      'Duration: 2022 — 2026'
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'FULL STACK DEVELOPER',
    company: 'SUAS Enterprise Pvt. Ltd. (Startup / Skippr)',
    period: 'June 2026 — Present',
    location: 'Hybrid',
    description: [
      'Developing Skippr: A platform providing everyday services to societies and communities, including car cleaning, house cleaning, groceries, water can delivery, and local services.',
      'Building cross-platform mobile & PWA applications using React Native, Expo, JavaScript, Node.js, and Supabase.'
    ],
    skills: ['React Native', 'Expo', 'PWA', 'JavaScript', 'Node.js', 'Supabase', 'Full Stack']
  },
  {
    id: 'exp-2',
    role: 'FLUTTER DEVELOPMENT INTERN',
    company: 'Braincell Infotech Pvt. Ltd.',
    period: 'Nov 2025 — Dec 2025',
    location: 'Remote',
    description: [
      'Developed cross-platform mobile application modules using Flutter and Dart.',
      'Integrated real-time database services and cloud authentication with Firebase.'
    ],
    skills: ['Flutter', 'Dart', 'Firebase']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'SKIPPR',
    category: 'Full Stack / Mobile / PWA',
    description: 'An everyday services platform designed for societies and communities. Services include car cleaning, house cleaning, groceries, water can delivery, and local services.',
    tags: ['React Native', 'Expo', 'JavaScript', 'Node.js', 'Supabase', 'PWA'],
    github: 'https://github.com/bossdevhere/skippr',
    link: 'https://devenrajput.vercel.app',
    featured: true,
    metrics: 'Car Cleaning • Groceries • Water Can Delivery'
  },
  {
    id: 'proj-2',
    title: 'CELLULAR TRAFFIC PREDICTION',
    category: 'AI / Machine Learning',
    description: 'Machine Learning-Based Cellular Traffic Prediction Using Data Reduction Techniques. GNN-based LTE cellular traffic prediction.',
    tags: ['Python', 'PyTorch', 'Torch Geometric', 'GNN', 'Scikit-learn'],
    github: 'https://github.com/bossdevhere/cellular-traffic-prediction',
    featured: true,
    metrics: 'Graph Neural Networks • LTE Data Reduction'
  },
  {
    id: 'proj-3',
    title: 'FINEY',
    category: 'Mobile Application',
    description: 'Minimal personal finance and expense tracking application featuring expense tracking, calculator, notes, and to-do functionality.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    github: 'https://github.com/bossdevhere/finey',
    featured: true,
    metrics: 'Expense Tracking • Notes • Calculator'
  },
  {
    id: 'proj-4',
    title: 'CONVERSO CHATBOT',
    category: 'AI / Mobile Application',
    description: 'AI-powered conversational mobile application powered by OpenAI API.',
    tags: ['Flutter', 'Dart', 'OpenAI API'],
    github: 'https://github.com/bossdevhere/converso-chatbot',
    featured: false
  },
  {
    id: 'proj-5',
    title: 'FOOD DELIVERY APP',
    category: 'Mobile Application',
    description: 'Modern mobile food ordering and delivery application interface.',
    tags: ['Flutter', 'Dart'],
    github: 'https://github.com/bossdevhere/food-delivery-app',
    featured: false
  },
  {
    id: 'proj-6',
    title: 'COFFEE ORDERING APP',
    category: 'Mobile Application',
    description: 'Custom coffee ordering mobile app with real-time order tracking.',
    tags: ['Flutter', 'Firebase', 'Node.js'],
    github: 'https://github.com/bossdevhere/coffee-ordering-app',
    featured: false
  },
  {
    id: 'proj-7',
    title: 'LANGUAGE TRANSLATOR',
    category: 'Web Application',
    description: 'Instant multi-language translation web tool using MyMemory Translation API.',
    tags: ['Web', 'JavaScript', 'MyMemory API'],
    github: 'https://github.com/bossdevhere/language-translator',
    featured: false
  },
  {
    id: 'proj-8',
    title: 'NETFLIX WEB UI CLONE',
    category: 'Web Application',
    description: 'Responsive video streaming platform frontend clone with dynamic media sliders.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/bossdevhere/netflix-clone',
    featured: false
  },
  {
    id: 'proj-9',
    title: 'AMAZON WEB UI CLONE',
    category: 'Web Application',
    description: 'E-commerce marketplace homepage clone built with modern Web UI standards.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/bossdevhere/amazon-clone',
    featured: false
  },
  {
    id: 'proj-10',
    title: 'HOLEY.IO',
    category: 'Web Game',
    description: 'Browser-based battle royale game concept built with React and Phaser game engine.',
    tags: ['React', 'Phaser', 'Vite', 'JavaScript'],
    github: 'https://github.com/bossdevhere/holey-io',
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'FRONTEND',
    skills: [
      { name: 'React', level: 92 },
      { name: 'React Native', level: 90 },
      { name: 'Flutter', level: 88 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'GSAP', level: 85 },
      { name: 'Phaser', level: 80 },
      { name: 'Vite', level: 90 },
    ]
  },
  {
    name: 'BACKEND',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'Supabase', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Firebase', level: 85 },
      { name: 'JWT', level: 88 },
      { name: 'REST APIs', level: 90 },
    ]
  },
  {
    name: 'AI / MACHINE LEARNING',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'PyTorch', level: 82 },
      { name: 'Torch Geometric', level: 80 },
      { name: 'Graph Neural Networks', level: 82 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'LLM / Generative AI', level: 80 },
    ]
  },
  {
    name: 'MOBILE',
    skills: [
      { name: 'React Native', level: 90 },
      { name: 'Expo', level: 90 },
      { name: 'Flutter', level: 88 },
      { name: 'Dart', level: 85 },
      { name: 'Firebase', level: 85 },
    ]
  },
  {
    name: 'TOOLS',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'GitHub', level: 95 },
      { name: 'Vite', level: 90 },
      { name: 'npm', level: 92 },
      { name: 'pnpm', level: 85 },
    ]
  }
];

export const CURRENTLY_EXPLORING = [
  'LLMs & Generative AI Applications',
  'Data Structures & Algorithms (DSA)',
  'Competitive Programming',
  'System Design'
];
