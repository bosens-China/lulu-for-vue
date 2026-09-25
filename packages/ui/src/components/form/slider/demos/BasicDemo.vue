<script setup lang="ts">
import { ref } from 'vue'
import LuluSlider from '@lulu/vue/slider'
import '@lulu/vue/slider/style.css'

const value = ref(40)
</script>

<template>
  <LuluSlider v-model="value" />
</template>
