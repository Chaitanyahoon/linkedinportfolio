"use client"
import { useMemo } from "react"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { Code, Database, Globe, Server, Terminal, Cpu, Award, Briefcase, GraduationCap, Smartphone, PenTool } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Skill } from "@/lib/data"
import { AnimatedNumber } from "@/components/ui/animated-number"

interface AboutProps {
    skills: Skill[]
}

export function About({ skills }: AboutProps) {
    // Group skills by category
    const categories = useMemo(() => ({
        backend: skills.filter(s => s.category === "backend"),
        frontend: skills.filter(s => s.category === "frontend"),
        database: skills.filter(s => s.category === "database"),
        devops: skills.filter(s => s.category === "devops"),
        mobile: skills.filter(s => s.category === "mobile"),
        tools: skills.filter(s => s.category === "tools"),
    }), [skills])

    const stats = [
        { icon: GraduationCap, label: "Course", value: "PG-DAC" },
        { icon: Briefcase, label: "Internships", value: "3" },
        { icon: Terminal, label: "Projects", value: "10+" },
        { icon: Award, label: "Certifications", value: "5+" },
    ]

    return (
        <section id="about" className="py-24 px-6 lg:px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-bl from-background via-purple-500/5 to-primary/5 -z-20"></div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        className="text-4xl sm:text-5xl font-bold mb-6 premium-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        About Me
                    </motion.h2>
                    <div className="section-divider max-w-24 mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto mb-24">
                    {/* Bio & Stats Grid */}
                    <FadeIn delay={0.2} className="text-center">
                        <h3 className="text-3xl font-bold mb-6 text-foreground">
                            Aspiring Software Engineer | <span className="text-primary">PG-DAC Student</span>
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                            I am currently pursuing the <strong>Post Graduate Diploma in Advanced Computing (PG-DAC)</strong> at
                            CDAC MET Nashik (Aug 2025 - Present). Having completed my <strong>Bachelor's in Engineering (Information Technology)</strong>
                            (2021-2025), I'm now diving deep into the core of computer science and modern software development—from low-level
                            programming in C/C++ to building scalable enterprise applications with Java and .NET. My journey is defined
                            by a relentless drive to master full-stack technologies and bridge the gap between theoretical concepts and
                            practical, real-world solutions.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => {
                                // Extract number and suffix if present
                                const match = stat.value.match(/^(\d+)(.*)$/);
                                const numberValue = match ? parseInt(match[1]) : null;
                                const suffix = match ? match[2] : stat.value;

                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5, borderColor: "hsl(var(--primary))", boxShadow: "0 10px 30px -10px rgba(124, 58, 237, 0.2)" }}
                                        className="p-6 bg-card rounded-2xl border border-border transition-all shadow-sm"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-3 bg-primary/10 rounded-full">
                                                <stat.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-0.5">
                                                    {numberValue !== null ? (
                                                        <>
                                                            <AnimatedNumber value={numberValue} />
                                                            {suffix}
                                                        </>
                                                    ) : (
                                                        stat.value
                                                    )}
                                                </p>
                                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Current Focus */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="mt-16 p-6 bg-primary/5 rounded-2xl border border-primary/20 inline-block backdrop-blur-sm"
                        >
                            <h4 className="text-lg font-semibold text-primary mb-2 flex items-center justify-center gap-2">
                                <Cpu className="w-5 h-5" />
                                Current Focus
                            </h4>
                            <p className="text-muted-foreground">
                                Exploring <span className="font-medium text-foreground">Cloud Native Architecture</span>, <span className="font-medium text-foreground">Docker & Kubernetes</span>, and <span className="font-medium text-foreground">Advanced Java</span>.
                            </p>
                        </motion.div>
                    </FadeIn>
                </div>

                {/* GitHub Stats */}
                <div className="max-w-4xl mx-auto mb-24 text-center">
                    <FadeIn delay={0.3}>
                        <h4 className="text-xl font-bold mb-8 flex items-center justify-center gap-2">
                            <span className="text-primary">#</span> Coding Activity
                        </h4>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="inline-block relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl"
                        >
                            <img
                                src="https://github-readme-stats.vercel.app/api?username=Chaitanyahoon&show_icons=true&hide_rank=true&hide_border=true&bg_color=00000000&text_color=e2e8f0&title_color=38bdf8&icon_color=38bdf8&count_private=true"
                                alt="Chaitanya's GitHub Stats"
                                className="w-full max-w-[500px] h-auto"
                            />
                        </motion.div>
                    </FadeIn>
                </div>

                {/* Skills Tabs */}
                <FadeIn delay={0.4} direction="up">
                    <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Technical Arsenal</h3>

                    <Tabs defaultValue="backend" className="w-full max-w-5xl mx-auto">
                        <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto p-2 bg-muted/50 rounded-2xl border border-white/5">
                            {Object.keys(categories).map(category => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="capitalize rounded-xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                                >
                                    {category === 'devops' ? 'DevOps & OS' : category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {Object.entries(categories).map(([key, categorySkills]) => (
                            <TabsContent key={key} value={key} className="mt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                                >
                                    {categorySkills.map((skill, index) => (
                                        <motion.div
                                            key={skill._id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="premium-card p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 group min-h-[140px]"
                                        >
                                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                                {key === 'frontend' && <Globe className="w-6 h-6 text-blue-500" />}
                                                {key === 'backend' && <Server className="w-6 h-6 text-green-500" />}
                                                {key === 'database' && <Database className="w-6 h-6 text-purple-500" />}
                                                {key === 'devops' && <Terminal className="w-6 h-6 text-amber-500" />}
                                                {key === 'mobile' && <Smartphone className="w-6 h-6 text-pink-500" />}
                                                {key === 'tools' && <PenTool className="w-6 h-6 text-slate-500" />}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">{skill.name}</h4>
                                                <div className="w-full bg-secondary/30 h-1.5 mt-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${(skill.proficiency / 5) * 100}%` }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </FadeIn>
            </div>
        </section>
    )
}
