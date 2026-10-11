<script setup lang="ts">
import { computed } from 'vue'
import { guideNavigation, orderedDocsNavigationItems } from '../navigation'
import { withBase } from '../siteUrl'

const props = defineProps<{
  currentPath: string
}>()

const pages = [...guideNavigation, ...orderedDocsNavigationItems]
const currentIndex = computed(() => {
  return pages.findIndex(item => item.page.path === props.currentPath)
})

const prevItem = computed(() => {
  if (currentIndex.value > 0) {
    return pages[currentIndex.value - 1]
  }
  return null
})

const nextItem = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < pages.length - 1) {
    return pages[currentIndex.value + 1]
  }
  return null
})
</script>

<template>
  <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[var(--lulu-color-border-subtle)] pt-8 sm:mt-16 sm:gap-4 sm:pt-10">
    <!-- 上一页 -->
    <a
      v-if="prevItem"
      :href="withBase(prevItem.page.path)"
      class="group flex min-h-18 min-w-0 flex-col items-start rounded-md border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] p-3.5 sm:p-4 no-underline transition-all duration-200 hover:border-[var(--lulu-color-primary)]/50 hover:bg-[var(--lulu-color-surface-hover)]"
    >
      <span class="text-xs text-[var(--lulu-color-text-muted)] group-hover:text-[var(--lulu-color-primary)] flex items-center gap-1.5 transition-colors">
        <span class="i-lucide-arrow-left transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
        上一页
      </span>
      <span class="text-sm font-semibold text-[var(--docs-color-heading)] group-hover:text-[var(--lulu-color-primary)] mt-1.5 truncate max-w-full transition-colors">
        {{ prevItem.name }}
      </span>
    </a>
    <div v-else class="hidden sm:block" />

    <!-- 下一页 -->
    <a
      v-if="nextItem"
      :href="withBase(nextItem.page.path)"
      class="group flex min-h-18 min-w-0 flex-col items-end rounded-md border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] p-3.5 sm:p-4 text-right no-underline transition-all duration-200 hover:border-[var(--lulu-color-primary)]/50 hover:bg-[var(--lulu-color-surface-hover)]"
    >
      <span class="text-xs text-[var(--lulu-color-text-muted)] group-hover:text-[var(--lulu-color-primary)] flex items-center gap-1.5 transition-colors">
        下一页
        <span class="i-lucide-arrow-right transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
      <span class="text-sm font-semibold text-[var(--docs-color-heading)] group-hover:text-[var(--lulu-color-primary)] mt-1.5 truncate max-w-full transition-colors">
        {{ nextItem.name }}
      </span>
    </a>
  </div>
</template>
