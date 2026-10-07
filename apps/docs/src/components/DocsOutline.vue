<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ currentPath: string }>()

interface HeadingItem {
  id: string
  text: string
  level: number
}

const headings = ref<HeadingItem[]>([])
const activeId = ref<string>('')

// 更新当前活跃的目录项 (Scrollspy)
function updateActiveHeading() {
  if (headings.value.length === 0) return

  const scrollY = window.scrollY
  const headerOffset = 100 // 顶部 Header 与内边距偏移

  // 从下向上找第一个 top 小于等于阈值的标题
  let current = headings.value[0]?.id ?? ''
  for (const item of headings.value) {
    const el = document.getElementById(item.id)
    if (el) {
      const top = el.getBoundingClientRect().top
      if (top <= headerOffset) {
        current = item.id
      }
    }
  }

  // 若滚动到底部，高亮最后一个标题
  if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
    current = headings.value[headings.value.length - 1]?.id ?? current
  }

  activeId.value = current
}

let scrollTimer: ReturnType<typeof requestAnimationFrame> | null = null
function handleScroll() {
  if (scrollTimer) return
  scrollTimer = requestAnimationFrame(() => {
    updateActiveHeading()
    scrollTimer = null
  })
}

async function refresh() {
  await nextTick()
  const used = new Map<string, number>()
  const headingElements = [...document.querySelectorAll<HTMLElement>('.docs-content h2, .docs-content h3')]

  headings.value = headingElements.map((heading) => {
    const text = heading.textContent?.trim() ?? ''
    const stem = text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
    const count = used.get(stem) ?? 0
    used.set(stem, count + 1)
    heading.id ||= count ? `${stem}-${count + 1}` : stem
    return { id: heading.id, text, level: Number(heading.tagName[1]) }
  })

  if (window.location.hash) {
    const hashId = decodeURIComponent(window.location.hash.slice(1))
    const target = document.getElementById(hashId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      activeId.value = hashId
      return
    }
  }

  updateActiveHeading()
}

function handleHeadingClick(id: string, event: MouseEvent) {
  event.preventDefault()
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
    activeId.value = id
    history.pushState(null, '', `#${id}`)
  }
}

onMounted(() => {
  void refresh()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => props.currentPath, () => {
  void refresh()
})
</script>

<template>
  <aside
    v-if="headings.length > 0"
    class="sticky top-16 h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto px-5 py-8 text-sm select-none"
    aria-label="页内目录"
  >
    <!-- 标头设计：微型图标 + 精致小标 -->
    <div class="flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--lulu-color-text-muted)]">
      <span class="i-lucide-align-left text-sm" aria-hidden="true" />
      <span>本页目录</span>
    </div>

    <!-- 目录列表：带左侧指示线和动态高亮 -->
    <nav class="relative border-l border-[var(--lulu-color-border-subtle)] pl-2">
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        :title="heading.text"
        class="group relative block transition-colors duration-150 text-decoration-none truncate"
        :class="[
          heading.level === 3 ? 'pl-4 text-[12px] py-1' : 'pl-2 text-xs py-1.5 font-normal',
          activeId === heading.id
            ? 'text-[var(--lulu-color-primary)] font-medium'
            : 'text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-text)]',
        ]"
        @click="handleHeadingClick(heading.id, $event)"
      >
        <!-- 激活指示小竖线 -->
        <span
          v-if="activeId === heading.id"
          class="absolute -left-[9px] top-1 bottom-1 w-[2px] rounded-full bg-[var(--lulu-color-primary)]"
        />
        {{ heading.text }}
      </a>
    </nav>
  </aside>
</template>
