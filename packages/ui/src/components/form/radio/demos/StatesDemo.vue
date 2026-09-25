<script setup lang="ts">
import { ref } from 'vue'
import LuluRadio from '@lulu/vue/radio'
import '@lulu/vue/radio/style.css'

const value = ref('basic')
</script>

<template>
  <div class="grid gap-4">
    <LuluRadio v-model="value" name="disabled-plan" value="basic">基础版</LuluRadio>
    <LuluRadio v-model="value" name="disabled-plan" value="pro">专业版</LuluRadio>
    <LuluRadio v-model="value" name="disabled-plan" value="enterprise" disabled>企业版（不可选）</LuluRadio>
    <output>当前方案：{{ value }}</output>
  </div>
</template>

