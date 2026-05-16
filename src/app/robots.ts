import { env } from '@/env'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${env.APP_URL}/sitemap.xml`,
    host: env.APP_URL,
  }
}
