<template>
  <lu-space :align="align">
    <lu-button :style="{ height: '40px' }">高度40</lu-button>
    <lu-button :style="{ height: '60px' }">高度60</lu-button>
    <lu-button :style="{ height: '80px' }">高度80</lu-button>
  </lu-space>
  <p>切换对齐方式</p>
  <lu-space>
    <lu-button v-for="item of list" :key="item" type="primary" @click="onClick(item)">{{
      item
    }}</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const list = ['start', 'end', 'center', 'baseline'];
    const align = ref(list[0]);
    const onClick = (e: string) => {
      align.value = e;
    };

    return {
      list,
      align,
      onClick,
    };
  },
});
</script>
