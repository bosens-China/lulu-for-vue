<script setup lang="ts">
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/button/style.css'
import type { DocsPage } from '../types'
import { withBase } from '../siteUrl'

defineProps<{
  page: DocsPage
}>()

</script>

<template>
  <article class="mx-auto max-w-xl py-16 text-center sm:py-24">
    <p class="m-0 text-6xl font-bold text-[var(--lulu-color-primary)]">404</p>
    <h1 class="mt-6 text-3xl font-bold text-[var(--docs-color-heading)]">{{ page.heading }}</h1>
    <p class="mt-4 text-[var(--lulu-color-text-muted)]">{{ page.description }}</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <LuluButton variant="primary" :href="withBase('/')">
        返回首页
      </LuluButton>
      <LuluButton variant="normal" :href="withBase('/components/button/')">
        浏览组件
      </LuluButton>
    </div>
  </article>
</template>
