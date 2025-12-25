"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react" // Using lucide-react icons instead of Framer's imported SVGs
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

    return (
        <motion.div
            layout
            className={cn(
                "relative w-full rounded-[34px] overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-shadow duration-300",
                className
            )}
            initial={{ borderRadius: 34 }}
        >
            <motion.div layout className="flex flex-col">
                {/* Main Image Container */}
                <motion.div
                    layout
                    className="relative w-full aspect-[4/3] overflow-hidden rounded-[34px] m-2.5 mb-0" // matching padding from framer component
                    style={{ width: "calc(100% - 20px)" }}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
                            {category}
                        </span>
                    </div>
                </motion.div>

                {/* Header Content */}
                <motion.div layout className="p-6 flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <motion.h3
                            layout="position"
                            className="text-2xl font-semibold text-foreground mb-1"
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
                        className="rounded-full h-10 w-10 shrink-0 bg-secondary/80 hover:bg-secondary"
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
                        >
                            <div className="bg-muted/30 rounded-2xl p-4 mb-4">
                                <h4 className="text-sm font-semibold text-foreground mb-2">{overview}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                {href && (
                                    <Button asChild className="flex-1 rounded-xl" variant="default">
                                        <a href={href} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Project
                                        </a>
                                    </Button>
                                )}
                                {githubUrl && (
                                    <Button asChild className="flex-1 rounded-xl" variant="outline">
                                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
