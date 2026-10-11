<script setup lang="ts">
import { computed, ref } from 'vue'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/input/style.css'
import { docsNavigation, guideNavigation } from '../navigation'
import { withBase } from '../siteUrl'
import DocsSider from './layout/DocsSider.vue'

const props = withDefaults(
  defineProps<{
    currentPath: string
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const emit = defineEmits<{ navigate: [] }>()

// 判断当前是否处于指南章节
const isGuideSection = computed(() => props.currentPath.startsWith('/guide/'))

// 组件快速过滤输入
const filterQuery = ref('')

const filteredDocsNavigation = computed(() => {
  const term = filterQuery.value.trim().toLocaleLowerCase()
  if (!term) return docsNavigation

  return docsNavigation
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.name.toLocaleLowerCase().includes(term)),
    }))
    .filter(group => group.items.length > 0)
})
</script>

<template>
  <DocsSider
    :sticky="!compact"
    top-offset="4rem"
    :width="compact ? '100%' : '280px'"
    :collapsible="false"
    class="site-sidebar select-none transition-colors border-r border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]"
  >
    <div class="py-8 px-4">
      <!-- 1. 指南章节侧边栏内容 -->
      <template v-if="isGuideSection">
        <div class="px-3 mb-3 flex items-center justify-between">
          <span class="text-sm font-semibold text-[var(--lulu-color-text-muted)] uppercase">
            开发指南
          </span>
        </div>

        <nav aria-label="开发指南导航">
          <ul class="m-0 list-none p-0 space-y-1">
            <li v-for="item in guideNavigation" :key="item.page.path">
              <a
                :href="withBase(item.page.path)"
                :aria-current="item.page.path === currentPath ? 'page' : undefined"
                :title="item.name"
                @click="emit('navigate')"
                class="group relative flex items-center justify-between h-8 px-3 rounded text-sm transition-colors no-underline"
                :class="item.page.path === currentPath
                  ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold'
                  : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-primary)]'"
              >
                <span class="truncate">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </template>

      <!-- 2. 组件列表章节侧边栏内容 -->
      <template v-else>
        <div class="px-3 mb-4 flex items-center justify-between">
          <span class="text-sm font-semibold text-[var(--lulu-color-text-muted)] uppercase">
            UI 组件列表
          </span>
        </div>

        <!-- 侧栏快速筛选过滤框 -->
        <div class="px-2 mb-7">
          <div class="relative flex items-center">
            <span class="i-lucide-search absolute left-2.5 text-xs text-[var(--lulu-color-text-muted)] pointer-events-none" aria-hidden="true" />
            <LuluInput
              v-model="filterQuery"
              aria-label="过滤组件"
              placeholder="过滤组件..."
              class="w-full !pl-8 !pr-7 !py-1 !text-base sm:!text-sm !h-9 !rounded-md border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card-muted)] focus:bg-[var(--docs-color-card)]"
            />
            <button
              v-if="filterQuery"
              type="button"
              class="absolute right-2 text-xs text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-text)]"
              aria-label="清空筛选"
              @click="filterQuery = ''"
            >
              <span class="i-lucide-x text-xs" />
            </button>
          </div>
        </div>

        <nav aria-label="UI组件导航">
          <section v-for="group in filteredDocsNavigation" :key="group.name" class="mb-5 last:mb-0">
            <h2 class="m-0 mb-2 px-3 text-[13px] font-semibold text-[var(--docs-color-heading)]">
              {{ group.name }}
            </h2>
            <ul class="m-0 list-none p-0 space-y-1">
              <li v-for="item in group.items" :key="item.page.path">
                <a
                  class="group relative flex items-center justify-between h-8 px-3 rounded text-sm transition-colors no-underline"
                  :class="item.page.path === currentPath
                    ? 'bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] font-semibold'
                    : 'text-[var(--lulu-color-text)] hover:bg-[var(--lulu-color-surface-hover)] hover:text-[var(--lulu-color-primary)]'"
                  :href="withBase(item.page.path)"
                  :title="item.name"
                  :aria-current="item.page.path === currentPath ? 'page' : undefined"
                  @click="emit('navigate')"
                >
                  <span class="truncate">{{ item.name }}</span>
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </template>
    </div>
  </DocsSider>
</template>
