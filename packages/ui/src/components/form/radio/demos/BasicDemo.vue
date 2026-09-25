<script setup lang="ts">
import { ref } from 'vue'
import LuluRadio from '@lulu/vue/radio'
import '@lulu/vue/radio/style.css'

const value = ref('standard')
</script>

<template>
  <div class="flex gap-4">
    <LuluRadio v-model="value" value="standard">标准版</LuluRadio>
    <LuluRadio v-model="value" value="pro">专业版</LuluRadio>
  </div>
</template>
