<script setup lang="ts">
import { ref } from 'vue'
import LuluTextarea from '@lulu/vue/textarea'
import '@lulu/vue/textarea/style.css'

const value = ref('')
</script>

<template>
  <LuluTextarea v-model="value" placeholder="请输入说明" />
</template>
