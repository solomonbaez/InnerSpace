import type { Metadata } from 'next'
import { GeistMono } from 'geist/font'
import './globals.css'

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body style={{overflow: "scroll"}} className={GeistMono.className}>
        {children}
      </body>
    </html>
  )
}
