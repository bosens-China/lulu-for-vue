<script setup lang="ts">
import { ref } from 'vue'
import LuluColorPicker from '@lulu/vue/color-picker'
import '@lulu/vue/color-picker/style.css'

const color = ref('#2a80eb')
</script>

<template>
  <LuluColorPicker v-model="color" label="主题色" />
</template>
