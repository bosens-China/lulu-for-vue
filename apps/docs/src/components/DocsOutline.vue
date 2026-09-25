<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{ currentPath: string }>()
const headings = ref<{ id: string, text: string, level: number }[]>([])

async function refresh() {
  await nextTick()
  const used = new Map<string, number>()
  headings.value = [...document.querySelectorAll<HTMLElement>('.docs-content h2, .docs-content h3')].map((heading) => {
    const text = heading.textContent?.trim() ?? ''
    const stem = text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
    const count = used.get(stem) ?? 0
    used.set(stem, count + 1)
    heading.id = count ? `${stem}-${count + 1}` : stem
    return { id: heading.id, text, level: Number(heading.tagName[1]) }
  })
  if (window.location.hash) {
    document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
  }
}

onMounted(refresh)
watch(() => props.currentPath, refresh)
</script>

<template>
  <aside class="sticky top-16 h-[calc(100vh-4rem)] w-52 shrink-0 overflow-y-auto border-l border-[var(--lulu-color-border-subtle)] px-5 py-8 text-sm" aria-label="页内目录">
    <p class="mb-3 font-semibold text-[var(--lulu-color-text-heading)]">本页目录</p>
    <nav>
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        class="block py-1.5 text-[var(--lulu-color-text-muted)] hover:text-[var(--lulu-color-primary)]"
        :class="heading.level === 3 ? 'pl-3' : ''"
      >{{ heading.text }}</a>
    </nav>
  </aside>
</template>
