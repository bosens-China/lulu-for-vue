<script setup lang="ts">
import { computed, ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluDialog from '@lulu/vue/dialog'
import LuluTooltip from '@lulu/vue/tooltip'
import '@lulu/vue/button/style.css'
import '@lulu/vue/dialog/style.css'
import '@lulu/vue/tooltip/style.css'
import { useTheme } from '../useTheme'
import { withBase } from '../siteUrl'
import DocsSearch from './DocsSearch.vue'
import DocsHeader from './layout/DocsHeader.vue'
import SiteSidebar from './SiteSidebar.vue'
import ThemePlayground from './ThemePlayground.vue'

const props = defineProps<{
  currentPath: string
}>()

const { themeMode, toggleTheme } = useTheme()
const menuOpen = ref(false)
const hasOpenedMenu = ref(false)
const paletteOpen = ref(false)
const githubUrl = import.meta.env.VITE_GITHUB_URL

const isGuideActive = computed(() => props.currentPath.startsWith('/guide/'))
const isComponentActive = computed(() => props.currentPath.startsWith('/components/') || (!isGuideActive.value && props.currentPath !== '/'))

const themeAction = computed(() => themeMode.value === 'system'
  ? '当前跟随系统，切换至浅色模式'
  : themeMode.value === 'light' ? '切换至深色模式' : '切换至跟随系统')

const themeIcon = computed(() => themeMode.value === 'system'
  ? 'i-lucide-monitor'
  : themeMode.value === 'light' ? 'i-lucide-sun' : 'i-lucide-moon')

function openMenu() {
  hasOpenedMenu.value = true
  menuOpen.value = true
}
</script>

<template>
  <DocsHeader class="h-16 border-b border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]/90 backdrop-blur-md sticky top-0 z-30">
    <div class="mx-auto flex h-full w-full max-w-[1720px] items-center gap-2 sm:gap-3 px-4 sm:px-8">
      <!-- 移动端汉堡包菜单按钮 -->
      <LuluButton class="docs-icon-button lg:hidden" aria-label="打开组件导航" @click="openMenu">
        <span class="i-lucide-menu" aria-hidden="true" />
      </LuluButton>

      <!-- 站点 Logo 与标题 -->
      <a :href="withBase('/')" class="flex min-w-0 items-center gap-2.5 text-decoration-none" aria-label="LuLu UI Vue 首页">
        <img :src="withBase('/favicon.svg')" alt="" width="30" height="30" class="h-7.5 w-7.5 shrink-0 rounded-xl" />
        <span class="truncate text-base font-bold text-[var(--docs-color-heading)]">LuLu UI Vue</span>
      </a>

      <!-- 主导航链接栏：拆分为独立章节（指南 vs 组件列表） -->
      <nav class="hidden md:flex items-center gap-1.5 ml-4 sm:ml-8 text-sm" aria-label="主导航">
        <a
          :href="withBase('/guide/installation/')"
          class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-decoration-none"
          :class="isGuideActive
            ? 'text-[var(--lulu-color-primary)] bg-[var(--lulu-color-surface-selected)] font-semibold'
            : 'text-[var(--lulu-color-text)] hover:text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)]'"
        >
          指南
        </a>
        <a
          :href="withBase('/components/button/')"
          class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-decoration-none"
          :class="isComponentActive
            ? 'text-[var(--lulu-color-primary)] bg-[var(--lulu-color-surface-selected)] font-semibold'
            : 'text-[var(--lulu-color-text)] hover:text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)]'"
        >
          组件列表
        </a>
      </nav>

      <!-- 右侧工具操作区：搜索、分割线、调色盘、主题模式、GitHub 图标 -->
      <div class="ml-auto flex items-center gap-1.5 sm:gap-2">
        <DocsSearch />

        <div class="hidden sm:block h-4 w-px bg-[var(--lulu-color-border-subtle)] mx-1" aria-hidden="true" />

        <LuluTooltip placement="bottom">
          <template #trigger="{ triggerProps }">
            <LuluButton
              v-bind="triggerProps"
              class="docs-icon-button"
              aria-label="设置主色调"
              @click="paletteOpen = true"
            >
              <span class="i-lucide-palette" aria-hidden="true" />
            </LuluButton>
          </template>
          设置主色调
        </LuluTooltip>

        <LuluTooltip placement="bottom">
          <template #trigger="{ triggerProps }">
            <LuluButton
              v-bind="triggerProps"
              class="docs-icon-button"
              :aria-label="themeAction"
              @click="toggleTheme"
            >
              <span :class="themeIcon" aria-hidden="true" />
            </LuluButton>
          </template>
          {{ themeAction }}
        </LuluTooltip>

        <LuluTooltip v-if="githubUrl" placement="bottom">
          <template #trigger="{ triggerProps }">
            <LuluButton
              v-bind="triggerProps"
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="docs-icon-button"
              aria-label="GitHub 源码仓库"
            >
              <span class="i-lucide-github text-lg" aria-hidden="true" />
            </LuluButton>
          </template>
          GitHub 源码仓库
        </LuluTooltip>
      </div>
    </div>
  </DocsHeader>

  <!-- 移动端侧边栏抽屉导航 -->
  <LuluDialog v-if="hasOpenedMenu" v-model:open="menuOpen" title="文档导航" class="docs-mobile-nav">
    <SiteSidebar :current-path="currentPath" compact @click="menuOpen = false" />
  </LuluDialog>

  <!-- 颜色主题定制器弹窗 -->
  <LuluDialog v-if="paletteOpen" v-model:open="paletteOpen" title="设置主色调" class="docs-palette-dialog">
    <ThemePlayground />
  </LuluDialog>
</template>
