<script setup lang="ts">
import { ref } from 'vue'
import LuluRangeSlider from '@lulu/vue/range-slider'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/range-slider/style.css'
import '@lulu/vue/button/style.css'

const value = ref<[number, number]>([20, 80])
const max = ref(100)
</script>

<template>
  <div class="grid gap-4">
    <LuluRangeSlider v-model="value" :min="10" :max="max" :step="10" start-label="预算下限" end-label="预算上限" start-name="budgetMin" end-name="budgetMax" />
    <LuluButton @click="max = max === 100 ? 50 : 100">切换上限 50 / 100</LuluButton>
    <output>父级值：{{ value.join('–') }}；上限：{{ max }}</output>
    <p>边界变化会约束显示值，交互后回传有序区间；组件不会静默改写父级数据。</p>
    <LuluRangeSlider :model-value="[20, 80]" disabled start-label="禁用下限" end-label="禁用上限" />
    <LuluRangeSlider :model-value="[20, 80]" invalid start-label="错误下限" end-label="错误上限" />
  </div>
</template>

