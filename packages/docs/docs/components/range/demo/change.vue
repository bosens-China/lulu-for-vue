<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <lu-range v-model:from="from" v-model:to="to" v-model="value" :multiple="multiple"></lu-range>
    <lu-button @click="multiple = !multiple">切换</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(10);
    const from = ref(20);
    const to = ref(50);
    const multiple = ref(false);
    return {
      value,
      from,
      to,
      multiple,
    };
  },
});
</script>
