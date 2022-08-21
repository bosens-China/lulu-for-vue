<template>
  <lu-radio-group v-model="value" name="checked">
    <lu-radio value="a">a</lu-radio>
    <lu-radio value="b">b</lu-radio>
    <lu-radio value="c">c</lu-radio>
    <lu-radio value="d">d</lu-radio>
  </lu-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('a');
    return {
      value,
    };
  },
});
</script>
