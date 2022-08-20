<template>
  <lu-space wrap :size="[8, 16]">
    <lu-button v-for="item of list" :key="item" type="primary">{{ item }}</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const list = Array.from({ length: 30 }).map((_el, index) => `按钮${index + 1}`);

    return {
      list,
    };
  },
});
</script>
