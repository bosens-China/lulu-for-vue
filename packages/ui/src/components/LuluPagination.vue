<script setup lang="ts">
import { computed, watch } from 'vue'

interface Props {
  total: number
  pageSize?: number
  disabled?: boolean
  ariaLabel?: string
  previousLabel?: string
  nextLabel?: string
  pageLabel?: (page: number) => string
}

type PageItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis'; key: 'start' | 'end' }

const props = withDefaults(defineProps<Props>(), {
  pageSize: 20,
  disabled: false,
})

const modelValue = defineModel<number>({ required: true })

const pageCount = computed(() => {
  const total = toIntegerAtLeast(props.total, 0)
  const pageSize = toIntegerAtLeast(props.pageSize, 1)

  return Math.max(1, Math.ceil(total / pageSize))
})

const currentPage = computed(() =>
  clamp(toIntegerAtLeast(modelValue.value, 1), 1, pageCount.value),
)

const pageItems = computed<PageItem[]>(() => {
  const visiblePages = new Set([1, pageCount.value])

  for (const page of [currentPage.value - 1, currentPage.value, currentPage.value + 1]) {
    if (page > 1 && page < pageCount.value) {
      visiblePages.add(page)
    }
  }

  const items: PageItem[] = []
  let previousPage: number | undefined

  for (const page of [...visiblePages].sort((left, right) => left - right)) {
    if (previousPage !== undefined) {
      const gap = page - previousPage

      if (gap === 2) {
        items.push({ type: 'page', page: previousPage + 1 })
      } else if (gap > 2) {
        items.push({
          type: 'ellipsis',
          key: previousPage === 1 ? 'start' : 'end',
        })
      }
    }

    items.push({ type: 'page', page })
    previousPage = page
  }

  return items
})

watch(
  currentPage,
  (page) => {
    if (modelValue.value !== page) {
      modelValue.value = page
    }
  },
  { flush: 'sync' },
)

function goTo(page: number) {
  if (props.disabled) {
    return
  }

  const nextPage = clamp(toIntegerAtLeast(page, 1), 1, pageCount.value)

  if (nextPage !== currentPage.value) {
    modelValue.value = nextPage
  }
}

function toIntegerAtLeast(value: number, minimum: number) {
  return Number.isFinite(value) ? Math.max(minimum, Math.floor(value)) : minimum
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}
</script>

<template>
  <nav v-if="pageCount > 1" class="lulu-pagination" :aria-label="props.ariaLabel ?? 'Pagination'">
    <button
      type="button"
      class="lulu-pagination__button"
      :aria-label="props.previousLabel ?? 'Previous page'"
      :disabled="props.disabled || currentPage === 1"
      @click="goTo(currentPage - 1)"
    >
      ‹
    </button>

    <template v-for="item in pageItems" :key="item.type === 'page' ? item.page : item.key">
      <span
        v-if="item.type === 'ellipsis'"
        class="lulu-pagination__ellipsis"
        aria-hidden="true"
      >
        …
      </span>
      <button
        v-else
        type="button"
        class="lulu-pagination__button"
        :aria-current="item.page === currentPage ? 'page' : undefined"
        :disabled="props.disabled || item.page === currentPage"
        :aria-label="props.pageLabel?.(item.page) ?? `Page ${item.page}`"
        @click="goTo(item.page)"
      >
        {{ item.page }}
      </button>
    </template>

    <button
      type="button"
      class="lulu-pagination__button"
      :aria-label="props.nextLabel ?? 'Next page'"
      :disabled="props.disabled || currentPage === pageCount"
      @click="goTo(currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>
