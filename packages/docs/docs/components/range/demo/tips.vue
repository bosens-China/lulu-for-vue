<template>
  <lu-range :min="-10" :max="10" direction="reverse" :prompt-format="promptFormat"></lu-range>
  <p>禁用提示：</p>
  <lu-range :min="-10" :max="10" direction="reverse" :prompt-format="() => null"></lu-range>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const promptFormat = (value: number) => {
      return `${value}℃`;
    };
    return {
      promptFormat,
    };
  },
});
</script>
