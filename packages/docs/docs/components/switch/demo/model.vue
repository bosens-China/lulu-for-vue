<template>
  <p>
    绑定值为 false
    <lu-switch :model-value="false" />
  </p>
  <p>
    绑定值为 true
    <lu-switch :model-value="true" />
  </p>
  <p>
    双向绑定
    <lu-switch v-model="value" />
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(false);
    return {
      value,
    };
  },
});
</script>
