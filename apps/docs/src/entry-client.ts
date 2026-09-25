import 'virtual:uno.css'
import '@lulu/vue/base.css'
import './docs.css'
import Prism from 'prismjs'
import { createDocsApp } from './createApp'

// 文档代码块在构建时已高亮，避免浏览器自动扫描覆盖结果。
Prism.manual = true

const { app } = createDocsApp(window.location.pathname)

app.mount('#app')
