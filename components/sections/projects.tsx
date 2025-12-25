"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectFilter } from "@/components/project-filter"
import type { Project } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import { ShowcaseCard } from "@/components/ui/showcase-card"

interface ProjectsProps {
    projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
    const [activeCategory, setActiveCategory] = useState("all")

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter((project) => project.category === activeCategory)


    const categories = Array.from(new Set(projects.map((project) => project.category)))

    return (
        <section id="projects" className="py-24 px-6 lg:px-8 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl sm:text-5xl font-bold mb-6 premium-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Featured Projects
                    </motion.h2>
                    <div className="section-divider max-w-24 mx-auto"></div>
                    <motion.p
                        className="text-xl text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        A showcase of my recent work across different technologies and domains
                    </motion.p>
                </div>

                <ProjectFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div className="relative mt-12">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                        delay: index * 0.1
                                    }}
                                    key={project._id}
                                >
                                    <ShowcaseCard
                                        title={project.title}
                                        description={project.description}
                                        image={project.image}
                                        tags={project.technologies}
                                        href={project.projectUrl}
                                        githubUrl={project.githubUrl}
                                        category={project.category}
                                        overview={project.description.slice(0, 50) + "..."} // Simple overview for now
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
