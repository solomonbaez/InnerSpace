import type { Metadata } from 'next'
import { GeistMono } from 'geist/font'
// import Header from "@/components/header"
import './globals.css'
// import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Inner Space',
  description: 'Solomon Baez Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        {children}
      </body>
    </html>
  )
}
