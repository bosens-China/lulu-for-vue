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

defineProps<{ currentPath: string }>()
const { isDark, toggleTheme } = useTheme()
const menuOpen = ref(false)
const githubUrl = import.meta.env.VITE_GITHUB_URL
</script>

<template>
  <DocsHeader class="h-16 border-b border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)]/90 backdrop-blur-md">
    <div class="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 sm:px-6">
      <LuluButton class="docs-icon-button lg:hidden" aria-label="打开组件导航" @click="menuOpen = true">☰</LuluButton>
      <a :href="withBase('/')" class="flex min-w-0 items-center gap-3 text-decoration-none" aria-label="LuLu UI Vue 首页">
        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--lulu-color-primary)] text-base font-bold text-white">L</span>
        <span class="truncate text-base font-bold text-[var(--lulu-color-text-heading)]">LuLu UI Vue</span>
      </a>

      <div class="ml-auto flex items-center gap-2 sm:gap-3">
        <DocsSearch />
        <LuluButton
          class="docs-icon-button"
          :aria-label="isDark ? '切换至浅色模式' : '切换至深色模式'"
          :title="isDark ? '切换至浅色模式' : '切换至深色模式'"
          @click="toggleTheme"
        >{{ isDark ? '☀' : '☾' }}</LuluButton>
        <a :href="withBase('/components/button/')" class="hidden rounded-lg px-3 py-2 text-xs font-semibold text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)] sm:inline">组件列表</a>
        <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener noreferrer" class="hidden text-xs text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)] sm:inline">GitHub</a>
      </div>
    </div>
  </DocsHeader>

  <LuluDialog v-if="menuOpen" v-model:open="menuOpen" title="组件导航" class="docs-mobile-nav">
    <SiteSidebar :current-path="currentPath" compact @click="menuOpen = false" />
  </LuluDialog>
</template>
