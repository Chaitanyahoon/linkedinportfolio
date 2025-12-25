"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

interface FlickerTextProps {
    text?: string
    textColor?: string
    glowColor?: string
    animationSpeed?: number
    animationPattern?: "sequential" | "random" | "sync"
    repeatBehavior?: "loop" | "once"
    strokeWidth?: number
    glowIntensity?: number
    className?: string
}

export default function FlickerText({
    text = "FLICKER TEXT",
    textColor = "#FFFFFF",
    glowColor = "#00FFFF",
    animationSpeed = 1,
    animationPattern = "sequential",
    repeatBehavior = "loop",
    strokeWidth = 2,
    glowIntensity = 10,
    className = "",
}: FlickerTextProps) {
    // Split text into characters for individual animation
    const characters = useMemo(() => {
        return text.split("").map((char, index) => ({
            char: char === " " ? "\u00A0" : char,
            index,
            id: `${char}-${index}`,
        }))
    }, [text])

    // Animation timing calculations
    const baseDelay = 0.1 / animationSpeed
    const flickerDuration = 0.3 / animationSpeed
    const totalDuration = characters.length * baseDelay + flickerDuration

    // Generate animation delays based on pattern
    const getAnimationDelay = (index: number) => {
        switch (animationPattern) {
            case "sequential":
                return index * baseDelay
            case "random":
                return Math.random() * (totalDuration * 0.7)
            case "sync":
                return 0
            default:
                return index * baseDelay
        }
    }

    const characterVariants = {
        initial: {
            opacity: 1,
            color: textColor,
            WebkitTextStroke: `${strokeWidth}px transparent`,
            textShadow: "none",
            filter: "none",
        },
        flicker: (index: number) => ({
            opacity: [1, 0.3, 1, 0.1, 1, 0.7, 1],
            color: [textColor, "transparent", textColor, "transparent", textColor],
            WebkitTextStroke: [
                `${strokeWidth}px transparent`,
                `${strokeWidth}px ${textColor}`,
                `${strokeWidth}px transparent`,
                `${strokeWidth}px ${textColor}`,
                `${strokeWidth}px transparent`,
            ],
            transition: {
                duration: flickerDuration,
                delay: getAnimationDelay(index),
                ease: "easeInOut",
                repeat: repeatBehavior === "loop" ? Infinity : 0,
                repeatDelay: repeatBehavior === "loop" ? totalDuration : 0,
            },
        }),
    }

    // Neon style variation
    const styleVariation = {
        filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})`,
        textShadow: `0 0 ${glowIntensity * 2}px ${glowColor}`,
    }

    return (
        <div className={`inline-flex flex-wrap justify-center items-center gap-0 ${className}`}>
            {characters.map((character, index) => (
                <motion.span
                    key={`${character.id}`}
                    custom={index}
                    variants={characterVariants}
                    initial="initial"
                    whileInView="flicker"
                    viewport={{ once: true }}
                    style={{
                        display: "inline-block",
                        whiteSpace: "pre",
                        ...styleVariation,
                    }}
                >
                    {character.char}
                </motion.span>
            ))}
        </div>
    )
}
