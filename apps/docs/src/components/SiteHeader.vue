<script setup lang="ts">
import { computed, defineAsyncComponent, h, ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluDialog from '@lulu/vue/dialog'
import LuluDropdown, { type DropdownItem } from '@lulu/vue/dropdown'
import LuluTooltip from '@lulu/vue/tooltip'
import '@lulu/vue/button/style.css'
import '@lulu/vue/dialog/style.css'
import '@lulu/vue/dropdown/style.css'
import '@lulu/vue/tooltip/style.css'
import { useTheme, type ThemeMode } from '../useTheme'
import { withBase } from '../siteUrl'
import DocsSearch from './DocsSearch.vue'
import DocsHeader from './layout/DocsHeader.vue'
import SiteSidebar from './SiteSidebar.vue'
import { editorDefaults } from '../tokenOverrides'

const ThemePlayground = defineAsyncComponent({
  loader: () => import('./ThemePlayground.vue'),
  loadingComponent: () => h('p', { role: 'status' }, '正在加载主题设置…'),
  errorComponent: () => h('p', { role: 'alert' }, '主题设置加载失败，请关闭后重试。'),
  timeout: 30000,
})

const props = defineProps<{
  currentPath: string
}>()

const { themeMode, setTheme, isDark } = useTheme()
const menuOpen = ref(false)
const paletteOpen = ref(false)
const githubUrl = import.meta.env.VITE_GITHUB_URL

const isGuideActive = computed(() => props.currentPath.startsWith('/guide/'))
const isComponentActive = computed(() => props.currentPath.startsWith('/components/') || (!isGuideActive.value && props.currentPath !== '/'))

const themeOptions: DropdownItem[] = [
  { label: '浅色模式', value: 'light' },
  { label: '深色模式', value: 'dark' },
  { label: '跟随系统', value: 'system' },
]

const currentThemeLabel = computed(() => {
  if (themeMode.value === 'light') return '浅色模式'
  if (themeMode.value === 'dark') return '深色模式'
  return '跟随系统'
})

const themeIcon = computed(() => {
  if (themeMode.value === 'light') return 'i-lucide-sun'
  if (themeMode.value === 'dark') return 'i-lucide-moon'
  return 'i-lucide-monitor'
})

function handleThemeSelect(item: DropdownItem) {
  setTheme(item.value as ThemeMode)
}

function openMenu() {
  menuOpen.value = true
}
</script>

<template>
  <DocsHeader class="h-14 sm:h-16 border-b border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)] sticky top-0 z-30 transition-colors">
    <div class="mx-auto flex h-full w-full max-w-[1440px] items-center gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8">
      <!-- 移动端汉堡包菜单按钮 -->
      <LuluButton class="docs-icon-button lg:!hidden" aria-label="打开组件导航" @click="openMenu">
        <span class="i-lucide-menu" aria-hidden="true" />
      </LuluButton>

      <!-- 站点 Logo 与标题 -->
      <a :href="withBase('/')" class="flex min-w-0 items-center gap-2 sm:gap-2.5 no-underline group" aria-label="LuLu UI Vue 首页">
        <img :src="withBase('/favicon.svg')" alt="" width="28" height="28" class="h-6.5 w-6.5 sm:h-7 sm:w-7 shrink-0" />
        <span class="truncate text-sm sm:text-base font-semibold text-[var(--docs-color-heading)] tracking-tight">LuLu UI Vue</span>
      </a>

      <!-- 右侧工具操作区 -->
      <div class="ml-auto flex items-center gap-1 sm:gap-1.5">
        <DocsSearch />
        <!-- 主导航链接栏 -->
        <nav class="hidden md:flex items-center gap-6 mx-5 text-sm" aria-label="主导航">
          <a
            :aria-current="isGuideActive ? 'page' : undefined"
            :href="withBase('/guide/installation/')"
            class="py-2 text-sm font-medium transition-colors no-underline"
            :class="isGuideActive
              ? 'text-[var(--lulu-color-primary)]'
              : 'text-[var(--lulu-color-text)] hover:text-[var(--lulu-color-primary)]'"
          >
            指南
          </a>
          <a
            :aria-current="isComponentActive ? 'page' : undefined"
            :href="withBase('/components/button/')"
            class="py-2 text-sm font-medium transition-colors no-underline"
            :class="isComponentActive
              ? 'text-[var(--lulu-color-primary)]'
              : 'text-[var(--lulu-color-text)] hover:text-[var(--lulu-color-primary)]'"
          >
            组件列表
          </a>
        </nav>

        <div class="hidden sm:block h-4 w-px bg-[var(--lulu-color-border-subtle)] mx-1" aria-hidden="true" />

        <!-- 调色盘主色定制 -->
        <LuluTooltip placement="bottom">
          <template #trigger="{ triggerProps }">
            <LuluButton
              v-bind="triggerProps"
              class="docs-icon-button"
              aria-label="设置全局主题"
              @click="paletteOpen = true"
            >
              <span class="i-lucide-palette" aria-hidden="true" />
            </LuluButton>
          </template>
          设置全局主题
        </LuluTooltip>

        <!-- 主题模式切换 (下拉菜单模式) -->
        <LuluDropdown
          :items="themeOptions"
          placement="bottom-end"
          @select="handleThemeSelect"
        >
          <template #trigger="{ triggerProps }">
            <LuluButton
              v-bind="triggerProps"
              class="docs-icon-button"
              :aria-label="`当前主题：${currentThemeLabel}`"
              title="切换主题模式"
            >
              <span :class="themeIcon" aria-hidden="true" />
            </LuluButton>
          </template>
        </LuluDropdown>

        <!-- GitHub 链接 -->
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
              <span class="i-lucide-github text-base sm:text-lg" aria-hidden="true" />
            </LuluButton>
          </template>
          GitHub 源码仓库
        </LuluTooltip>
      </div>
    </div>
  </DocsHeader>

  <!-- 复用原生模态能力，统一焦点约束、Escape 和关闭后的焦点还原。 -->
  <LuluDialog
    v-if="menuOpen"
    v-model:open="menuOpen"
    title="文档导航"
    close-label="关闭导航"
    class="docs-navigation-dialog"
  >
    <nav class="flex gap-4 border-b border-[var(--lulu-color-border-subtle)] px-7 py-4 text-sm" aria-label="移动端主导航">
      <a :href="withBase('/guide/installation/')" class="no-underline text-[var(--lulu-color-text)]" @click="menuOpen = false">指南</a>
      <a :href="withBase('/components/button/')" class="no-underline text-[var(--lulu-color-text)]" @click="menuOpen = false">组件列表</a>
    </nav>
    <SiteSidebar :current-path="currentPath" compact @navigate="menuOpen = false" />
  </LuluDialog>

  <!-- 颜色主题定制器弹窗 -->
  <LuluDialog v-if="paletteOpen" v-model:open="paletteOpen" :style="editorDefaults(isDark ? 'dark' : 'light')" title="全局主题设置" class="docs-palette-dialog">
    <ThemePlayground @navigate="paletteOpen = false" />
  </LuluDialog>
</template>
