"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
    isDark: boolean
    toggleTheme: () => void
    size?: number
}

export default function ThemeToggle({ isDark, toggleTheme, size = 40 }: ThemeToggleProps) {
    const switchWidth = size * 1.8
    const switchHeight = size
    const knobSize = switchHeight * 0.8
    const knobIconSize = knobSize * 0.6

    const switchTrackColor = "#424242"
    const switchActiveColor = "#DBDBDB"
    const moonIconColor = "#6B6B6B"
    const sunIconColor = "#FF9100"

    return (
        <motion.button
            type="button"
            onClick={toggleTheme}
            className="relative flex items-center justify-center border-none outline-none cursor-pointer"
            style={{
                width: switchWidth,
                height: switchHeight,
                borderRadius: switchHeight / 2,
                backgroundColor: !isDark ? switchActiveColor : switchTrackColor,
            }}
            layout
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                className="absolute bg-white rounded-full shadow-sm flex items-center justify-center z-10"
                style={{
                    width: knobSize,
                    height: knobSize,
                    top: (switchHeight - knobSize) / 2,
                }}
                initial={false}
                animate={{
                    left: !isDark
                        ? switchWidth - knobSize - (switchHeight - knobSize) / 2
                        : (switchHeight - knobSize) / 2,
                }}
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            >
                {!isDark ? (
                    <Sun size={knobIconSize} color={sunIconColor} fill={sunIconColor} />
                ) : (
                    <Moon size={knobIconSize} color={moonIconColor} fill={moonIconColor} />
                )}
            </motion.span>
        </motion.button>
    )
}
