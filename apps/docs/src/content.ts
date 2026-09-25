import type { Component } from 'vue'
import type { DocsPage, DocsSeo } from './types'

export interface MarkdownPageModule {
  default: Component
  description?: unknown
  seo?: unknown
  title?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requireText(value: unknown, field: string, sourcePath: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`[docs] ${sourcePath}: frontmatter.${field} 必须是非空字符串。`)
  }

  return value.trim()
}

function parseSeo(value: unknown, sourcePath: string): DocsSeo {
  if (value === undefined) {
    return { image: null, keywords: [], title: null, description: null }
  }

  if (!isRecord(value)) {
    throw new Error(`[docs] ${sourcePath}: frontmatter.seo 必须是对象。`)
  }

  const keywords = value.keywords === undefined
    ? []
    : Array.isArray(value.keywords) && value.keywords.every((item) => typeof item === 'string' && item.trim() !== '')
      ? value.keywords.map((item) => item.trim())
      : null

  if (!keywords) {
    throw new Error(`[docs] ${sourcePath}: frontmatter.seo.keywords 必须是非空字符串数组。`)
  }

  const optionalText = (field: 'description' | 'image' | 'title'): string | null => {
    const fieldValue = value[field]
    return fieldValue === undefined ? null : requireText(fieldValue, `seo.${field}`, sourcePath)
  }

  return {
    description: optionalText('description'),
    image: optionalText('image'),
    keywords,
    title: optionalText('title'),
  }
}

function createPage(
  slug: string,
  sourcePath: string,
  pageModule: MarkdownPageModule,
): DocsPage {
  const heading = requireText(pageModule.title, 'title', sourcePath)
  const baseDescription = requireText(pageModule.description, 'description', sourcePath)
  const seo = parseSeo(pageModule.seo, sourcePath)
  return {
    component: pageModule.default,
    description: seo.description ?? baseDescription,
    heading,
    path: `/components/${slug}/`,
    seo,
    statusCode: 200,
    title: seo.title ?? `${heading} - LuLu UI Vue`,
  }
}

function parseDocumentPath(sourcePath: string): string {
  const normalizedPath = sourcePath.replaceAll('\\', '/')
  const match = normalizedPath.match(/\/components\/(?:[^/]+\/)*([^/]+)\/readme\/README\.md$/)

  if (!match?.[1]) {
    throw new Error(`[docs] 无法从文档路径生成组件路由：${sourcePath}`)
  }

  return match[1]
}

export function createDocsRoutes(modules: Record<string, MarkdownPageModule>): readonly DocsPage[] {
  const documents = new Map<string, { module: MarkdownPageModule, sourcePath: string }>()

  for (const [sourcePath, pageModule] of Object.entries(modules)) {
    const slug = parseDocumentPath(sourcePath)

    if (documents.has(slug)) {
      throw new Error(`[docs] 组件路由“${slug}”存在重复的 README.md。`)
    }

    documents.set(slug, { module: pageModule, sourcePath })
  }

  return [...documents.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([slug, document]) => createPage(slug, document.sourcePath, document.module))
}

export function createGuideRoutes(modules: Record<string, MarkdownPageModule>): readonly DocsPage[] {
  return Object.entries(modules).map(([sourcePath, pageModule]) => {
    const slug = sourcePath.replaceAll('\\', '/').match(/\/guides\/([a-z][a-z-]*)\.md$/)?.[1]
    if (!slug) throw new Error(`[docs] 无法从指南路径生成路由：${sourcePath}`)
    const heading = requireText(pageModule.title, 'title', sourcePath)
    const description = requireText(pageModule.description, 'description', sourcePath)
    const seo = parseSeo(pageModule.seo, sourcePath)
    return {
      component: pageModule.default,
      description: seo.description ?? description,
      heading,
      path: `/guide/${slug}/`,
      seo,
      statusCode: 200 as const,
      title: seo.title ?? `${heading} - LuLu UI Vue`,
    }
  }).sort((left, right) => left.path.localeCompare(right.path))
}
