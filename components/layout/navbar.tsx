"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ui/theme-toggle"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useTheme } from "next-themes"


export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isScrolled, setIsScrolled] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "projects", "internships", "contact"]
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const offsetTop = element.offsetTop
                    const offsetHeight = element.offsetHeight

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setMobileMenuOpen(false)
    }

    if (!mounted) {
        return null // Avoid hydration mismatch
    }

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-morphism border-b border-white/5" : "bg-transparent border-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <span className="font-bold text-lg tracking-tighter">CP.</span>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 bg-secondary/30 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                        {["Home", "About", "Projects", "Internships", "Contact"].map((item) => {
                            const isActive = activeSection === item.toLowerCase()

                            return (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full z-10 ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="liquid-nav-pill"
                                            className="absolute inset-0 bg-primary rounded-full z-[-1]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                    {item}
                                </button>
                            )
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle
                            isDark={theme === "dark"}
                            toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                            size={34}
                        />

                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden p-3 hover:bg-secondary rounded-full"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <motion.div
                    className="md:hidden glass-morphism border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="px-6 pt-4 pb-6 space-y-2">
                        {["Home", "About", "Projects", "Internships", "Contact"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary w-full text-left rounded-lg hover:bg-secondary transition-all duration-300"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
