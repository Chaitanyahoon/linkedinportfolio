// Comment out Sanity imports and add static data for development
// import { client } from "@/sanity/lib/client"
// import {
//   projectsQuery,
//   experiencesQuery,
//   certificationsQuery,
//   skillsQuery,
//   featuredProjectsQuery,
// } from "@/sanity/lib/queries"

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  image: string
  category: string
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
}

export interface Experience {
  _id: string
  title: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  skills?: string[]
  order: number
}

export interface Certification {
  _id: string
  name: string
  issuer: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  logo?: string
  order: number
}

export interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  icon?: string
  order: number
}

// Static data for development
const staticProjects: Project[] = [
  {
    _id: "1",
    title: "Fuel'n'Fix",
    slug: { current: "fuel-n-fix" },
    description: "Emergency fuel delivery platform with real-time tracking and payment integration. This project helps users quickly locate and order fuel delivery services during emergencies, ensuring timely assistance.",
    image: "/images/fnf1.png",
    category: "Emergency Services",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    projectUrl: "https://fuel-n-fix-v2.vercel.app/",
    githubUrl: "https://github.com/Chaitanyahoon/fuel-n-fix",
    featured: true,
    order: 1,
  },
  {
    _id: "2",
    title: "VirtuSpace",
    slug: { current: "virtuspace" },
    description: "WebAR furniture visualization platform using cutting-edge web technologies. This project allows users to visualize furniture in their space using augmented reality, enhancing the shopping experience.",
    image: "/images/vs1.png",
    category: "AR/VR",
    technologies: ["Next.js", "Three.js", "WebXR", "TypeScript", "Tailwind CSS"],
    projectUrl: "https://virtuspace-six.vercel.app/",
    githubUrl: "https://github.com/Chaitanyahoon/Virtuspace",
    featured: true,
    order: 2,
  },
  {
    _id: "3",
    title: "Planthesia",
    slug: { current: "planthesia" },
    description: "A time management webapp and task management platform designed to calculate insights and improve work efficiency. This project helps users streamline their workflow, track progress, and manage resources efficiently.",
    image: "/images/image.png",
    category: "Productivity",
    technologies: ["React", "Express", "PostgreSQL", "Redis", "Docker"],
    projectUrl: "https://planthesia.vercel.app/dashboard",
    githubUrl: "https://github.com/Chaitanyahoon/Planthesia",
    featured: false,
    order: 3,
  },
  {
    _id: "4",
    title: "Job Flux",
    slug: { current: "job-flux" },
    description: "A platform for finding jobs, currently in beta stage, powered by AI to help users discover better opportunities. This project leverages artificial intelligence to match users with suitable job openings and improve their career prospects.",
    image: "/images/jf1.png",
    category: "Job Search",
    technologies: ["React Native", "Firebase", "Chart.js", "Node.js"],
    projectUrl: "https://jobflux-xi.vercel.app/",
    githubUrl: "https://github.com/Chaitanyahoon/jobflux",
    featured: false,
    order: 4,
  },
]

const staticExperiences: Experience[] = [
  {
    _id: "1",
    title: "Full Stack Developer",
    company: "Softweb IT Services",
    startDate: "2024-01-20",
    endDate: "2025-05-31",
    current: false,
    description:
      "Developed scalable web applications using React and Node.js, implemented microservices architecture, and optimized database performance for enterprise clients.",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Docker", "Microservices"],
    order: 1,
  },
  {
    _id: "2",
    title: "React Developer",
    company: "InfoLabz",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    current: false,
    description:
      "Built responsive user interfaces and optimized application performance, collaborated with design team to implement pixel-perfect designs and improve user experience.",
    skills: ["React", "JavaScript", "CSS", "Redux", "Jest", "Figma"],
    order: 2,
  },
  {
    _id: "3",
    title: "Campus Ambassador",
    company: "IIT Bombay E-Cell",
    startDate: "2024-08-01",
    endDate: "2024-12-31",
    current: false,
    description:
      "Promoted entrepreneurship initiatives and organized tech events, managed social media presence and community engagement, coordinated with 50+ startups.",
    skills: ["Leadership", "Event Management", "Marketing", "Communication", "Social Media"],
    order: 3,
  },
]

