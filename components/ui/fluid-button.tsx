"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FluidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    href?: string
}

export const FluidButton = React.forwardRef<HTMLButtonElement, FluidButtonProps>(
    ({ className, children, href, ...props }, ref) => {
        const ButtonWrapper = href ? motion.a : motion.button

        return (
            <ButtonWrapper
                ref={ref as any}
                href={href}
                className={cn(
                    "group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-background px-8 py-4 font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground",
                    className
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...(props as any)}
            >
                <div className="relative h-6 w-full overflow-hidden">
                    <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[150%]">
                        <span className="flex items-center gap-2">{children}</span>
                    </div>
                    <div className="absolute top-0 flex w-full flex-col transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0">
                        <span className="flex items-center gap-2">{children}</span>
                    </div>
                </div>
            </ButtonWrapper>
        )
    }
)
FluidButton.displayName = "FluidButton"
