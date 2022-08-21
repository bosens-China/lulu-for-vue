<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <lu-radio :disabled="disabled">文本</lu-radio>
    <lu-button @click="disabled = !disabled">转换</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const disabled = ref(true);
    return {
      disabled,
    };
  },
});
</script>
