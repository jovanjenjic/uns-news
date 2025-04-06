// export function getStrapiURL(path: string) {
//   return `${'http://127.0.0.1:1337'}${path}`
// }

export function getStrapiURL(path: string) {
  return `${'https://uns-news-api.onrender.com'}${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string) {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl)
  const data = await response.json()
  return data
}
export const getMediaURL = (url?: string) => {
  if (!url) return ' '
  // Return the full url when it's external
  if (url.startsWith('http') || url.startsWith('//')) return url
  return getStrapiURL(url)
}

export async function getNavigation(): Promise<TNavigation> {
  const [categories, faculties] = await Promise.all([
    fetchAPI('/categories'),
    fetchAPI('/faculties'),
  ])

  return { categories, faculties }
}
