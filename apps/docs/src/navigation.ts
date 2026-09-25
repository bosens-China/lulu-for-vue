import docsConfig from '../docs.config'
import { docsRoutes, guideRoutes } from './routes'
import type {
  DocsNavigationGroupConfig,
  DocsPage,
} from './types'

export interface DocsNavigationItem {
  name: string
  page: DocsPage
}

export interface DocsNavigationGroup {
  name: string
  items: readonly DocsNavigationItem[]
}

export function createDocsNavigation(
  routes: readonly DocsPage[],
  groups: readonly DocsNavigationGroupConfig[],
): readonly DocsNavigationGroup[] {
  const routesByPath = new Map(routes.map(route => [route.path, route]))
  const configuredPaths = new Set<string>()

  const navigation = groups.map((group) => {
    if (!group.name.trim()) {
      throw new Error('[docs] 导航分组名称不能为空。')
    }

    const items = group.items.map((item) => {
      const path = `/components/${item.component}/`

      if (!item.name.trim()) {
        throw new Error(`[docs] 导航组件“${item.component}”的显示名称不能为空。`)
      }
      if (configuredPaths.has(path)) {
        throw new Error(`[docs] 导航组件“${item.component}”配置重复。`)
      }

      const page = routesByPath.get(path)
      if (!page) {
        throw new Error(`[docs] 导航配置引用了未扫描到的组件“${item.component}”。`)
      }

      configuredPaths.add(path)
      return { name: item.name.trim(), page }
    })

    return { name: group.name.trim(), items }
  })

  const missingPages = routes.filter(route => !configuredPaths.has(route.path))
  if (missingPages.length > 0) {
    const paths = missingPages.map(page => page.path).join('、')
    throw new Error(`[docs] 导航配置遗漏了已扫描的组件页面：${paths}`)
  }

  return navigation
}

export const docsNavigation = createDocsNavigation(docsRoutes, docsConfig.navigation)
export const orderedDocsNavigationItems = docsNavigation.flatMap(group => group.items)
const guideLabels = [
  ['installation', '安装'],
  ['quick-start', '快速开始'],
  ['theme', '主题定制'],
  ['on-demand', '按需引入'],
] as const

export const guideNavigation: readonly DocsNavigationItem[] = guideLabels.map(([slug, name]) => {
  const page = guideRoutes.find(route => route.path === `/guide/${slug}/`)
  if (!page) throw new Error(`[docs] 缺少指南页面：${slug}`)
  return { name, page }
})
