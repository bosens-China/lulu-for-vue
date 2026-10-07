<script setup lang="ts">
import { computed } from 'vue'
import { docsNavigation, guideNavigation, orderedDocsNavigationItems } from '../navigation'
import { withBase } from '../siteUrl'
import DocsSider from './layout/DocsSider.vue'

const props = withDefaults(
  defineProps<{
    currentPath: string
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

// 判断当前是否处于指南章节
const isGuideSection = computed(() => props.currentPath.startsWith('/guide/'))
</script>

<template>
  <DocsSider
    :sticky="!compact"
    top-offset="4rem"
    :width="compact ? '100%' : '260px'"
    :collapsible="false"
    class="site-sidebar select-none transition-colors"
  >
    <div class="py-6 px-3">
      <!-- 1. 指南章节侧边栏内容 -->
      <template v-if="isGuideSection">
        <div class="px-3 mb-3 flex items-center justify-between">
          <span class="text-xs font-bold tracking-wider text-[var(--lulu-color-text-muted)] uppercase">
            开发指南
          </span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--lulu-color-surface-subtle)] text-[var(--lulu-color-text-muted)] border border-[var(--lulu-color-border-subtle)]">
            {{ guideNavigation.length }}
          </span>
        </div>

        <nav aria-label="开发指南导航">
          <ul class="m-0 list-none p-0 space-y-1">
            <li v-for="item in guideNavigation" :key="item.page.path">
              <a
                :href="withBase(item.page.path)"
                :aria-current="item.page.path === currentPath ? 'page' : undefined"
                :title="item.name"
                class="group relative flex items-center justify-between h-9 px-3 rounded-lg text-sm transition-colors text-decoration-none"
                :class="item.page.path === currentPath
                  ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold'
                  : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-primary)]'"
              >
                <div
                  v-if="item.page.path === currentPath"
                  class="absolute left-0 top-2 bottom-2 w-1 bg-[var(--lulu-color-primary)] rounded-r"
                />
                <span class="truncate">{{ item.name }}</span>
                <span v-if="item.page.path === currentPath" class="i-lucide-chevron-right shrink-0 text-sm text-[var(--lulu-color-primary)]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </template>

      <!-- 2. 组件列表章节侧边栏内容 -->
      <template v-else>
        <div class="px-3 mb-3 flex items-center justify-between">
          <span class="text-xs font-bold tracking-wider text-[var(--lulu-color-text-muted)] uppercase">
            UI 组件列表
          </span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--lulu-color-surface-subtle)] text-[var(--lulu-color-text-muted)] border border-[var(--lulu-color-border-subtle)]">
            {{ orderedDocsNavigationItems.length }}
          </span>
        </div>

        <nav aria-label="UI组件导航">
          <section v-for="group in docsNavigation" :key="group.name" class="mb-5 last:mb-0">
            <h2 class="m-0 mb-1 px-3 text-[11px] font-semibold text-[var(--lulu-color-text-muted)]">
              {{ group.name }}
            </h2>
            <ul class="m-0 list-none p-0 space-y-1">
              <li v-for="item in group.items" :key="item.page.path">
                <a
                  class="group relative flex items-center justify-between h-9 px-3 rounded-lg text-sm transition-colors text-decoration-none"
                  :class="item.page.path === currentPath
                    ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold'
                    : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-primary)]'"
                  :href="withBase(item.page.path)"
                  :title="item.name"
                  :aria-current="item.page.path === currentPath ? 'page' : undefined"
                >
                  <div
                    v-if="item.page.path === currentPath"
                    class="absolute left-0 top-2 bottom-2 w-1 bg-[var(--lulu-color-primary)] rounded-r"
                  />
                  <span class="truncate">{{ item.name }}</span>
                  <span v-if="item.page.path === currentPath" class="i-lucide-chevron-right shrink-0 text-sm text-[var(--lulu-color-primary)]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </template>
    </div>
  </DocsSider>
</template>
