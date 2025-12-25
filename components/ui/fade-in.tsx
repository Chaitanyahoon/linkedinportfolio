"use client"

import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { useRef, useEffect } from "react"

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    direction?: "up" | "down" | "left" | "right" | "none"
    fullWidth?: boolean
    className?: string
}

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    fullWidth = false,
    className = "",
}: FadeInProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-40px" })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [isInView, controls])

    const directions: Record<string, Variants> = {
        up: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
        },
        down: {
            hidden: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0 },
        },
        left: {
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 },
        },
        right: {
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 },
        },
        none: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={directions[direction]}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom spring-like easing
            }}
            className={`${fullWidth ? "w-full" : ""} ${className}`}
        >
            {children}
        </motion.div>
    )
}
