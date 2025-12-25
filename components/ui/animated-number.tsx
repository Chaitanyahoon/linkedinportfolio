"use client"

import { motion, useSpring, useTransform, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedNumberProps {
    value: number
    className?: string
    springOptions?: {
        stiffness?: number
        damping?: number
        mass?: number
    }
}

export function AnimatedNumber({
    value,
    className,
    springOptions = { stiffness: 100, damping: 30, mass: 1 }
}: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })

    const springValue = useSpring(0, springOptions)
    const displayValue = useTransform(springValue, (current) =>
        Math.round(current).toLocaleString()
    )

    useEffect(() => {
        if (inView) {
            springValue.set(value)
        }
    }, [inView, value, springValue])

    return (
        <motion.span
            ref={ref}
            className={cn("inline-block tabular-nums", className)}
        >
            {displayValue}
        </motion.span>
    )
}
