import { createSSRApp } from 'vue'
import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import PackageManagerTabs from './components/PackageManagerTabs.vue'
import { resolvePage } from './routes'

export function createDocsApp(url: string) {
  const page = resolvePage(url)
  const app = createSSRApp(App, { page })
  app.component('DemoBlock', DemoBlock)
  app.component('PackageManagerTabs', PackageManagerTabs)

  return { app, page }
}
