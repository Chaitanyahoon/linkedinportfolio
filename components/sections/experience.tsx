"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Briefcase, ChevronRight } from "lucide-react"
import { formatDateRange } from "@/lib/data"
import type { Experience } from "@/lib/data"
import { FadeIn } from "@/components/ui/fade-in"

interface ExperienceSectionProps {
    experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section
            id="internships"
            className="py-32 px-6 lg:px-8 relative overflow-hidden"
            ref={containerRef}
        >
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <FadeIn direction="down" delay={0.2}>
                        <h2 className="text-5xl md:text-6xl font-black mb-6 premium-heading tracking-tight">
                            Experience
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-8"></div>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            My professional journey through internships and key milestones, building scalable solutions and learning from the best.
                        </p>
                    </FadeIn>
                </div>

                <div className="relative">
                    {/* Central Gradient Line */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/50 to-transparent md:block hidden" />

                    <div className="space-y-24">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0
                            return (
                                <div key={exp._id} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

                                    {/* Timeline Node */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary z-20 shadow-[0_0_20px_rgba(124,58,237,0.5)] hidden md:block">
                                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                                    </div>

                                    {/* Mobile Timeline Connector (hidden on desktop) */}
                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:hidden" />

                                    {/* Content Card */}
                                    <div className={`w-[calc(100%-3rem)] ml-12 md:w-[calc(50%-40px)] md:ml-0 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                                        <FadeIn
                                            direction={isLeft ? "right" : "left"}
                                            delay={index * 0.2}
                                            className="h-full"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                className="group relative h-full bg-card/40 backdrop-blur-md rounded-3xl p-1 border border-white/10 overflow-hidden"
                                            >
                                                {/* Card Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="relative bg-card/60 backdrop-blur-xl rounded-[20px] p-6 md:p-8 h-full border border-white/5 transition-colors group-hover:border-primary/20">
                                                    {/* Company Header */}
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="p-3 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-colors">
                                                            <Briefcase className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase tracking-wider">
                                                            {exp.type || "Internship"}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <span className="text-lg font-medium text-muted-foreground">{exp.company}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                        <span className="text-sm text-primary/80 font-mono">
                                                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                                                        </span>
                                                    </div>

                                                    <p className="text-muted-foreground leading-relaxed mb-8">
                                                        {exp.description}
                                                    </p>

                                                    {/* Skills Tags */}
                                                    {exp.skills && exp.skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                                            {exp.skills.map((skill) => (
                                                                <span
                                                                    key={skill}
                                                                    className="px-3 py-1 bg-secondary/10 hover:bg-secondary/20 text-sky-400 dark:text-sky-300 text-xs font-bold rounded-lg transition-colors cursor-default border border-secondary/20"
                                                                >
                                                                    #{skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </FadeIn>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
