"use client"

import * as React from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ShowcaseCardProps {
    title: string
    description: string
    image: string
    tags: string[]
    href?: string
    githubUrl?: string
    className?: string
    category?: string
    overview?: string
}

export function ShowcaseCard({
    title,
    description,
    image,
    tags,
    href,
    githubUrl,
    className,
    category = "Project",
    overview = "Project Overview"
}: ShowcaseCardProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    // 3D Tilt Effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        x.set(clientX - left - width / 2)
        y.set(clientY - top - height / 2)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

    return (
        <motion.div
            layout
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX: isOpen ? 0 : rotateX,
                rotateY: isOpen ? 0 : rotateY,
                transformStyle: "preserve-3d"
            }}
            className={cn(
                "group relative w-full rounded-[34px] bg-card border border-border/50 shadow-sm transition-all duration-300",
                className
            )}
            initial={{ borderRadius: 34 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)" }}
        >
            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-[34px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                    background: useTransform(
                        mouseX,
                        [-300, 300],
                        [
                            "radial-gradient(600px circle at 0px 0px, rgba(255,255,255,0.06), transparent 40%)",
                            "radial-gradient(600px circle at 100% 100%, rgba(255,255,255,0.06), transparent 40%)"
                        ]
                    )
                }}
            />

            <motion.div layout className="relative flex flex-col z-10 h-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Main Image Container */}
                <div
                    className="relative w-full aspect-[4/3] overflow-hidden rounded-[34px] m-2.5 mb-0"
                    style={{ width: "calc(100% - 20px)", transform: "translateZ(20px)" }}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 shadow-lg">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Header Content */}
                <motion.div layout className="p-6 flex items-start justify-between gap-4" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex-1">
                        <motion.h3
                            layout="position"
                            className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors"
                        >
                            {title}
                        </motion.h3>
                        <motion.p
                            layout="position"
                            className="text-sm text-muted-foreground font-medium"
                        >
                            {tags.slice(0, 3).join(" • ")}
                        </motion.p>
                    </div>

                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full h-10 w-10 shrink-0 bg-secondary/80 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                </motion.div>

                {/* Expandable Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="px-6 pb-6 overflow-hidden"
                            style={{ transform: "translateZ(10px)" }}
                        >
                            <div className="bg-muted/30 rounded-2xl p-4 mb-4 border border-border/50">
                                <h4 className="text-sm font-semibold text-foreground mb-2">{overview}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                {href && (
                                    <Button asChild className="flex-1 rounded-xl shadow-md hover:shadow-lg transition-all" variant="default">
                                        <a href={href} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Project
                                        </a>
                                    </Button>
                                )}
                                {githubUrl && (
                                    <Button asChild className="flex-1 rounded-xl shadow-sm hover:shadow-md transition-all" variant="outline">
                                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div >
    )
}
