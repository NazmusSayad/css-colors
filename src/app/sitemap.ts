import { env } from '@/env'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: env.APP_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
