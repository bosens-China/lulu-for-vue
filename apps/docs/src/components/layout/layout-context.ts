import type { InjectionKey, Ref } from 'vue'

export interface LayoutContext {
  registerSider: () => () => void
  hasSider: Ref<boolean>
}

export const LAYOUT_CONTEXT_KEY: InjectionKey<LayoutContext> = Symbol('DocsLayoutContext')
