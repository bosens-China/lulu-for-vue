<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <lu-radio-group :default-value="value" :options="list"> </lu-radio-group>
    <lu-button @click="onClick">切换默认值</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = [1, 2, 3, 4];
    let i = 0;
    const value = ref(list[i]);

    const onClick = () => {
      value.value = list[++i]!;
      if (i === list.length - 1) {
        i = -1;
      }
    };
    return {
      onClick,
      value,
      list,
    };
  },
});
</script>
