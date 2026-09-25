<script setup lang="ts">
import { ref } from 'vue'
import LuluSwitch from '@lulu/vue/switch'
import '@lulu/vue/switch/style.css'

const enabled = ref(true)
</script>

<template>
  <LuluSwitch v-model="enabled">接收通知</LuluSwitch>
</template>
