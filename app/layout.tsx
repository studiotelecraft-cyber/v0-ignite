import type React from "react"
import type { Metadata } from "next"
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"
import { LanguageProvider } from "@/context/language-context"
import "./globals.css"

const lexend = localFont({
  src: '../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
  display: 'swap',
})

const sarabun = localFont({
  src: '../public/fonts/Sarabun-Regular.ttf',
  variable: '--font-sarabun',
  display: 'swap',
})

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
      <body className={`${lexend.variable} ${sarabun.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
