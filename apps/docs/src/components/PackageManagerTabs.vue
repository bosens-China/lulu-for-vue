<script setup lang="ts">
import { ref } from 'vue'
import LuluTab from '@lulu/vue/tab'
import LuluTabPanel from '@lulu/vue/tab-panel'
import LuluTabs from '@lulu/vue/tabs'
import '@lulu/vue/tab/style.css'
import '@lulu/vue/tab-panel/style.css'
import '@lulu/vue/tabs/style.css'

const props = defineProps<{ packageName: string }>()
const managers = ['npm', 'yarn', 'pnpm', 'bun', 'deno'] as const
type Manager = typeof managers[number]
const active = ref<Manager>('pnpm')

function command(manager: Manager) {
  if (manager === 'npm') return `npm install ${props.packageName}`
  if (manager === 'deno') return `deno add npm:${props.packageName}`
  return `${manager} add ${props.packageName}`
}
</script>

<template>
  <LuluTabs v-model="active" class="docs-package-manager">
    <template #tabs>
      <LuluTab v-for="manager in managers" :key="manager" :value="manager">
        {{ manager }}
      </LuluTab>
    </template>
    <LuluTabPanel v-for="manager in managers" :key="manager" :value="manager">
      <div class="docs-code-block">
        <button
          type="button"
          class="docs-code-copy"
          data-docs-copy
          data-copy-text="复制代码"
          data-copied-text="已复制"
          aria-label="复制代码"
          aria-live="polite"
        >复制代码</button>
        <pre><code>{{ command(manager) }}</code></pre>
      </div>
    </LuluTabPanel>
  </LuluTabs>
</template>
