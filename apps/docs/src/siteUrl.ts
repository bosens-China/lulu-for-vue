export const siteBase = import.meta.env.BASE_URL
export const siteUrl = import.meta.env.VITE_SITE_URL
  ? import.meta.env.VITE_SITE_URL.replace(/\/?$/, '/')
  : ''

export function withBase(path: string): string {
  return `${siteBase}${path.replace(/^\//, '')}`
}

export function withoutBase(path: string): string {
  return path.startsWith(siteBase) ? `/${path.slice(siteBase.length)}` : path
}

export function absolutePageUrl(path: string): string | null {
  return siteUrl ? new URL(path.replace(/^\//, ''), siteUrl).href : null
}
