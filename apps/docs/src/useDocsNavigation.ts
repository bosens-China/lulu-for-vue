import { nextTick, onMounted, onUnmounted, shallowReadonly, shallowRef } from 'vue'
import { normalizePath, resolvePage } from './routes'
import { absolutePageUrl, withBase } from './siteUrl'
import type { DocsPage } from './types'

function updateMeta(attribute: 'name' | 'property', key: string, content: string | null): void {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!content) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }

  element.content = content
}

function updateHead(page: DocsPage): void {
  document.title = page.title
  updateMeta('name', 'description', page.description)
  updateMeta('name', 'keywords', page.seo.keywords.length > 0 ? page.seo.keywords.join(', ') : null)
  updateMeta('property', 'og:title', page.title)
  updateMeta('property', 'og:description', page.description)
  updateMeta('property', 'og:image', page.seo.image)
  const canonical = absolutePageUrl(page.path)
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) {
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.append(link)
    }
    link.href = canonical
  }
  else link?.remove()
  updateMeta('property', 'og:url', canonical)
}

async function scrollToPage(url: URL): Promise<void> {
  await nextTick()

  const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null

  if (target) {
    target.scrollIntoView()
    return
  }

  window.scrollTo({ top: 0 })
}

export function useDocsNavigation(initialPage: DocsPage) {
  const page = shallowRef(initialPage)

  function showPage(url: URL, pushHistory: boolean): void {
    const nextPage = resolvePage(url.pathname)
    const pathname = normalizePath(url.pathname)

    page.value = nextPage
    updateHead(nextPage)

    if (pushHistory) {
      window.history.pushState(null, '', `${withBase(pathname)}${url.search}${url.hash}`)
    }

    void scrollToPage(url)
  }

  function handleClick(event: MouseEvent): void {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || !(event.target instanceof Element)
    ) {
      return
    }

    const anchor = event.target.closest<HTMLAnchorElement>('a[href]')

    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) {
      return
    }

    const url = new URL(anchor.href, window.location.href)
    const nextPage = resolvePage(url.pathname)

    if (
      url.origin !== window.location.origin
      || nextPage.statusCode !== 200
      || (url.pathname === window.location.pathname && url.search === window.location.search && url.hash)
    ) {
      return
    }

    event.preventDefault()
    showPage(url, true)
  }

  function handlePopState(): void {
    showPage(new URL(window.location.href), false)
  }

  onMounted(() => {
    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
    window.removeEventListener('popstate', handlePopState)
  })

  return { page: shallowReadonly(page) }
}