const staticSkills: Skill[] = [
  { _id: "1", name: "JavaScript", category: "frontend", proficiency: 5, order: 1 },
  { _id: "2", name: "TypeScript", category: "frontend", proficiency: 4, order: 2 },
  { _id: "3", name: "React", category: "frontend", proficiency: 5, order: 3 },
  { _id: "4", name: "Next.js", category: "frontend", proficiency: 4, order: 4 },
  { _id: "5", name: "HTML5", category: "frontend", proficiency: 5, order: 5 },
  { _id: "6", name: "CSS3", category: "frontend", proficiency: 5, order: 6 },
  { _id: "7", name: "Tailwind CSS", category: "frontend", proficiency: 5, order: 7 },
  { _id: "8", name: "SCSS/Sass", category: "frontend", proficiency: 4, order: 8 },
  { _id: "9", name: "Node.js", category: "backend", proficiency: 4, order: 9 },
  { _id: "10", name: "Express.js", category: "backend", proficiency: 4, order: 10 },
  { _id: "11", name: "PHP", category: "backend", proficiency: 3, order: 11 },
  { _id: "12", name: "MongoDB", category: "database", proficiency: 4, order: 12 },
  { _id: "13", name: "PostgreSQL", category: "database", proficiency: 3, order: 13 },
  { _id: "14", name: "MySQL", category: "database", proficiency: 4, order: 14 },
  { _id: "15", name: "Three.js", category: "frontend", proficiency: 3, order: 15 },
  { _id: "16", name: "WebXR", category: "other", proficiency: 3, order: 16 },
  { _id: "17", name: "Git", category: "devops", proficiency: 4, order: 17 },
  { _id: "18", name: "Docker", category: "devops", proficiency: 3, order: 18 },
  { _id: "19", name: "AWS", category: "devops", proficiency: 3, order: 19 },
  { _id: "20", name: "REST APIs", category: "backend", proficiency: 4, order: 20 },
  { _id: "21", name: "GraphQL", category: "backend", proficiency: 3, order: 21 },
  { _id: "22", name: "Redux", category: "frontend", proficiency: 4, order: 22 },
  { _id: "23", name: "Vue.js", category: "frontend", proficiency: 3, order: 23 },
  { _id: "24", name: "Bootstrap", category: "frontend", proficiency: 4, order: 24 },
]

const staticCertifications: Certification[] = [
  {
    _id: "1",
    name: "Google Cloud Professional",
    issuer: "Google",
    issueDate: "2023-06-01",
    credentialUrl: "https://cloud.google.com/certification",
    order: 1,
  },
  {
    _id: "2",
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    issueDate: "2023-03-01",
    credentialUrl: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
    order: 2,
  },
  {
    _id: "3",
    name: "Data Science Certification",
    issuer: "Tata",
    issueDate: "2022-12-01",
    order: 3,
  },
  {
    _id: "4",
    name: "Full Stack Development",
    issuer: "Cognizant",
    issueDate: "2022-09-01",
    order: 4,
  },
]

// Mock async functions that return static data
export async function getProjects(): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return staticProjects
}

export async function getFeaturedProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return staticProjects.filter((project) => project.featured)
}

export async function getExperiences(): Promise<Experience[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return staticExperiences
}

export async function getCertifications(): Promise<Certification[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return staticCertifications
}

export async function getSkills(): Promise<Skill[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return staticSkills
}

export function formatDateRange(startDate: string, endDate?: string, current?: boolean): string {
  const start = new Date(startDate).getFullYear()

  if (current) {
    return `${start} - Present`
  }

  if (endDate) {
    const end = new Date(endDate).getFullYear()
    return `${start} - ${end}`
  }

  return start.toString()
}
