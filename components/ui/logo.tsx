"use client"

import { motion } from "framer-motion"

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.path
                d="M30 20 L70 20 L85 50 L70 80 L30 80 L15 50 Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="text-primary"
            />
            <motion.path
                d="M40 35 L40 65 M40 50 L60 50 M60 35 L60 50"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="text-foreground dark:text-white"
            />
            {/* Glow Effect */}
            <motion.circle
                cx="50"
                cy="50"
                r="35"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeOpacity="0.5"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
            </defs>
        </motion.svg>
    )
}
