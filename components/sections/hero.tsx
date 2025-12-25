"use client"

import { ArrowRight, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import FlickerText from "@/components/ui/flicker-text"
import { FluidButton } from "@/components/ui/fluid-button"

export function Hero() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative overflow-hidden"
        >
            <ParticlesBackground />

            {/* Dynamic Background with more vibrant colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 dark:from-primary/20 dark:via-background dark:to-purple-900/20 -z-20"></div>

            {/* Animated Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl delay-1000"
            />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Replaced the h1 with FlickerText */}
                    <div className="mb-6">
                        <FlickerText
                            text="Chaitanya Patil"
                            textColor="hsl(var(--foreground))"
                            glowColor="#f59e0b" // amber-500
                            animationSpeed={0.5}
                            glowIntensity={5}
                            strokeWidth={1}
                            className="text-6xl sm:text-7xl lg:text-8xl font-black premium-heading leading-tight tracking-tight"
                        />
                    </div>

                    <motion.h2
                        className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mb-8 font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <TypewriterEffect text="Full Stack Developer | React Enthusiast" />
                    </motion.h2>

                    <motion.p
                        className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Crafting <span className="text-primary font-medium">exceptional</span> digital experiences with modern web technologies and innovative solutions that
                        bridge creativity with functionality
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FluidButton
                                onClick={() => scrollToSection("projects")}
                                className="text-xl font-bold shadow-xl hover:shadow-primary/40"
                            >
                                <span className="flex items-center gap-2">
                                    View My Work
                                    <ArrowRight className="h-6 w-6" />
                                </span>
                            </FluidButton>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outline"
                                onClick={() => scrollToSection("contact")}
                                className="premium-button border-2 px-10 py-8 text-xl font-bold rounded-full hover:bg-secondary/80 backdrop-blur-sm"
                            >
                                Get In Touch
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="mt-12 flex gap-4 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="ghost"
                                className="gap-2 text-muted-foreground hover:text-primary transition-colors"
                                asChild
                            >
                                <a href="https://drive.google.com/file/d/1T-EoIm0gf8yEahPu4ZcoLEr3Yr5xaqL6/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                    <Eye className="h-5 w-5" />
                                    Preview Resume
                                </a>
                            </Button>
                        </motion.div>
                        <div className="w-[1px] h-6 bg-border self-center" />
                        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="ghost"
                                className="gap-2 text-muted-foreground hover:text-primary transition-colors"
                                asChild
                            >
                                <a href="https://drive.google.com/file/d/1T-EoIm0gf8yEahPu4ZcoLEr3Yr5xaqL6/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                    <Download className="h-5 w-5" />
                                    Download Resume
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
