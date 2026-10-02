import 'virtual:uno.css'
import '@lulu/vue/base.css'
import './docs.css'
import './prism.css'
import { installCodeCopy } from './codeCopy'
import { createDocsApp } from './createApp'

const { app } = createDocsApp(window.location.pathname)

installCodeCopy()
app.mount('#app')
