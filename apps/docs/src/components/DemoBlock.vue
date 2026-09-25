<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'

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
    const grammar = Prism.languages.markup || Prism.languages.javascript
    if (!grammar)
      return props.source
    return Prism.highlight(props.source, grammar, 'html')
  }
  catch {
    return props.source
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
  <section class="my-8 overflow-hidden rounded-xl border border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-card-bg)] text-[var(--lulu-color-text)] transition-all duration-200 shadow-2xs hover:border-[var(--lulu-color-border)]">
    <!-- 1. 组件实际展示与操作演示区 -->
    <div v-if="$slots.default" class="min-h-28 min-w-0 overflow-x-auto flex flex-col justify-center px-6 py-6 sm:px-8 bg-[var(--lulu-color-card-bg)]">
      <slot />
    </div>

    <!-- 2. 组件描述说明区 (如果传了 description 插槽) -->
    <div
      v-if="$slots.description"
      class="docs-demo-description border-t border-[var(--lulu-color-border-subtle)] px-6 py-4 text-xs leading-6 text-[var(--lulu-color-text-muted)] bg-[var(--lulu-color-surface-subtle)]"
    >
      <slot name="description" />
    </div>

    <!-- 3. 查看源码 Action Toolbar (顶部自带 1px 细下划线分割线，高颜值图标交互) -->
    <details class="group bg-[var(--lulu-color-surface-subtle)]">
      <summary
        class="cursor-pointer list-none select-none h-10 border-t border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-surface-subtle)] hover:bg-[var(--lulu-color-surface-hover)] transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-[var(--lulu-color-primary)] group-open:bg-[var(--lulu-color-surface-hover)]"
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
      <div class="flex justify-between items-center border-t border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-code-bg)] px-6 py-2 text-xs text-[var(--lulu-color-text-muted)]">
        <span class="font-mono text-[11px]">Vue / HTML</span>
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
        class="m-0 overflow-x-auto border-t border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-code-bg)] px-6 py-4 text-xs font-mono leading-6 text-[var(--lulu-color-text)]"
      ><code class="language-html" v-html="highlightedSource" /></pre>
    </details>
  </section>
</template>
