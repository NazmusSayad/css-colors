import { env } from '@/env'
import { Home } from '@/features/home/home'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Color Systems Playground',
  description:
    'An interactive tool to explore and compare HSL, LCH, and OKLCH color spaces.',
  url: env.APP_URL,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  author: {
    '@type': 'Person',
    name: 'Sayad',
    url: 'https://sayad.dev',
  },
  creator: {
    '@type': 'Person',
    name: 'Sayad',
    url: 'https://sayad.dev',
  },
  inLanguage: 'en-US',
  isAccessibleForFree: true,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  )
}
