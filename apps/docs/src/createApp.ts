import { createSSRApp } from 'vue'
import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import { resolvePage } from './routes'

export function createDocsApp(url: string) {
  const page = resolvePage(url)
  const app = createSSRApp(App, { page })
  app.component('DemoBlock', DemoBlock)

  return { app, page }
}
