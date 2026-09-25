<script setup lang="ts">
import { shallowRef } from 'vue'
import LuluMessage from '@lulu/vue/message'
import '@lulu/vue/message/style.css'
const closed = shallowRef('尚未关闭')
</script>
<template>
  <div class="grid gap-3">
    <LuluMessage v-for="type in (['success', 'error', 'info', 'warning'] as const)" :key="type" :type="type" :message="type + ' 消息'" :duration="0" @close="closed = type + ' 已关闭'" />
    <LuluMessage message="此条不可手动关闭" :closable="false" :duration="0" />
    <output>{{ closed }}</output>
  </div>
</template>
