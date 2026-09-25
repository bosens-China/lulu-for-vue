<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluPopover from '@lulu/vue/popover'
import '@lulu/vue/button/style.css'
import '@lulu/vue/popover/style.css'

const open = ref(false)
</script>

<template>
  <LuluPopover v-model:open="open">
    <template #trigger>查看提示</template>
    <p>此组件可以承载简短说明或补充操作。</p>
    <LuluButton variant="normal" @click="open = false">了解了</LuluButton>
  </LuluPopover>
</template>
