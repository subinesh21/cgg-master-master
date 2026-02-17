import React from 'react'

function sitemap() {
    return [
        {
          url: 'https://chennaigreengifts.com',
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        },
        {
          url: 'https://chennaigreengifts.com/login',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: 'https://chennaigreengifts.com/privacy-policy',
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        },
    ]
}

export default sitemap