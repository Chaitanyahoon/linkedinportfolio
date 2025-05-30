// Demo data to populate your Sanity studio initially
export const demoProjects = [
  {
    title: "Fuel'n'Fix",
    description: "Emergency fuel delivery platform with real-time tracking and payment integration",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Stripe"],
    featured: true,
    order: 1,
  },
  {
    title: "VirtuSpace",
    description: "WebAR furniture visualization platform using cutting-edge web technologies",
    category: "webar",
    technologies: ["Next.js", "Three.js", "WebXR", "TypeScript", "Tailwind CSS"],
    featured: true,
    order: 2,
  },
  {
    title: "TaskFlow Pro",
    description: "Advanced project management tool with team collaboration features",
    category: "saas",
    technologies: ["React", "Express", "PostgreSQL", "Redis", "Docker"],
    featured: false,
    order: 3,
  },
  {
    title: "EcoTracker",
    description: "Environmental impact tracking app with data visualization",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Chart.js", "Node.js"],
    featured: false,
    order: 4,
  },
]

export const demoExperiences = [
  {
    title: "Full Stack Developer",
    company: "Softweb IT Services",
    startDate: "2023-01-01",
    current: true,
    description:
      "Developed scalable web applications using React and Node.js, implemented microservices architecture, and optimized database performance.",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    order: 1,
  },
  {
    title: "React Developer",
    company: "InfoLabz",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    current: false,
    description:
      "Built responsive user interfaces and optimized application performance, collaborated with design team to implement pixel-perfect designs.",
    skills: ["React", "JavaScript", "CSS", "Redux", "Jest"],
    order: 2,
  },
  {
    title: "Campus Ambassador",
    company: "IIT Bombay E-Cell",
    startDate: "2021-01-01",
    endDate: "2022-01-01",
    current: false,
    description:
      "Promoted entrepreneurship initiatives and organized tech events, managed social media presence and community engagement.",
    skills: ["Leadership", "Event Management", "Marketing", "Communication"],
    order: 3,
  },
]

export const demoSkills = [
  { name: "JavaScript", category: "frontend", proficiency: 5, order: 1 },
  { name: "TypeScript", category: "frontend", proficiency: 4, order: 2 },
  { name: "React", category: "frontend", proficiency: 5, order: 3 },
  { name: "Next.js", category: "frontend", proficiency: 4, order: 4 },
  { name: "Node.js", category: "backend", proficiency: 4, order: 5 },
  { name: "MongoDB", category: "database", proficiency: 4, order: 6 },
  { name: "PostgreSQL", category: "database", proficiency: 3, order: 7 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 5, order: 8 },
  { name: "Three.js", category: "frontend", proficiency: 3, order: 9 },
  { name: "WebXR", category: "other", proficiency: 3, order: 10 },
]

export const demoCertifications = [
  {
    name: "Google Cloud Professional",
    issuer: "Google",
    issueDate: "2023-06-01",
    order: 1,
  },
  {
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    issueDate: "2023-03-01",
    order: 2,
  },
  {
    name: "Data Science Certification",
    issuer: "Tata",
    issueDate: "2022-12-01",
    order: 3,
  },
  {
    name: "Full Stack Development",
    issuer: "Cognizant",
    issueDate: "2022-09-01",
    order: 4,
  },
]
