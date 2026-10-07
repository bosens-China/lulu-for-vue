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
const isMac = ref(false)
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

onMounted(() => {
  isMac.value = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
})
</script>

<template>
  <!-- 顶部 Header 触发按钮：胶囊徽标、柔和边框与自适应快捷键 -->
  <button
    type="button"
    aria-label="搜索文档与组件"
    class="flex h-8.5 items-center gap-2 rounded-lg border border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-surface-subtle)]/70 px-2.5 sm:px-3 text-xs text-[var(--lulu-color-text-muted)] hover:border-[var(--lulu-color-primary)]/50 hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-text)] transition-all cursor-pointer"
    @click="showSearch"
  >
    <span class="i-lucide-search text-sm text-[var(--lulu-color-text-muted)]" aria-hidden="true" />
    <span class="hidden md:inline text-xs">搜索文档与组件...</span>
    <span class="md:hidden text-xs">搜索...</span>
    <kbd class="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)] text-[var(--lulu-color-text-muted)] shadow-xs">
      {{ isMac ? '⌘ K' : 'Ctrl K' }}
    </kbd>
  </button>

  <!-- 搜索弹窗：Command Palette 现代风格 -->
  <LuluDialog v-if="open" v-model:open="open" title="搜索文档" class="docs-search-dialog">
    <div class="flex flex-col">
      <!-- 搜索输入栏 -->
      <div class="p-3 sm:p-4 border-b border-[var(--lulu-color-border-subtle)]">
        <label class="sr-only" for="docs-search-input">搜索组件</label>
        <LuluInput
          id="docs-search-input"
          autofocus
          v-model="query"
          class="w-full text-sm sm:text-base"
          placeholder="搜索组件、指南、API 或代码..."
          aria-controls="docs-search-results"
          @input="selected = 0"
          @keydown="onSearchKeydown"
        />
      </div>

      <!-- 搜索结果列表 -->
      <ul
        id="docs-search-results"
        class="max-h-80 overflow-y-auto p-2 m-0 list-none space-y-1"
        aria-label="搜索结果"
      >
        <li v-for="(item, index) in results" :key="item.page.path">
          <a
            :href="withBase(item.page.path)"
            class="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-decoration-none"
            :class="index === selected ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-medium' : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)]'"
            @mouseenter="selected = index"
            @click="open = false"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <!-- 分类徽章 -->
              <span
                class="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded border"
                :class="item.page.path.startsWith('/guide/')
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'"
              >
                {{ item.page.path.startsWith('/guide/') ? '指南' : '组件' }}
              </span>

              <span class="font-semibold truncate">{{ item.name }}</span>
              <span class="text-xs text-[var(--lulu-color-text-muted)] truncate hidden sm:inline">{{ item.page.description }}</span>
            </div>

            <!-- 当前选中项右侧回车箭头指示 -->
            <span
              v-if="index === selected"
              class="text-xs shrink-0 ml-2 font-mono text-[var(--lulu-color-primary)] opacity-80"
              aria-hidden="true"
            >
              ↵
            </span>
          </a>
        </li>

        <!-- 空状态 -->
        <li v-if="results.length === 0" class="py-8 flex flex-col items-center justify-center text-center text-[var(--lulu-color-text-muted)]">
          <span class="i-lucide-search-x text-3xl mb-2 opacity-50" aria-hidden="true" />
          <p class="text-sm">未找到与“<strong class="text-[var(--lulu-color-primary)]">{{ query }}</strong>”相关的文档</p>
        </li>
      </ul>

      <!-- 底部快捷键指南 -->
      <div class="flex items-center justify-between px-4 py-2 text-[11px] text-[var(--lulu-color-text-muted)] border-t border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-surface-subtle)]/60">
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]">↑</kbd>
            <kbd class="px-1 py-0.5 rounded border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]">↓</kbd>
            导航
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]">↵</kbd>
            选择
          </span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]">ESC</kbd>
            关闭
          </span>
        </div>
        <span class="hidden sm:inline font-mono">{{ results.length }} 项结果</span>
      </div>
    </div>
  </LuluDialog>
</template>
