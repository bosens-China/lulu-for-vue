<template>
  <lu-space :size="size">
    <lu-button v-for="item of list" :key="item" type="primary" @click="onClick(item)">{{
      item
    }}</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ['small', 'middle', 'large'];
    const size = ref(list[0]);
    const onClick = (e: string) => {
      size.value = e;
    };

    return {
      list,
      size,
      onClick,
    };
  },
});
</script>
