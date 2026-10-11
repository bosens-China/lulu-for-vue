<script setup lang="ts">
import { ref } from 'vue'
import LuluRate from '@lulu/vue/rate'
import '@lulu/vue/rate/style.css'

const value = ref(2.5)
</script>

<template>
  <div class="grid gap-3">
    <LuluRate v-model="value" clearable label="喜欢程度" style="--lulu-rate-color: #db2777; --lulu-rate-star-size: 30px">
      <template #icon><span>♥</span></template>
    </LuluRate>
    <output>评分：{{ value }}，再次选择同一评分可清空</output>
  </div>
</template>
