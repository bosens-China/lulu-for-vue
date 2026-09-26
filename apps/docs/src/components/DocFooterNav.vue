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
  <div class="mt-8 grid grid-cols-2 gap-2 border-t border-[var(--lulu-color-border-subtle)] pt-6 sm:mt-16 sm:gap-4 sm:pt-8">
    <!-- 上一页 -->
    <a
      v-if="prevItem"
      :href="withBase(prevItem.page.path)"
      class="group flex min-h-20 min-w-0 flex-col items-start rounded-lg border border-[var(--lulu-color-border)] bg-[var(--lulu-color-surface-subtle)] p-3 text-decoration-none transition-colors hover:border-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)] sm:p-4"
    >
      <span class="text-xs text-[var(--lulu-color-text-muted)] group-hover:text-[var(--lulu-color-primary)] flex items-center gap-1">
        ← 上一页
      </span>
      <span class="text-sm font-semibold text-[var(--lulu-color-text-heading)] group-hover:text-[var(--lulu-color-primary)] mt-1">
        {{ prevItem.name }}
      </span>
    </a>
    <div v-else />

    <!-- 下一页 -->
    <a
      v-if="nextItem"
      :href="withBase(nextItem.page.path)"
      class="group flex min-h-20 min-w-0 flex-col items-end rounded-lg border border-[var(--lulu-color-border)] bg-[var(--lulu-color-surface-subtle)] p-3 text-right text-decoration-none transition-colors hover:border-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)] sm:p-4"
    >
      <span class="text-xs text-[var(--lulu-color-text-muted)] group-hover:text-[var(--lulu-color-primary)] flex items-center gap-1">
        下一页 →
      </span>
      <span class="text-sm font-semibold text-[var(--lulu-color-text-heading)] group-hover:text-[var(--lulu-color-primary)] mt-1">
        {{ nextItem.name }}
      </span>
    </a>
  </div>
</template>
