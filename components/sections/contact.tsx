"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const response = await fetch("https://formspree.io/f/mnnkrrvk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitStatus("success")
                setFormData({ name: "", email: "", message: "" })
            } else {
                setSubmitStatus("error")
            }
        } catch (error) {
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section
            id="contact"
            className="py-24 px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
        >
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <FadeIn direction="down">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 premium-heading">Get In Touch</h2>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="section-divider max-w-24 mx-auto"></div>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mt-6">
                            Let's discuss your next project or opportunity
                        </p>
                    </FadeIn>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <FadeIn direction="left" delay={0.4}>
                        <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">Contact Information</h3>
                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                                    <Mail className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">chaitanyapatil700@gmail.com</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                                    <Phone className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">+91 9724917040</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                                    <MapPin className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">Pune, India</span>
                            </motion.div>
                        </div>

                        <div className="mt-12">
                            <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200">Follow Me</h4>
                            <div className="flex space-x-4">
                                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                                    <Button variant="outline" size="lg" className="premium-button rounded-xl" asChild>
                                        <a href="https://github.com/Chaitanyahoon" target="_blank" rel="noopener noreferrer">
                                            <Github className="w-5 h-5 mr-2" />
                                            GitHub
                                        </a>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                                    <Button variant="outline" size="lg" className="premium-button rounded-xl" asChild>
                                        <a href="https://www.linkedin.com/in/chaitanyapatil700/" target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="w-5 h-5 mr-2" />
                                            LinkedIn
                                        </a>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="right" delay={0.6}>
                        <form onSubmit={handleFormSubmit} className="space-y-8 p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm">
                            <div>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    className="w-full h-14 px-6 text-lg premium-focus rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300 bg-background/50"
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your Email"
                                    className="w-full h-14 px-6 text-lg premium-focus rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300 bg-background/50"
                                    required
                                />
                            </div>
                            <div>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Message"
                                    rows={6}
                                    className="w-full px-6 py-4 text-lg premium-focus rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300 resize-none bg-background/50"
                                    required
                                />
                            </div>

                            {submitStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800"
                                >
                                    Thank you! Your message has been sent successfully.
                                </motion.div>
                            )}

                            {submitStatus === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800"
                                >
                                    Sorry, there was an error sending your message. Please try again.
                                </motion.div>
                            )}

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 premium-button bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg font-medium rounded-xl shadow-lg disabled:opacity-50 transition-all duration-300"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </motion.div>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
