import { createSSRApp } from 'vue'
import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import ThemePlayground from './components/ThemePlayground.vue'
import { resolvePage } from './routes'

export function createDocsApp(url: string) {
  const page = resolvePage(url)
  const app = createSSRApp(App, { page })
  app.component('DemoBlock', DemoBlock)
  app.component('ThemePlayground', ThemePlayground)

  return { app, page }
}
