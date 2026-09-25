import 'virtual:uno.css'
import '@lulu/vue/base.css'
import './docs.css'
import { createDocsApp } from './createApp'

const { app } = createDocsApp(window.location.pathname)

app.mount('#app')
