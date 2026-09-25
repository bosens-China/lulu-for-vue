<script setup lang="ts">
import LuluProgress from '@lulu/vue/progress'

import '@lulu/vue/progress/style.css'

</script>

<template>
  <div class="grid gap-4">
    <label class="grid gap-2">处理中<LuluProgress aria-label="不确定进度">正在处理</LuluProgress></label>
    <label class="grid gap-2">完成 3 / 8<LuluProgress :value="3" :max="8" aria-label="完成三项，共八项">已完成 3 / 8</LuluProgress></label>
  </div>
</template>

