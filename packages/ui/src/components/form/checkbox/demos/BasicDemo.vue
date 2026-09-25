<script setup lang="ts">
import { ref } from 'vue'
import LuluCheckbox from '@lulu/vue/checkbox'
import '@lulu/vue/checkbox/style.css'

const checked = ref(false)
</script>

<template>
  <LuluCheckbox v-model="checked">接受服务条款</LuluCheckbox>
</template>
