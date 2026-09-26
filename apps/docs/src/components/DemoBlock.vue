<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Prism from '../prism'

interface Props {
  copiedLabel: string
  copyLabel: string
  source: string
  sourceLabel: string
}

const props = defineProps<Props>()
const copied = shallowRef(false)

defineSlots<{
  default(): unknown
  description(): unknown
}>()

const highlightedSource = computed(() => {
  if (!props.source)
    return ''
  try {
    const grammar = Prism.languages.vue
    if (!grammar)
      return Prism.util.encode(props.source)
    return Prism.highlight(props.source, grammar, 'vue')
  }
  catch {
    return Prism.util.encode(props.source)
  }
})

async function copySource(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.source)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    copied.value = false
  }
}
</script>

<template>
  <section class="my-8 overflow-hidden rounded-xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-card-bg)] text-[var(--lulu-color-text)]">
    <!-- 1. 组件实际展示与操作演示区 -->
    <div v-if="$slots.default" class="min-h-28 min-w-0 overflow-x-auto flex flex-col justify-center px-6 py-6 sm:px-8 bg-[var(--lulu-color-card-bg)]">
      <slot />
    </div>

    <!-- 2. 组件描述说明区 (如果传了 description 插槽) -->
    <div
      v-if="$slots.description"
      class="docs-demo-description border-t border-solid border-[var(--lulu-color-border-subtle)] px-6 py-4 text-xs leading-6 text-[var(--lulu-color-text-muted)] bg-[var(--lulu-color-surface-subtle)]"
    >
      <slot name="description" />
    </div>

    <!-- 3. 源码折叠入口 -->
    <details class="group">
      <summary
        class="flex h-10 cursor-pointer list-none select-none items-center justify-center gap-2 border-t border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-card-bg)] text-xs font-medium text-[var(--lulu-color-text-muted)] transition-colors hover:bg-[var(--lulu-color-surface-subtle)] hover:text-[var(--lulu-color-primary)] group-open:text-[var(--lulu-color-primary)]"
      >
        <!-- 代码图标 -->
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>

        <span>{{ sourceLabel }}</span>

        <!-- 展开/收起旋转小箭头 -->
        <svg class="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <!-- 4. 复制代码控制栏 -->
      <div class="flex justify-between items-center border-t border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-code-bg)] px-6 py-2 text-xs text-[var(--lulu-color-text-muted)]">
        <span class="font-mono text-[11px]">Vue / TypeScript</span>
        <button
          class="rounded px-2.5 py-1 text-xs font-medium text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-selected)] transition-all flex items-center gap-1.5 cursor-pointer border border-transparent active:scale-95"
          type="button"
          aria-live="polite"
          @click="copySource"
        >
          <!-- 复制图标 -->
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
          </svg>
          <span>{{ copied ? copiedLabel : copyLabel }}</span>
        </button>
      </div>

      <!-- 5. 经过 Prism 语法高亮的源码展示区 -->
      <pre
        class="m-0 overflow-x-auto border-t border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-code-bg)] px-6 py-4 text-xs font-mono leading-6 text-[var(--lulu-color-text)]"
      ><code class="language-vue" v-html="highlightedSource" /></pre>
    </details>
  </section>
</template>
