import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chaitanya Patil - Full Stack Developer",
  description:
    "Portfolio of Chaitanya Patil, a passionate full stack developer specializing in React, Node.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Node.js", "JavaScript", "TypeScript", "Web Development"],
  authors: [{ name: "Chaitanya Patil" }],
  creator: "Chaitanya Patil",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chaitanyapatil.dev",
    title: "Chaitanya Patil - Full Stack Developer",
    description:
      "Portfolio of Chaitanya Patil, a passionate full stack developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Chaitanya Patil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaitanya Patil - Full Stack Developer",
    description:
      "Portfolio of Chaitanya Patil, a passionate full stack developer specializing in React, Node.js, and modern web technologies.",
    creator: "@chaitanyapatil",
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
    generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="font-bold text-2xl premium-heading" style={{ padding: '0.5rem' }}>CP</div>
        {children}
      </body>
    </html>
  )
}
