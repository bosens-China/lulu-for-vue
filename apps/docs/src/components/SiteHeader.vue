<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluDialog from '@lulu/vue/dialog'
import '@lulu/vue/button/style.css'
import '@lulu/vue/dialog/style.css'
import { useTheme } from '../useTheme'
import { withBase } from '../siteUrl'
import DocsSearch from './DocsSearch.vue'
import DocsHeader from './layout/DocsHeader.vue'
import SiteSidebar from './SiteSidebar.vue'
import ThemePlayground from './ThemePlayground.vue'

defineProps<{ currentPath: string }>()
const { isDark, toggleTheme } = useTheme()
const menuOpen = ref(false)
const hasOpenedMenu = ref(false)
const paletteOpen = ref(false)
const githubUrl = import.meta.env.VITE_GITHUB_URL

function openMenu() {
  hasOpenedMenu.value = true
  menuOpen.value = true
}
</script>

<template>
  <DocsHeader class="h-16 border-b border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)]/90 backdrop-blur-md">
    <div class="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 sm:px-6">
      <LuluButton class="docs-icon-button lg:hidden" aria-label="打开组件导航" @click="openMenu"><span class="i-lucide-menu" aria-hidden="true" /></LuluButton>
      <a :href="withBase('/')" class="flex min-w-0 items-center gap-3 text-decoration-none" aria-label="LuLu UI Vue 首页">
        <img :src="withBase('/favicon.svg')" alt="" width="32" height="32" class="h-8 w-8 shrink-0 rounded-xl" />
        <span class="truncate text-base font-bold text-[var(--lulu-color-text-heading)]">LuLu UI Vue</span>
      </a>

      <div class="ml-auto flex items-center gap-2 sm:gap-3">
        <DocsSearch />
        <LuluButton class="docs-icon-button" aria-label="设置主色调" title="设置主色调" @click="paletteOpen = true"><span class="i-lucide-palette" aria-hidden="true" /></LuluButton>
        <LuluButton
          class="docs-icon-button"
          :aria-label="isDark ? '切换至浅色模式' : '切换至深色模式'"
          :title="isDark ? '切换至浅色模式' : '切换至深色模式'"
          @click="toggleTheme"
        ><span :class="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" aria-hidden="true" /></LuluButton>
        <a :href="withBase('/components/button/')" class="hidden rounded-lg px-3 py-2 text-xs font-semibold text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)] sm:inline">组件列表</a>
        <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener noreferrer" class="hidden text-xs text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)] sm:inline">GitHub</a>
      </div>
    </div>
  </DocsHeader>

  <LuluDialog v-if="hasOpenedMenu" v-model:open="menuOpen" title="组件导航" class="docs-mobile-nav">
    <template #header>
      <!-- 初始焦点用于读出导航标题，关闭按钮仍可通过 Tab 访问。 -->
      <span tabindex="-1" autofocus class="outline-none">组件导航</span>
    </template>
    <SiteSidebar :current-path="currentPath" compact @click="menuOpen = false" />
  </LuluDialog>
  <LuluDialog v-if="paletteOpen" v-model:open="paletteOpen" title="设置主色调" class="docs-palette-dialog">
    <ThemePlayground />
  </LuluDialog>
</template>
