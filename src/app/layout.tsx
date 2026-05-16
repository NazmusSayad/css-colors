import '@/styles/index.css'

import { env } from '@/env'
import { cn } from '@/lib/utils'
import { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: {
    default: 'Color Systems Playground — Compare HSL, LCH & OKLCH',
    template: '%s | Color Systems Playground',
  },
  description:
    'An interactive tool to explore and compare HSL, LCH, and OKLCH color spaces. Adjust hue, lightness, and saturation to see how each system behaves visually.',
  keywords: [
    'CSS colors',
    'HSL',
    'LCH',
    'OKLCH',
    'color space',
    'color picker',
    'perceptual uniformity',
    'design tools',
    'web colors',
    'CSS color functions',
  ],
  authors: [{ name: 'Sayad', url: 'https://sayad.dev' }],
  creator: 'Sayad',
  publisher: 'Sayad',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.APP_URL,
    siteName: 'Color Systems Playground',
    title: 'Color Systems Playground — Compare HSL, LCH & OKLCH',
    description:
      'An interactive tool to explore and compare HSL, LCH, and OKLCH color spaces.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Color Systems Playground preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Systems Playground — Compare HSL, LCH & OKLCH',
    description:
      'An interactive tool to explore and compare HSL, LCH, and OKLCH color spaces.',
    creator: '@sayaddev',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: env.APP_URL,
  },
  category: 'technology',
  classification: 'design tools',
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-sans', inter.variable)}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
