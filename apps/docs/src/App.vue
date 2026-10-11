<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import LuluProgress from '@lulu/vue/progress'
import LuluMessageHost from '@lulu/vue/message-host'
import '@lulu/vue/progress/style.css'
import '@lulu/vue/message-host/style.css'
import DocFooterNav from './components/DocFooterNav.vue'
import DocsContent from './components/layout/DocsContent.vue'
import DocsLayout from './components/layout/DocsLayout.vue'
import PlaceholderPage from './components/PlaceholderPage.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteSidebar from './components/SiteSidebar.vue'
import DocsOutline from './components/DocsOutline.vue'
import type { DocsPage } from './types'
import { useDocsNavigation } from './useDocsNavigation'
import { githubSourceUrl } from './siteUrl'

const props = defineProps<{
  page: DocsPage
}>()

const { page: currentPage } = useDocsNavigation(props.page)
const pageSourceUrl = computed(() => githubSourceUrl(currentPage.value.sourcePath))

// 页面滚动进度计算
const scrollPercent = ref(0)
const showBackToTop = ref(false)

function handleScroll() {
  if (typeof window === 'undefined') return
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0
  showBackToTop.value = scrollY > 360
}

function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <LuluMessageHost>
  <div class="min-h-screen bg-[var(--docs-color-page)] text-[var(--lulu-color-text)] flex flex-col docs-site transition-colors duration-200">
    <!-- 页面顶部阅读进度条 (仅文档内页显示) -->
      <div v-if="currentPage.path !== '/'" class="docs-reading-progress">
        <LuluProgress :value="scrollPercent" :max="100" />
      </div>

      <!-- 1. 顶部 Header -->
      <SiteHeader :current-path="currentPage.path" />

      <!-- 首页独立渲染 -->
      <component :is="currentPage.component" v-if="currentPage.path === '/' && currentPage.component" />

      <!-- 文档主体布局体：自适应响应式网格 -->
      <div v-else class="flex-1 w-full flex justify-center bg-[var(--docs-color-container)]">
        <DocsLayout :has-sider="true" class="w-full max-w-[1440px] bg-[var(--docs-color-container)] min-h-[calc(100vh-4rem)]">
          <!-- 侧边栏 Sider：桌面与大平板固定展示 -->
          <SiteSidebar
            :current-path="currentPage.path"
            class="hidden lg:block shrink-0"
          />

          <!-- 主内容区 Content：在大屏下优雅舒展，移动端自适应内边距 -->
          <DocsContent tag="div" class="min-w-0 flex-1 px-5 py-8 sm:p-8 lg:px-12 lg:py-14">
            <main class="docs-content w-full max-w-[760px] mx-auto">
              <!-- 页面核心渲染区 -->
              <component :is="currentPage.component" v-if="currentPage.component" />
              <PlaceholderPage v-else :page="currentPage" />

              <a
                v-if="pageSourceUrl"
                :href="pageSourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-10 inline-flex items-center gap-2 text-sm text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)] no-underline transition-colors"
              >
                <span class="i-lucide-file-code" aria-hidden="true" />
                在 GitHub 上查看此页源码
              </a>

              <!-- 底部上一页/下一页组件快捷切换导航 -->
              <DocFooterNav :current-path="currentPage.path" />
            </main>
          </DocsContent>

          <!-- 本页目录 TOC：大屏常驻，小屏提供浮动抽屉 -->
          <DocsOutline :current-path="currentPage.path" />
        </DocsLayout>
      </div>

      <!-- 全局返回顶部浮动按钮 -->
      <button
        v-if="showBackToTop"
        type="button"
        aria-label="返回顶部"
        class="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]/90 backdrop-blur-md text-[var(--lulu-color-text-muted)] shadow-md hover:text-[var(--lulu-color-primary)] hover:border-[var(--lulu-color-primary)]/40 hover:-translate-y-0.5 cursor-pointer transition-all active:scale-95"
        @click="scrollToTop"
      >
        <span class="i-lucide-arrow-up text-base" aria-hidden="true" />
      </button>

      <!-- 全局页脚 Footer -->
      <footer class="w-full text-center text-xs text-[var(--lulu-color-text-muted)] py-6 border-t border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]">
        <div class="max-w-[1680px] mx-auto px-4 sm:px-8">
          LuLu UI Vue © 2026 · 清晰、克制的 Vue 组件体验
        </div>
      </footer>
    </div>
  </LuluMessageHost>
</template>
