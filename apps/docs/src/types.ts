import type { Component } from 'vue'

export interface DocsSeo {
  description: string | null
  image: string | null
  keywords: readonly string[]
  title: string | null
}

export interface DocsPage {
  path: string
  title: string
  description: string
  heading: string
  component: Component | null
  seo: DocsSeo
  statusCode: 200 | 404
}

export interface DocsNavigationItemConfig {
  component: string
  name: string
}

export interface DocsNavigationGroupConfig {
  name: string
  items: readonly DocsNavigationItemConfig[]
}

export interface DocsConfig {
  navigation: readonly DocsNavigationGroupConfig[]
}

export interface RenderResult {
  appHtml: string
  headHtml: string
  locale: 'zh-CN'
  modules: Set<string>
  statusCode: 200 | 404
}
