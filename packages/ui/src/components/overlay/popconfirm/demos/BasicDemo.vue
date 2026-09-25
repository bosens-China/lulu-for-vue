<script setup lang="ts">
import { ref } from 'vue'
import LuluPopconfirm from '@lulu/vue/popconfirm'
import '@lulu/vue/popconfirm/style.css'

const message = ref('')
</script>

<template>
  <LuluPopconfirm message="删除后无法恢复，仍要继续吗？" cancel-text="取消" confirm-text="确认" @confirm="message = '已确认删除'">
    <template #trigger>删除项目</template>
  </LuluPopconfirm>
  <p v-if="message">{{ message }}</p>
</template>
