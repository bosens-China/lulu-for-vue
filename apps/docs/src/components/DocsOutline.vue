<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluDialog from '@lulu/vue/dialog'
import LuluTooltip from '@lulu/vue/tooltip'
import '@lulu/vue/button/style.css'
import '@lulu/vue/dialog/style.css'
import '@lulu/vue/tooltip/style.css'

const props = defineProps<{ currentPath: string }>()

interface HeadingItem {
  id: string
  text: string
  level: number
}

const headings = ref<HeadingItem[]>([])
const activeId = ref<string>('')
const mobileOpen = ref(false)

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

function handleMobileHeadingClick(id: string, event: MouseEvent) {
  handleHeadingClick(id, event)
  mobileOpen.value = false
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
  <template v-if="headings.length > 0">
    <!-- 1. 桌面大屏常驻目录 (xl 及以上) -->
    <aside
      class="hidden xl:block sticky top-16 h-[calc(100vh-4rem)] w-50 shrink-0 overflow-y-auto px-5 py-14 text-sm select-none"
      aria-label="页内目录"
    >
      <!-- 标头设计 -->
      <div class="flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--lulu-color-text-muted)]">
        <span>本页目录</span>
      </div>

      <!-- 目录列表 -->
      <nav class="relative border-l border-[var(--lulu-color-border-subtle)] pl-2">
        <a
          v-for="heading in headings"
          :key="heading.id"
          :href="`#${heading.id}`"
          :title="heading.text"
          class="group relative block transition-all duration-150 no-underline truncate"
          :class="[
            heading.level === 3 ? 'pl-4 text-[13px] py-1' : 'pl-2 text-[13px] py-1.5 font-normal',
            activeId === heading.id
              ? 'text-[var(--lulu-color-primary)] font-semibold'
              : 'text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-text)]',
          ]"
          @click="handleHeadingClick(heading.id, $event)"
        >
          <!-- 激活指示小竖线 -->
          <span
            v-if="activeId === heading.id"
            class="absolute -left-[9px] top-1 bottom-1 w-[2px] bg-[var(--lulu-color-primary)]"
          />
          {{ heading.text }}
        </a>
      </nav>
    </aside>

    <!-- 2. 平板与手机端浮动目录触发按钮 (xl 以下视口) -->
    <div class="xl:hidden fixed bottom-20 right-6 z-40">
      <LuluTooltip placement="left">
        <template #trigger="{ triggerProps }">
          <LuluButton
            v-bind="triggerProps"
            class="flex !h-10 !min-w-10 !w-10 !p-0 !rounded-full items-center justify-center border border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]/90 backdrop-blur-md text-[var(--lulu-color-text)] shadow-md hover:text-[var(--lulu-color-primary)] hover:border-[var(--lulu-color-primary)]/40 cursor-pointer transition-all active:scale-95"
            aria-label="本页目录"
            @click="mobileOpen = true"
          >
            <span class="i-lucide-list text-base" aria-hidden="true" />
          </LuluButton>
        </template>
        本页目录
      </LuluTooltip>
    </div>

    <!-- 3. 平板与移动端弹出的目录抽屉 -->
    <LuluDialog v-if="mobileOpen" v-model:open="mobileOpen" title="本页目录" class="docs-mobile-outline-dialog">
      <div class="p-3 max-h-[60vh] overflow-y-auto">
        <ul class="m-0 list-none p-0 space-y-1">
          <li v-for="heading in headings" :key="heading.id">
            <a
              :href="`#${heading.id}`"
              class="block px-3 py-2 rounded-xl text-xs sm:text-sm transition-all no-underline truncate"
              :class="[
                heading.level === 3 ? 'pl-6 text-xs text-[var(--lulu-color-text-muted)]' : 'font-medium',
                activeId === heading.id
                  ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold'
                  : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)]'
              ]"
              @click="handleMobileHeadingClick(heading.id, $event)"
            >
              {{ heading.text }}
            </a>
          </li>
        </ul>
      </div>
    </LuluDialog>
  </template>
</template>
