<script setup lang="ts">
import type { DocsPage } from '../types'
import { withBase } from '../siteUrl'

defineProps<{
  page: DocsPage
}>()

</script>

<template>
  <article class="mx-auto max-w-xl py-16 text-center sm:py-24">
    <p class="m-0 text-6xl font-bold text-[var(--lulu-color-primary)]">404</p>
    <h1 class="mt-6 text-3xl font-bold text-[var(--lulu-color-text-heading)]">{{ page.heading }}</h1>
    <p class="mt-4 text-[var(--lulu-color-text-muted)]">{{ page.description }}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <a :href="withBase('/')" class="rounded-lg bg-[var(--lulu-color-primary-solid)] px-5 py-2.5 font-semibold text-[var(--lulu-color-text-inverse)] text-decoration-none">返回首页</a>
      <a :href="withBase('/components/button/')" class="rounded-lg border border-solid border-[var(--lulu-color-border)] px-5 py-2.5 font-semibold text-[var(--lulu-color-text)] text-decoration-none">浏览组件</a>
    </div>
  </article>
</template>
