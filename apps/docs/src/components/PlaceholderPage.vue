<script setup lang="ts">
import type { DocsPage } from '../types'

defineProps<{
  page: DocsPage
}>()

</script>

<template>
  <article>
    <h1>{{ page.heading }}</h1>
    <p>{{ page.description }}</p>
  </article>
</template>
