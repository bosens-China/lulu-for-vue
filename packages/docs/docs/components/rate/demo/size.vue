<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }" :size="40">
    <lu-rate :style="{ fontSize: `${value}px` }"></lu-rate>
    <lu-range v-model="value" :min="10" :max="40" :prompt-format="promptFormat"></lu-range>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(14);
    const promptFormat = (size: number) => {
      return `当前字体大小：${size}`;
    };
    return {
      value,
      promptFormat,
    };
  },
});
</script>
