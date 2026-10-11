<script setup lang="ts">
import { ref } from 'vue'
import LuluMessageHost from '@lulu/vue/message-host'
import LuluCheckbox from '@lulu/vue/checkbox'
import type { MessagePlacement } from '@lulu/vue/use-message'
import '@lulu/vue/checkbox/style.css'
import '@lulu/vue/message/style.css'
import '@lulu/vue/message-host/style.css'
import MessageAction from './MessageAction.vue'

const placement = ref<MessagePlacement>('top')
const newOnTop = ref(false)
const placements: MessagePlacement[] = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']
</script>

<template>
  <div class="grid gap-3">
    <label>消息位置 <select v-model="placement" class="border rounded px-2 py-1"><option v-for="value in placements" :key="value">{{ value }}</option></select></label>
    <LuluCheckbox v-model="newOnTop">最新消息排在最上方</LuluCheckbox>
    <LuluMessageHost :duration="0" :placement="placement" :new-on-top="newOnTop"><MessageAction /></LuluMessageHost>
  </div>
</template>
