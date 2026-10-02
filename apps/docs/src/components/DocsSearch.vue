<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import LuluDialog from '@lulu/vue/dialog'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/dialog/style.css'
import '@lulu/vue/input/style.css'
import { guideNavigation, orderedDocsNavigationItems } from '../navigation'
import { withBase } from '../siteUrl'

const open = ref(false)
const query = ref('')
const selected = ref(0)
const searchTextByPath = shallowRef<ReadonlyMap<string, string>>(new Map())
let searchIndexPromise: Promise<ReadonlyMap<string, string>> | undefined

const results = computed(() => {
  const term = query.value.trim().toLocaleLowerCase()
  const items = [...guideNavigation, ...orderedDocsNavigationItems]
  if (!term) return items
  return items.filter(({ name, page }) =>
    `${name} ${page.heading} ${page.description} ${searchTextByPath.value.get(page.path) ?? ''}`
      .toLocaleLowerCase()
      .includes(term),
  )
})

function loadSearchIndex() {
  searchIndexPromise ??= import('../searchDocuments').then(({ markdownDocuments }) =>
    new Map(markdownDocuments.map(document => [document.path, document.searchText])))
  return searchIndexPromise
}

async function showSearch() {
  query.value = ''
  selected.value = 0
  open.value = true
  await nextTick()
  document.getElementById('docs-search-input')?.focus()
  try {
    searchTextByPath.value = await loadSearchIndex()
  }
  catch {
    // 索引分块加载失败时仍保留标题与描述搜索。
  }
}

function onGlobalKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
    event.preventDefault()
    void showSearch()
  }
}

function onSearchKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (results.value.length) {
      selected.value = (selected.value + (event.key === 'ArrowDown' ? 1 : -1) + results.value.length) % results.value.length
    }
  }
  if (event.key === 'Enter' && results.value[selected.value]) {
    event.preventDefault()
    document.querySelectorAll<HTMLAnchorElement>('#docs-search-results a')[selected.value]?.click()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <button
    type="button"
    aria-label="搜索文档与组件"
    class="flex h-9 items-center gap-2 rounded-xl border border-solid border-[var(--lulu-color-border)] bg-[var(--lulu-color-surface-subtle)] px-3 text-xs text-[var(--lulu-color-text-muted)] hover:border-[var(--lulu-color-primary)] hover:text-[var(--lulu-color-primary)]"
    @click="showSearch"
  >
    <span class="i-lucide-search text-base" aria-hidden="true" />
    <span class="hidden md:inline">搜索文档与组件...</span>
    <kbd class="hidden rounded border border-[var(--lulu-color-border-subtle)] px-1 text-[10px] md:inline">Ctrl K</kbd>
  </button>

  <LuluDialog v-if="open" v-model:open="open" title="搜索文档" class="docs-search-dialog">
    <label class="sr-only" for="docs-search-input">搜索组件</label>
    <LuluInput
      id="docs-search-input"
      autofocus
      v-model="query"
      class="w-full"
      placeholder="搜索标题、正文或代码"
      aria-controls="docs-search-results"
      @input="selected = 0"
      @keydown="onSearchKeydown"
    />
    <ul id="docs-search-results" class="mt-3 max-h-80 overflow-y-auto" aria-label="搜索结果">
      <li v-for="(item, index) in results" :key="item.page.path">
        <a
          :href="withBase(item.page.path)"
          class="block rounded-lg px-3 py-2 text-sm hover:bg-[var(--lulu-color-surface-hover)]"
          :class="index === selected ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)]' : ''"
          @mouseenter="selected = index"
          @click="open = false"
        >
          <strong>{{ item.name }}</strong>
          <span class="ml-2 text-xs text-[var(--lulu-color-text-muted)]">{{ item.page.description }}</span>
        </a>
      </li>
      <li v-if="results.length === 0" class="px-3 py-4 text-sm text-[var(--lulu-color-text-muted)]">没有找到匹配的文档</li>
    </ul>
  </LuluDialog>
</template>
