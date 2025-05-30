"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Moon,
  Sun,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Calendar,
  Award,
  ArrowRight,
  Code,
  Database,
  Smartphone,
  Globe,
  Zap,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { getProjects, getExperiences, getCertifications, getSkills, formatDateRange } from "@/lib/sanity"
import type { Project, Experience, Certification, Skill } from "@/lib/sanity"
import { ProjectSkeleton, ExperienceSkeleton } from "@/components/loading-skeleton"
import { ProjectFilter } from "@/components/project-filter"

export default function PortfolioContent() {
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, experiencesData, certificationsData, skillsData] = await Promise.all([
          getProjects(),
          getExperiences(),
          getCertifications(),
          getSkills(),
        ])

        setProjects(projectsData)
        setExperiences(experiencesData)
        setCertifications(certificationsData)
        setSkills(skillsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory))
    }
  }, [projects, activeCategory])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-slate-700"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-t-amber-500 absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  const categories = Array.from(new Set(projects.map((project) => project.category)))

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100">
        {/* Navigation */}
        <nav className="fixed top-0 w-full glass-morphism z-50 border-b border-slate-200/20 dark:border-slate-700/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="font-bold text-2xl premium-heading">CP</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-10">
                {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 hover:text-amber-600 dark:hover:text-amber-400 relative ${
                      activeSection === item.toLowerCase()
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300"
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden glass-morphism border-t border-slate-200/20 dark:border-slate-700/20">
              <div className="px-6 pt-4 pb-6 space-y-2">
                {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 w-full text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-slate-100/50 dark:from-amber-900/10 dark:via-transparent dark:to-slate-800/50"></div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 premium-heading leading-tight">
                Chaitanya Patil
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-8 font-light">
                Full Stack Developer | React Enthusiast
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
                Crafting exceptional digital experiences with modern web technologies and innovative solutions that
                bridge creativity with functionality
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-delay-2">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="premium-button bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 text-lg font-medium rounded-full shadow-lg"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="premium-button border-2 border-slate-300 dark:border-slate-600 hover:border-amber-500 dark:hover:border-amber-400 px-10 py-4 text-lg font-medium rounded-full"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">About Me</h2>
              <div className="section-divider max-w-24 mx-auto"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Passionate about creating digital solutions that make a difference. With a strong foundation in modern
                web technologies and a keen eye for user experience, I transform ideas into reality.
              </p>
            </div>

            {/* Personal Introduction */}
            <div className="mb-20">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-6 animate-slide-in-left">
                  <div className="premium-card p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                      <Code className="w-6 h-6 mr-3 text-amber-600" />
                      My Journey
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      My journey into web development began with a simple curiosity about how websites come to life.
                      What started as tinkering with HTML and CSS quickly evolved into a deep passion for creating
                      digital experiences that matter. I've transformed from someone who wondered "how does this work?"
                      to someone who asks "how can we make this better?"
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Today, I specialize in architecting full-stack applications using React, Node.js, and cutting-edge
                      technologies like WebAR. Every project is an opportunity to push boundaries, solve complex
                      challenges, and deliver solutions that not only meet requirements but exceed expectations. I
                      believe in writing code that tells a story and building applications that make a difference.
                    </p>
                  </div>

                  <div className="premium-card p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 flex items-center">
                      <Zap className="w-6 h-6 mr-3 text-amber-600" />
                      What Drives Me
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      I believe in the power of technology to transform businesses and improve lives. Whether it's
                      developing an emergency fuel delivery platform or creating immersive WebAR experiences, I'm driven
                      by the challenge of turning complex problems into elegant, intuitive solutions.
                    </p>
                  </div>
                </div>

                <div className="animate-slide-in-right space-y-6">
                  {/* Innovation Focus Areas */}
                  <div className="premium-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">WebAR Pioneer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Pushing boundaries in web-based AR</p>
                      </div>
                    </div>
                  </div>

                  <div className="premium-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Scalable Architecture</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Building for tomorrow's demands</p>
                      </div>
                    </div>
                  </div>

                  <div className="premium-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Cross-Platform Expert</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">One codebase, multiple platforms</p>
                      </div>
                    </div>
                  </div>

                  <div className="premium-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Clean Code Advocate</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Quality over quantity approach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills and Expertise */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="animate-slide-in-left">
                <h3 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200">Skills & Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill._id}
                      className="premium-card px-4 py-3 rounded-xl text-center text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 animate-slide-in-right">
                <div className="premium-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 mr-3 text-amber-600" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Frontend Development</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Crafting responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks. I
                    focus on creating seamless user experiences that are both beautiful and functional.
                  </p>
                </div>

                <div className="premium-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Database className="w-6 h-6 mr-3 text-amber-600" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Backend Development</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Building robust APIs and server-side applications with Node.js, Express, and database management. I
                    architect scalable solutions that can grow with your business needs.
                  </p>
                </div>

                <div className="premium-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Smartphone className="w-6 h-6 mr-3 text-amber-600" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Emerging Technologies</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Exploring WebAR, 3D web experiences, and cutting-edge technologies. I stay ahead of the curve to
                    bring innovative solutions to complex challenges.
                  </p>
                </div>

                <div className="premium-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 mr-3 text-amber-600" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">Collaboration & Leadership</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Experienced in leading development teams and collaborating with cross-functional stakeholders. I
                    believe great products are built through effective communication and shared vision.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy & Approach */}
            <div className="mt-20">
              <div className="premium-card p-12 rounded-2xl shadow-lg text-center">
                <h3 className="text-3xl font-bold mb-6 premium-heading">My Development Philosophy</h3>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-amber-600" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">Clean Code</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Writing maintainable, readable code that stands the test of time and scales with your needs.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-amber-600" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">User-Centric</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Every decision is made with the end user in mind, ensuring intuitive and delightful experiences.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-amber-600" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">Performance</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      Optimizing for speed and efficiency to deliver fast, responsive applications that users love.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">Featured Projects</h2>
              <div className="section-divider max-w-24 mx-auto"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                A showcase of my recent work across different technologies and domains
              </p>
            </div>

            <ProjectFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="relative">
              {loading ? (
                <div className="flex overflow-x-auto pb-8 space-x-8 scrollbar-hide">
                  {[...Array(3)].map((_, i) => (
                    <ProjectSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="flex overflow-x-auto pb-8 space-x-8 scrollbar-hide">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project._id}
                      className="flex-none w-96 premium-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg?height=240&width=384"}
                          alt={project.title}
                          width={384}
                          height={240}
                          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-6 right-6">
                          <span className="px-4 py-2 bg-amber-500 text-white text-xs font-medium rounded-full shadow-lg">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">{project.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {project.projectUrl && (
                            <Button variant="outline" className="flex-1 premium-button" asChild>
                              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="outline" className="flex-1 premium-button" asChild>
                              <a href="https://github.com/chaitanyahoon" target="_blank" rel="noopener noreferrer">
                                <Github className="h-6 w-6" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-8">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
                  ← Scroll to explore more projects →
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">Experience</h2>
              <div className="section-divider max-w-24 mx-auto"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                My professional journey and key milestones
              </p>
            </div>

            <div className="relative">
              {loading ? (
                <div className="relative">
                  <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-amber-600"></div>
                  {[...Array(3)].map((_, i) => (
                    <ExperienceSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-amber-600"></div>

                  {experiences.map((exp, index) => (
                    <div key={exp._id} className="relative mb-16">
                      <div className="flex items-center mb-6">
                        <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div
                          className={`ml-20 md:ml-0 ${
                            index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                          } md:w-1/2`}
                        >
                          <div className="premium-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-200">{exp.title}</h3>
                            <h4 className="text-amber-600 dark:text-amber-400 font-semibold mb-3 text-lg">
                              {exp.company}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
                              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{exp.description}</p>
                            {exp.skills && exp.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {exp.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">Certifications</h2>
              <div className="section-divider max-w-24 mx-auto"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Professional certifications and achievements
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <div
                  key={cert._id}
                  className="premium-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 group"
                >
                  {cert.logo ? (
                    <Image
                      src={cert.logo || "/placeholder.svg"}
                      alt={`${cert.issuer} logo`}
                      width={64}
                      height={64}
                      className="w-16 h-16 mx-auto mb-6 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Award className="w-16 h-16 text-amber-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-slate-200">{cert.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 font-medium">{cert.issuer}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors duration-300"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">Get In Touch</h2>
              <div className="section-divider max-w-24 mx-auto"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Let's discuss your next project or opportunity
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-slide-in-left">
                <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">chaitanyapatil700@gmail.com</span>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">+91 9724917040</span>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Pune, India</span>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200">Follow Me</h4>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="lg" className="premium-button">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="lg" className="premium-button" asChild>
                      <a href="https://www.linkedin.com/in/chaitanyapatil700/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="animate-slide-in-right">
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full h-14 px-6 text-lg premium-focus rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-full h-14 px-6 text-lg premium-focus rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows={6}
                      className="w-full px-6 py-4 text-lg premium-focus rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
                      Sorry, there was an error sending your message. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 premium-button bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg font-medium rounded-xl shadow-lg disabled:opacity-50 transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-8 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-600 dark:text-slate-400 font-light">
              © {new Date().getFullYear()} Chaitanya Patil. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
