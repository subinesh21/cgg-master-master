
function robots() {
  return {
    rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/dashboard/',
      },
      sitemap: 'https://chennaigreengifts.com/sitemap.xml',
    }
}

export default robots