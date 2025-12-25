"use client"

import { ArrowRight, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion"
import { ParticlesBackground } from "@/components/ui/particles-background"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import FlickerText from "@/components/ui/flicker-text"
import { FluidButton } from "@/components/ui/fluid-button"
import { useEffect } from "react"

export function Hero() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    // Mouse parallax effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 120 }
    const blob1X = useSpring(useTransform(mouseX, [0, 1], [-50, 50]), springConfig)
    const blob1Y = useSpring(useTransform(mouseY, [0, 1], [-50, 50]), springConfig)
    const blob2X = useSpring(useTransform(mouseX, [0, 1], [50, -50]), springConfig)
    const blob2Y = useSpring(useTransform(mouseY, [0, 1], [50, -50]), springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window
            mouseX.set(clientX / innerWidth)
            mouseY.set(clientY / innerHeight)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative overflow-hidden perspective-1000"
        >
            <ParticlesBackground />

            {/* Dynamic Background with more vibrant colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 dark:from-primary/20 dark:via-background dark:to-purple-900/20 -z-20"></div>

            {/* Animated Blobs with Parallax */}
            <motion.div
                style={{ x: blob1X, y: blob1Y }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    scale: { duration: 20, repeat: Infinity, ease: "linear" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 dark:bg-primary/30 rounded-full blur-[100px] opacity-70"
            />
            <motion.div
                style={{ x: blob2X, y: blob2Y }}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 50, 0], // Keep the subtle drift combined with mouse movement
                }}
                transition={{
                    scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[100px] delay-1000 opacity-70"
            />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ perspective: 1000 }}
                >
                    {/* Replaced the h1 with FlickerText */}
                    <div className="mb-6">
                        <FlickerText
                            text="Chaitanya Patil"
                            textColor="hsl(var(--foreground))"
                            glowColor="hsl(var(--primary))" // Use theme primary
                            animationSpeed={0.8} // Slower for elegance
                            glowIntensity={0.6}
                            strokeWidth={1}
                            className="text-6xl sm:text-7xl lg:text-9xl font-black premium-heading leading-tight tracking-tight drop-shadow-2xl"
                        />
                    </div>

                    <motion.h2
                        className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground mb-8 font-light tracking-wide"
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
                            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
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
                                className="premium-button border-2 px-10 py-8 text-xl font-bold rounded-full hover:bg-secondary/20 backdrop-blur-sm shadow-lg dark:shadow-purple-900/20"
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
                        <motion.div whileHover={{ scale: 1.05, y: -2, color: "hsl(var(--primary))" }} whileTap={{ scale: 0.95 }}>
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
                        <motion.div whileHover={{ scale: 1.05, y: -2, color: "hsl(var(--primary))" }} whileTap={{ scale: 0.95 }}>
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
