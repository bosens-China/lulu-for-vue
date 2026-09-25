<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { LAYOUT_CONTEXT_KEY } from './layout-context'

const props = withDefaults(
  defineProps<{
    width?: string | number
    collapsedWidth?: string | number
    collapsed?: boolean | undefined
    collapsible?: boolean
    sticky?: boolean
    topOffset?: string
  }>(),
  {
    width: '260px',
    collapsedWidth: '64px',
    collapsed: undefined,
    collapsible: false,
    sticky: false,
    topOffset: '4rem',
  },
)

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
  (e: 'collapse', value: boolean): void
}>()

const layoutContext = inject(LAYOUT_CONTEXT_KEY, null)
const internalCollapsed = ref(props.collapsed ?? false)

watch(
  () => props.collapsed,
  (newVal) => {
    if (newVal !== undefined) {
      internalCollapsed.value = newVal
    }
  },
)

const isCollapsed = computed({
  get: () => internalCollapsed.value,
  set: (val: boolean) => {
    internalCollapsed.value = val
    emit('update:collapsed', val)
    emit('collapse', val)
  },
})

let unregister: (() => void) | null = null

onMounted(() => {
  if (layoutContext) {
    unregister = layoutContext.registerSider()
  }
})

onUnmounted(() => {
  if (unregister) {
    unregister()
  }
})

const currentWidth = computed(() => {
  const w = isCollapsed.value ? props.collapsedWidth : props.width
  return typeof w === 'number' ? `${w}px` : w
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside
    class="docs-sider relative shrink-0 border-r border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)] transition-all duration-300 ease-in-out select-none z-20"
    :class="[
      sticky ? 'sticky' : '',
    ]"
    :style="{
      width: currentWidth,
      top: sticky ? topOffset : undefined,
      height: sticky ? `calc(100vh - ${topOffset})` : undefined,
    }"
  >
    <div class="h-full flex flex-col justify-between overflow-hidden">
      <!-- 菜单主列表区 (独立内部滚动，绝不挤压底部折叠按钮) -->
      <div class="flex-1 min-h-0 overflow-y-auto">
        <slot :collapsed="isCollapsed" />
      </div>

      <!-- 折叠 Trigger 按钮 (固定在 Sider 底部，Antd 风格图标与交互) -->
      <button
        v-if="collapsible"
        type="button"
        class="shrink-0 h-12 w-full border-t border-[var(--lulu-color-border-subtle)] px-4 flex items-center justify-center cursor-pointer text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)] transition-all duration-200 outline-none group bg-[var(--lulu-color-bg-container)]"
        :title="isCollapsed ? '展开侧边栏' : '收起侧边栏'"
        @click="toggleCollapse"
      >
        <div class="flex items-center gap-2 text-xs font-semibold">
          <!-- 展开态: 双左箭头 Icon -->
          <svg
            v-if="!isCollapsed"
            class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>

          <!-- 折叠态: 双右箭头 Icon -->
          <svg
            v-else
            class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>

          <span v-if="!isCollapsed" class="truncate">收起侧边栏</span>
        </div>
      </button>
    </div>
  </aside>
</template>
