"use client"

import { useEffect, useRef, useCallback, useMemo } from "react"
import { useTheme } from "next-themes"

interface MouseTrailProps {
    variant?: "line" | "dots" | "particles" | "pixel"
    fillType?: "solid" | "gradient"
    trailColor?: string
    trailColorEnd?: string
    trailLength?: number
    lineWidth?: number
    fadeOut?: boolean
    smoothing?: number
    dotSize?: number
    dotSpacing?: number
    particleCount?: number
    particleSize?: number
    spreadAngle?: number
    drift?: number
    pixelSize?: number
    snapToGrid?: boolean
    blendMode?: GlobalCompositeOperation
    autoFade?: boolean
    fadeDuration?: number
    className?: string
}

export default function MouseTrail(props: MouseTrailProps) {
    const {
        variant = "line",
        fillType = "solid",
        trailColor = "#0099FF",
        trailColorEnd = "#FF00FF",
        trailLength = 20,
        lineWidth = 3,
        fadeOut = true,
        smoothing = 0.3,
        dotSize = 6,
        dotSpacing = 10,
        particleCount = 6,
        particleSize = 3,
        spreadAngle = 30,
        drift = 0.4,
        pixelSize = 6,
        snapToGrid = true,
        blendMode = "source-over",
        autoFade = true,
        fadeDuration = 2,
        className
    } = props

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const trailPointsRef = useRef<Array<{ x: number; y: number; life: number }>>([])
    const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; size: number }>>([])
    const rafRef = useRef<number>()
    const timeRef = useRef(performance.now())

    // Helper to parse color strings
    const parseColor = (col: string) => {
        if (col.startsWith("#")) {
            let hex = col.slice(1)
            if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("")
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16),
            }
        } else if (col.startsWith("rgb")) {
            const m = col.match(/\d+/g)
            return m ? { r: +m[0], g: +m[1], b: +m[2] } : { r: 0, g: 0, b: 0 }
        }
        return { r: 0, g: 0, b: 0 }
    }

    const baseRGBStart = useMemo(() => parseColor(trailColor), [trailColor])
    const baseRGBEnd = useMemo(() => parseColor(trailColorEnd), [trailColorEnd])

    const rgba = useCallback(
        (a: number, t: number) => {
            if (fillType === "gradient") {
                const r = baseRGBStart.r + (baseRGBEnd.r - baseRGBStart.r) * t
                const g = baseRGBStart.g + (baseRGBEnd.g - baseRGBStart.g) * t
                const b = baseRGBStart.b + (baseRGBEnd.b - baseRGBStart.b) * t
                return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${Math.max(0, Math.min(1, a))})`
            }
            return `rgba(${baseRGBStart.r},${baseRGBStart.g},${baseRGBStart.b},${Math.max(0, Math.min(1, a))})`
        },
        [baseRGBStart, baseRGBEnd, fillType]
    )

    useEffect(() => {
        if (variant !== "particles") particlesRef.current = []
    }, [variant])

    const localToCanvas = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }
        const rect = canvas.getBoundingClientRect()
        return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const addPoint = useCallback(
        (x: number, y: number) => {
            const points = trailPointsRef.current
            const last = points[points.length - 1]

            if (variant === "dots" && last) {
                const dx = x - last.x
                const dy = y - last.y
                if (Math.hypot(dx, dy) < dotSpacing) return
            }

            const s = Math.max(0.001, 1 - smoothing)
            const sx = last ? last.x + (x - last.x) * s : x
            const sy = last ? last.y + (y - last.y) * s : y

            points.push({ x: sx, y: sy, life: 1 })

            if (points.length > trailLength) points.splice(0, points.length - trailLength)

            if (variant === "particles" && last) {
                const dx = sx - last.x
                const dy = sy - last.y
                const speed = Math.hypot(dx, dy)
                if (speed > 2) {
                    const angle = Math.atan2(dy, dx)
                    const spread = (spreadAngle * Math.PI) / 180
                    for (let i = 0; i < particleCount; i++) {
                        const a = angle + (Math.random() - 0.5) * spread
                        const v = speed * 0.1 + Math.random() * 2
                        particlesRef.current.push({
                            x: sx,
                            y: sy,
                            vx: Math.cos(a) * v,
                            vy: Math.sin(a) * v,
                            life: 0.8 + Math.random() * 0.4,
                            size: particleSize + Math.random() * 1.5,
                        })
                    }
                }
            }
        },
        [trailLength, smoothing, variant, dotSpacing, particleCount, particleSize, spreadAngle]
    )

    const drawFrame = useCallback(
        (dt: number) => {
            const canvas = canvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext("2d")
            if (!ctx) return

            ctx.globalCompositeOperation = blendMode
            const rect = canvas.getBoundingClientRect()
            ctx.clearRect(0, 0, rect.width, rect.height)

            const points = trailPointsRef.current

            if (autoFade && points.length) {
                const decay = dt / Math.max(0.001, fadeDuration)
                for (let i = points.length - 1; i >= 0; i--) {
                    points[i].life -= decay
                    if (points[i].life <= 0) points.splice(i, 1)
                }
            }

            if (points.length < 1) return

            const indexAlpha = (i: number, n: number) => {
                if (!fadeOut) return 1
                const t = n <= 1 ? 1 : i / (n - 1)
                return 1 - (1 - t) * (1 - t)
            }

            if (variant === "dots") {
                for (let i = 0; i < points.length; i++) {
                    const p = points[i]
                    const t = i / (points.length - 1 || 1)
                    const a = indexAlpha(i, points.length) * (autoFade ? p.life : 1)
                    const r = dotSize * (fadeOut ? 0.3 + 0.7 * a : 1)
                    ctx.fillStyle = rgba(a, t)
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
                    ctx.fill()
                }
            } else if (variant === "pixel") {
                for (let i = 0; i < points.length; i++) {
                    let { x, y } = points[i]
                    if (snapToGrid) {
                        x = Math.round(x / pixelSize) * pixelSize
                        y = Math.round(y / pixelSize) * pixelSize
                    }
                    const t = i / (points.length - 1 || 1)
                    const a = indexAlpha(i, points.length) * (autoFade ? points[i].life : 1)
                    const s = pixelSize * (fadeOut ? 0.6 + 0.4 * a : 1)
                    ctx.fillStyle = rgba(a, t)
                    ctx.fillRect(x - s / 2, y - s / 2, s, s)
                }
            } else if (variant === "particles") {
                const particles = particlesRef.current
                const decayPerSec = 1.6
                const gravityPerSec = drift * 60 * 0.001
                const dampingPerSec = 0.98
                const damping = Math.pow(dampingPerSec, dt * 60)
                const g = gravityPerSec * dt * 60
                const decay = decayPerSec * dt

                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i]
                    p.x += p.vx * dt * 60
                    p.y += p.vy * dt * 60
                    p.vx *= damping
                    p.vy = p.vy * damping + g
                    p.life -= decay

                    if (p.life <= 0) {
                        particles.splice(i, 1)
                    } else {
                        ctx.fillStyle = rgba(p.life, 1 - p.life)
                        ctx.beginPath()
                        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
                        ctx.fill()
                    }
                }

                if (points.length > 1) {
                    for (let i = 1; i < points.length; i++) {
                        const p1 = points[i - 1]
                        const p2 = points[i]
                        const lifeFactor = autoFade ? points[i].life : 1
                        const a = 0.15 * indexAlpha(i, points.length) * lifeFactor
                        ctx.strokeStyle = rgba(a, i / (points.length - 1 || 1))
                        ctx.lineWidth = Math.max(1, lineWidth * 0.5 * a)
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                } else {
                    const p = points[0]
                    const a = (autoFade ? p.life : 1) * 0.2
                    ctx.fillStyle = rgba(a, 0)
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, lineWidth, 0, Math.PI * 2)
                    ctx.fill()
                }

            } else {
                // Line variant
                if (points.length < 2) {
                    const p = points[0]
                    const a = autoFade ? p.life : 1
                    ctx.fillStyle = rgba(a, 0)
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, Math.max(1, lineWidth / 2), 0, Math.PI * 2)
                    ctx.fill()
                    return
                }

                for (let i = 1; i < points.length; i++) {
                    const p1 = points[i - 1]
                    const p2 = points[i]
                    const t = i / (points.length - 1 || 1)
                    const lifeFactor = autoFade ? points[i].life : 1
                    const a = indexAlpha(i, points.length) * lifeFactor
                    const widthScale = fadeOut ? 0.3 + 0.7 * a : 1
                    ctx.strokeStyle = rgba(a, t)
                    ctx.lineWidth = Math.max(1, lineWidth * widthScale)
                    ctx.lineCap = "round"
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.stroke()
                }
            }
        },
        [variant, fadeOut, rgba, lineWidth, dotSize, drift, blendMode, pixelSize, snapToGrid, autoFade, fadeDuration, particleSize]
    )

    const animate = useCallback(() => {
        const now = performance.now()
        let dt = (now - timeRef.current) / 1e3
        dt = Math.max(0, Math.min(dt, 0.05)) // Clamp dt
        timeRef.current = now

        drawFrame(dt)
        rafRef.current = requestAnimationFrame(animate)
    }, [drawFrame])

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            const rect = container.getBoundingClientRect() // Use container rect
            const dpr = window.devicePixelRatio || 1
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
            // No need to reset trail points usually, unless resizing causes huge jumps
        }

        resize()
        window.addEventListener("resize", resize)

        const handlePointerMove = (e: PointerEvent) => {
            // Since we are using absolute positioning for the canvas covering the whole screen
            // we can just use the client coordinates directly relative to the viewport
            // But localToCanvas handles canvas offset if it's not at 0,0 for some reason.

            // However, for a full-screen trail, we likely want to attach listeners to window/document
            const { x, y } = localToCanvas(e.clientX, e.clientY)
            addPoint(x, y)
        }

        // Attach to document to catch all movements
        document.addEventListener("pointermove", handlePointerMove, { passive: true })

        timeRef.current = performance.now()
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("resize", resize)
            document.removeEventListener("pointermove", handlePointerMove)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [animate, addPoint])

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 pointer-events-none z-[999999] ${className}`}
            style={{
                // ensure it sits on top but lets clicks pass through
                pointerEvents: "none",
            }}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    )
}
