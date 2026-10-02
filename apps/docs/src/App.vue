<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <div class="min-h-screen bg-[var(--lulu-color-bg-page)] text-[var(--lulu-color-text)] flex flex-col font-sans transition-colors duration-200">
    <!-- 1. 顶部 Header -->
    <SiteHeader :current-path="currentPage.path" />

    <!-- 首页保持独立，组件路由才进入文档侧栏布局。 -->
    <component :is="currentPage.component" v-if="currentPage.path === '/' && currentPage.component" />

    <!-- 组件文档主布局体 -->
    <div v-else class="flex-1 w-full max-w-7xl mx-auto flex">
      <DocsLayout class="bg-[var(--lulu-color-bg-container)] min-h-[calc(100vh-4rem)] border-x border-[var(--lulu-color-border-subtle)]">
        <!-- 侧边栏 Sider -->
        <SiteSidebar :current-path="currentPage.path" class="hidden lg:block" />

        <!-- 主内容区 Content -->
        <DocsContent class="min-w-0 p-4 sm:p-8 lg:p-10">
          <main class="docs-content max-w-4xl mx-auto">
            <!-- 页面核心渲染区 -->
            <component :is="currentPage.component" v-if="currentPage.component" />
            <PlaceholderPage v-else :page="currentPage" />

            <a
              v-if="pageSourceUrl"
              :href="pageSourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-8 inline-flex items-center gap-2 text-sm text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)]"
            >
              <span class="i-lucide-file-code" aria-hidden="true" />
              在 GitHub 上查看此页源码
            </a>

            <!-- 底部上一页/下一页组件快捷切换导航 -->
            <DocFooterNav :current-path="currentPage.path" />
          </main>

          <!-- 全局页脚 Footer -->
          <footer class="mt-8 text-center text-xs text-[var(--lulu-color-text-muted)] py-6 border-t border-[var(--lulu-color-border-subtle)] sm:mt-16">
            LuLu UI Vue Docs © 2026. Inspired by Ant Design & LuLu UI.
          </footer>
        </DocsContent>
        <DocsOutline :current-path="currentPage.path" class="hidden xl:block" />
      </DocsLayout>
    </div>
  </div>
</template>
