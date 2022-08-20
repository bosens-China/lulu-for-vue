<template>
  <lu-loading :visible="show" />
  <lu-button @click="onClick">关闭</lu-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref<boolean>(true);

    const onClick = () => {
      setTimeout(() => {
        show.value = false;
      }, 3000);
    };
    return {
      show,
      onClick,
    };
  },
});
</script>
