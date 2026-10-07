<script setup lang="ts">
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/button/style.css'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <LuluButton variant="primary" href="/components/button/">
      内部链接
    </LuluButton>
    <LuluButton variant="normal" href="https://github.com/bosens-China/lulu-for-vue" target="_blank" rel="noopener noreferrer">
      GitHub
      <span class="i-lucide-external-link" aria-hidden="true" />
    </LuluButton>
    <LuluButton variant="normal" href="https://example.com" disabled>
      禁用链接
    </LuluButton>
  </div>
</template>
