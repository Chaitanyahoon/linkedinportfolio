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

export const projects: Project[] = [
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
        order: 1,
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
        featured: true,
        order: 2,
    },
    {
        _id: "5",
        title: "StreetBite",
        slug: { current: "streetbite" },
        description: "Street food discovery platform with location-based vendor search, user authentication, vendor dashboard, menu management, and real-time analytics. Built with Spring Boot and Next.js for scalable food delivery solutions.",
        image: "/images/streetbite.png",
        category: "Food Tech",
        technologies: ["Spring Boot", "Next.js", "Firebase", "TypeScript", "Tailwind CSS"],
        projectUrl: "https://streetbitego.vercel.app/",
        githubUrl: "https://github.com/Chaitanyahoon/StreetBite",
        featured: true,
        order: 3,
    },
    {
        _id: "6",
        title: "GhostFrame",
        slug: { current: "ghostframe" },
        description: "A single-player glitch horror web game with psychological puzzles and code-based riddles. Experience a haunted, corrupted digital world with glitch effects, visual puzzles, and creepy sound design.",
        image: "/images/ghostframe.png",
        category: "Game Dev",
        technologies: ["Next.js", "Tailwind CSS", "Canvas API", "CSS Effects"],
        projectUrl: "https://ghostframe-seven.vercel.app",
        githubUrl: "https://github.com/Chaitanyahoon/ghostframe",
        featured: true,
        order: 4,
    },
    {
        _id: "7",
        title: "ScamSentry",
        slug: { current: "scamsentry" },
        description: "Scam reporting and prevention platform with anonymous reporting, interactive global scam map, AI-powered trust scoring, and safe companies directory. Helps users identify and avoid fraudulent job offers and scams.",
        image: "/images/scamsentry.png",
        category: "Security",
        technologies: ["Next.js", "React", "Mapbox", "Firebase", "Tailwind CSS"],
        projectUrl: "https://scam-sentry.vercel.app",
        githubUrl: "https://github.com/Chaitanyahoon/ScamSentry",
        featured: true,
        order: 5,
    },
]

export const experiences: Experience[] = [
    {
        _id: "1",
        title: "Full Stack Developer Intern",
        company: "Softweb IT Services",
        startDate: "2025-01-01",
        endDate: "2025-05-31",
        current: false,
        description:
            "Developed scalable web applications using React and Node.js, implemented microservices architecture, and optimized database performance for enterprise clients.",
        skills: ["React", "Node.js", "MongoDB", "AWS", "Docker", "Microservices"],
        order: 1,
    },
    {
        _id: "2",
        title: "React Developer Intern",
        company: "InfoLabz",
        startDate: "2024-06-01",
        endDate: "2024-07-31",
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
        startDate: "2024-07-01",
        endDate: "2024-12-31",
        current: false,
        description:
            "Promoted entrepreneurship initiatives and organized tech events, managed social media presence and community engagement, coordinated with 50+ startups.",
        skills: ["Leadership", "Event Management", "Marketing", "Communication", "Social Media"],
        order: 3,
    },
]

export const skills: Skill[] = [
    // Programming Foundations
    { _id: "1", name: "C", category: "backend", proficiency: 4, order: 1 },
    { _id: "2", name: "C++", category: "backend", proficiency: 4, order: 2 },
    { _id: "3", name: "Data Structures", category: "backend", proficiency: 4, order: 3 },
    { _id: "4", name: "Algorithms", category: "backend", proficiency: 4, order: 4 },

    // Java Technologies
    { _id: "5", name: "Core Java", category: "backend", proficiency: 5, order: 5 },
    { _id: "6", name: "J2EE (JDBC, Servlets, JSP)", category: "backend", proficiency: 4, order: 6 },
    { _id: "7", name: "Spring Boot", category: "backend", proficiency: 4, order: 7 }, // Assuming Spring Boot as part of modern Java

    // .NET Module
    { _id: "8", name: "C#", category: "backend", proficiency: 4, order: 8 },
    { _id: "9", name: ".NET Framework", category: "backend", proficiency: 4, order: 9 },
    { _id: "10", name: "ASP.NET", category: "backend", proficiency: 4, order: 10 },

    // Web Technologies (Frontend)
    { _id: "11", name: "HTML5", category: "frontend", proficiency: 5, order: 11 },
    { _id: "12", name: "CSS3", category: "frontend", proficiency: 5, order: 12 },
    { _id: "13", name: "JavaScript", category: "frontend", proficiency: 5, order: 13 },
    { _id: "14", name: "React", category: "frontend", proficiency: 5, order: 14 },
    { _id: "15", name: "Bootstrap", category: "frontend", proficiency: 5, order: 15 },
    { _id: "16", name: "jQuery", category: "frontend", proficiency: 4, order: 16 },
    { _id: "17", name: "AJAX", category: "frontend", proficiency: 4, order: 17 },

    // Database
    { _id: "18", name: "MySQL", category: "database", proficiency: 5, order: 18 },
    { _id: "19", name: "MongoDB", category: "database", proficiency: 4, order: 19 },
    { _id: "20", name: "SQLite", category: "database", proficiency: 3, order: 20 },

    // OS & Networking (DevOps/Infra)
    { _id: "21", name: "Linux", category: "devops", proficiency: 4, order: 21 },
    { _id: "22", name: "Shell Scripting", category: "devops", proficiency: 3, order: 22 },
    { _id: "23", name: "Docker", category: "devops", proficiency: 3, order: 23 },
    { _id: "24", name: "Git & GitHub", category: "devops", proficiency: 5, order: 24 },

    // Mobile
    { _id: "25", name: "Android", category: "mobile", proficiency: 3, order: 25 },
    { _id: "26", name: "React Native", category: "mobile", proficiency: 4, order: 26 },

    // Tools & Testing
    { _id: "27", name: "Postman", category: "tools", proficiency: 5, order: 27 },
    { _id: "28", name: "JUnit", category: "tools", proficiency: 4, order: 28 },
    { _id: "29", name: "Maven/Gradle", category: "tools", proficiency: 4, order: 29 },
    { _id: "30", name: "VS Code / IntelliJ", category: "tools", proficiency: 5, order: 30 },
    { _id: "31", name: "SDLC & Agile", category: "tools", proficiency: 5, order: 31 },
]

export const certifications: Certification[] = [
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

export function formatDateRange(startDate: string, endDate?: string, current?: boolean): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const startMonth = months[new Date(startDate).getMonth()]
    const startYear = new Date(startDate).getFullYear()

    if (current) {
        return `${startMonth} ${startYear} - Present`
    }

    if (endDate) {
        const endMonth = months[new Date(endDate).getMonth()]
        const endYear = new Date(endDate).getFullYear()
        return `${startMonth} ${startYear} - ${endMonth} ${endYear}`
    }

    return `${startMonth} ${startYear}`
}
