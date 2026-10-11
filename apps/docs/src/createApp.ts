import { createSSRApp } from 'vue'
import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import PackageManagerTabs from './components/PackageManagerTabs.vue'
import GlobalTokenTable from './components/GlobalTokenTable.vue'
import { loadPage } from './routes'

export async function createDocsApp(url: string) {
  const page = await loadPage(url)
  const app = createSSRApp(App, { page })
  app.component('DemoBlock', DemoBlock)
  app.component('PackageManagerTabs', PackageManagerTabs)
  app.component('GlobalTokenTable', GlobalTokenTable)

  return { app, page }
}
