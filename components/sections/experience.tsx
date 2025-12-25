"use client"

import { Calendar } from "lucide-react"
import { formatDateRange } from "@/lib/data"
import type { Experience } from "@/lib/data"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

interface ExperienceSectionProps {
    experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
    return (
        <section
            id="internships"
            className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
        >
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <FadeIn direction="down" delay={0.2}>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">Internships</h2>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <div className="section-divider max-w-24 mx-auto"></div>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mt-6">
                            My professional journey through internships and key milestones
                        </p>
                    </FadeIn>
                </div>

                <div className="relative">
                    {/* Animated Timeline Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-6 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary"
                    ></motion.div>

                    {experiences.map((exp, index) => (
                        <div key={exp._id} className="relative mb-16">
                            <div className="flex items-center mb-6">
                                {/* Timeline Dot */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.2), type: "spring", stiffness: 200 }}
                                    className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-white dark:border-slate-800"
                                >
                                    <Calendar className="w-5 h-5 text-white" />
                                </motion.div>

                                <div
                                    className={`ml-20 md:ml-0 ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                                        } md:w-1/2 w-full`}
                                >
                                    <FadeIn
                                        direction={index % 2 === 0 ? "left" : "right"}
                                        delay={0.2 + (index * 0.1)}
                                        className="h-full"
                                    >
                                        <motion.div
                                            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                            className="premium-card p-8 rounded-2xl shadow-md border-t-4 border-t-primary h-full"
                                        >
                                            <h3 className="text-2xl font-bold mb-3 text-foreground">{exp.title}</h3>
                                            <h4 className="text-primary font-semibold mb-3 text-lg flex items-center gap-2">
                                                {exp.company}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mb-4 font-medium flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                                                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                                            </p>
                                            <p className="text-muted-foreground leading-relaxed mb-6">{exp.description}</p>
                                            {exp.skills && exp.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="px-3 py-1 bg-primary/10 text-primary-foreground text-xs font-bold rounded-full border border-primary/20"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    </FadeIn>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
