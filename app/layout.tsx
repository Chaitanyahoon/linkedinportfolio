import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { ScrollProgress } from "@/components/ui/scroll-progress"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Chaitanya Patil - Full Stack Developer",
    template: "%s | Chaitanya Patil",
  },
  description:
    "Portfolio of Chaitanya Patil, a passionate full stack developer specializing in React, Node.js, and modern web technologies. Building scalable and beautiful digital experiences.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Portfolio",
    "Chaitanya Patil",
  ],
  authors: [{ name: "Chaitanya Patil", url: "https://chaitanyapatil.dev" }],
  creator: "Chaitanya Patil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chaitanyapatil.dev",
    title: "Chaitanya Patil - Full Stack Developer",
    description:
      "Portfolio of Chaitanya Patil, a passionate full stack developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Chaitanya Patil Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure you have an og-image.png in public/
        width: 1200,
        height: 630,
        alt: "Chaitanya Patil Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya Patil - Full Stack Developer",
    description:
      "Portfolio of Chaitanya Patil, a passionate full stack developer specializing in React, Node.js, and modern web technologies.",
    creator: "@chaitanyapatil",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
