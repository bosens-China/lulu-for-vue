<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <div>
      <p>受控</p>
      <lu-rate :model-value="2"></lu-rate>
    </div>
    <div>
      <p>当前选中值为：{{ value }}</p>
      <lu-rate v-model="value"></lu-rate>
    </div>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(3);
    return {
      value,
    };
  },
});
</script>
