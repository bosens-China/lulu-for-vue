<template>
  <lu-space wrap :size="[8, 16]">
    <template #split>|</template>
    <lu-button v-for="item of list" :key="item" type="primary"> {{ item }}</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const list = Array.from({ length: 5 }).map((_el, index) => `按钮${index + 1}`);

    return {
      list,
    };
  },
});
</script>
