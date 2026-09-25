<script setup lang="ts">
import { shallowRef } from 'vue'
import { docsNavigation, guideNavigation, orderedDocsNavigationItems } from '../navigation'
import { withBase } from '../siteUrl'
import DocsSider from './layout/DocsSider.vue'

defineProps<{
  currentPath: string
  compact?: boolean
}>()

const isCollapsed = shallowRef(false)
</script>

<template>
  <DocsSider
    v-model:collapsed="isCollapsed"
    :sticky="!compact"
    top-offset="4rem"
    :width="compact ? '100%' : '260px'"
    collapsed-width="64px"
    :collapsible="!compact"
    class="select-none"
  >
    <div class="py-6 px-3">
      <!-- 菜单分类标题 -->
      <div v-if="!isCollapsed" class="px-3 mb-2 flex items-center justify-between">
        <span class="text-xs font-bold tracking-wider text-[var(--lulu-color-text-muted)] uppercase">
          UI 组件列表
        </span>
        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--lulu-color-surface-subtle)] text-[var(--lulu-color-text-muted)] border border-[var(--lulu-color-border-subtle)]">
          {{ orderedDocsNavigationItems.length }}
        </span>
      </div>

      <!-- 导航列表 -->
      <nav aria-label="组件导航">
        <section class="mb-5">
          <h2 v-if="!isCollapsed" class="m-0 mb-1 px-3 text-[11px] font-semibold text-[var(--lulu-color-text-muted)]">指南</h2>
          <ul class="m-0 list-none p-0 space-y-1">
            <li v-for="item in guideNavigation" :key="item.page.path">
              <a :href="withBase(item.page.path)" :aria-current="item.page.path === currentPath ? 'page' : undefined" :title="item.name" class="flex h-10 items-center rounded-lg px-3 text-sm hover:bg-[var(--lulu-color-surface-hover)]" :class="item.page.path === currentPath ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold' : 'text-[var(--lulu-color-text)]'">
                {{ isCollapsed ? item.name.slice(0, 1) : item.name }}
              </a>
            </li>
          </ul>
        </section>
        <section v-for="group in docsNavigation" :key="group.name" class="mb-5 last:mb-0">
          <h2 v-if="!isCollapsed" class="m-0 mb-1 px-3 text-[11px] font-semibold text-[var(--lulu-color-text-muted)]">
            {{ group.name }}
          </h2>
          <ul class="m-0 list-none p-0 space-y-1">
            <li v-for="item in group.items" :key="item.page.path">
              <a
                class="group relative flex items-center h-10 px-3 rounded-lg text-sm transition-all text-decoration-none"
                :class="[
                  item.page.path === currentPath
                    ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold'
                    : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-primary)]',
                  isCollapsed ? 'justify-center' : 'justify-between',
                ]"
                :href="withBase(item.page.path)"
                :title="item.name"
                :aria-current="item.page.path === currentPath ? 'page' : undefined"
              >
                <div
                  v-if="item.page.path === currentPath"
                  class="absolute left-0 top-2 bottom-2 w-1 bg-[var(--lulu-color-primary)] rounded-r"
                />

                <span v-if="!isCollapsed" class="truncate">
                  {{ item.name }}
                </span>
                <span v-else class="text-xs font-bold uppercase w-6 h-6 rounded bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] flex items-center justify-center">
                  {{ item.name.slice(0, 1) }}
                </span>

                <span
                  v-if="!isCollapsed && item.page.path === currentPath"
                  class="text-xs text-[var(--lulu-color-primary)]"
                >
                  ➔
                </span>
              </a>
            </li>
          </ul>
        </section>
      </nav>
    </div>
  </DocsSider>
</template>
