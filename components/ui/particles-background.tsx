"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes"

export function ParticlesBackground() {
    const [init, setInit] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    if (!init) return null

    const particleColor = theme === "dark" ? "#a78bfa" : "#7c3aed" // Light violet vs proper violet

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 -z-10"
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "grab", // Changed to grab for "network" feel
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        grab: {
                            distance: 200,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                    },
                },
                particles: {
                    color: {
                        value: particleColor,
                    },
                    links: {
                        color: particleColor,
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 60, // Reduced count for cleaner look
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
    )
}
