import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ignite Idea - ปลดล็อกศักยภาพองค์กรด้วยนวัตกรรมแห่งอนาคต",
  description:
    "Where Vision Meets Futuristic Solutions",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/ignite-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/ignite-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/images/ignite-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
