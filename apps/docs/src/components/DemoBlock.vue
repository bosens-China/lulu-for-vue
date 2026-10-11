<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'

interface Props {
  copiedLabel: string
  copyLabel: string
  source: string
  sourceLabel: string
}

const props = defineProps<Props>()
const copied = shallowRef(false)
const canvasMode = ref<'clean' | 'dot' | 'grid' | 'checkerboard'>('clean')
const highlighter = shallowRef<typeof import('../prism').default>()

defineSlots<{
  default(): unknown
  description(): unknown
}>()

const highlightedSource = computed(() => {
  const Prism = highlighter.value
  if (!Prism || !props.source)
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

async function highlightOnOpen(event: Event): Promise<void> {
  if (!(event.currentTarget as HTMLDetailsElement).open || highlighter.value) return
  try {
    highlighter.value = (await import('../prism')).default
  } catch {
    // 高亮资源加载失败时仍保留可阅读、可复制的纯文本源码，下次展开可重试。
  }
}

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

function nextCanvasMode() {
  const modes: ('clean' | 'dot' | 'grid' | 'checkerboard')[] = ['clean', 'dot', 'grid', 'checkerboard']
  const index = modes.indexOf(canvasMode.value)
  canvasMode.value = modes[(index + 1) % modes.length] ?? 'clean'
}
</script>

<template>
  <section class="docs-demo my-6 overflow-hidden rounded-md border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] text-[var(--lulu-color-text)]">
    <!-- 1. 组件展示演示区 (支持背景底纹切换) -->
    <div
      v-if="$slots.default"
      class="docs-demo-canvas min-h-32 min-w-0 overflow-x-auto flex flex-col justify-center p-6 sm:p-8 transition-colors relative group/canvas"
      :class="`docs-canvas--${canvasMode}`"
    >
      <!-- 预览区右上角微型画布背景切换按钮 -->
      <button
        type="button"
        class="absolute top-2.5 right-2.5 opacity-60 sm:opacity-0 group-hover/canvas:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)] cursor-pointer select-none"
        aria-label="切换预览背景"
        title="切换预览背景（纯色 / 点阵 / 网格 / 棋盘格）"
        @click="nextCanvasMode"
      >
        <span class="i-lucide-grid text-xs" aria-hidden="true" />
        <span class="hidden sm:inline font-mono uppercase">{{ canvasMode }}</span>
      </button>

      <slot />
    </div>

    <!-- 2. 组件说明描述区 -->
    <div
      v-if="$slots.description"
      class="docs-demo-description border-t border-solid border-[var(--lulu-color-border-subtle)] px-6 py-3 text-sm leading-relaxed text-[var(--lulu-color-text-muted)]"
    >
      <slot name="description" />
    </div>

    <!-- 3. 源码折叠与控制栏 -->
    <details class="docs-demo-source group" @toggle="highlightOnOpen">
      <summary
        class="flex h-10 cursor-pointer list-none select-none items-center justify-between border-t border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] px-6 text-xs font-medium text-[var(--lulu-color-text-muted)] transition-colors hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-primary)] group-open:text-[var(--lulu-color-primary)]"
      >
        <div class="flex items-center gap-2">
          <!-- 代码图标 -->
          <svg class="w-4 h-4 text-[var(--lulu-color-text-muted)] group-hover:text-[var(--lulu-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>{{ sourceLabel }}</span>
        </div>

        <!-- 展开/收起旋转箭头 -->
        <svg class="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-180 text-[var(--lulu-color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <!-- 4. 复制代码控制栏 -->
      <div class="flex justify-between items-center border-t border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-code)] px-6 py-2 text-xs text-[var(--lulu-color-text-muted)]">
        <div class="flex items-center gap-2 font-mono text-xs">
          <span>Vue 3 / TypeScript</span>
        </div>
        <button
          class="rounded-md px-2.5 py-1 text-xs font-medium text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-selected)] transition-all flex items-center gap-1.5 cursor-pointer border border-transparent active:scale-95"
          type="button"
          aria-live="polite"
          @click="copySource"
        >
          <span :class="copied ? 'i-lucide-check text-[var(--lulu-color-success)]' : 'i-lucide-copy'" class="text-xs" aria-hidden="true" />
          <span>{{ copied ? copiedLabel : copyLabel }}</span>
        </button>
      </div>

      <!-- 5. Prism 语法高亮源码展示区 -->
      <pre
        class="m-0 overflow-x-auto border-t border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-code)] px-6 py-4 text-xs font-mono leading-relaxed text-[var(--lulu-color-text)]"
      ><code v-if="highlightedSource" class="language-vue" v-html="highlightedSource" /><code v-else class="language-vue">{{ source }}</code></pre>
    </details>
  </section>
</template>
