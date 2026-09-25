/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module '*.md' {
  import type { Component } from 'vue'

  export const description: unknown
  export const seo: unknown
  export const title: unknown
  const component: Component
  export default component
}
