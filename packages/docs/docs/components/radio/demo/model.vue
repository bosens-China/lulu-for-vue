<template>
  <p>双向绑定</p>
  <lu-radio-group v-model="value">
    <lu-radio value="a">a</lu-radio>
    <lu-radio value="b">b</lu-radio>
    <lu-radio value="c">c</lu-radio>
    <lu-radio value="d">d</lu-radio>
  </lu-radio-group>
  <p>固定值为a</p>
  <lu-radio-group model-value="a">
    <lu-radio value="a">a</lu-radio>
    <lu-radio value="b">b</lu-radio>
    <lu-radio value="c">c</lu-radio>
    <lu-radio value="d">d</lu-radio>
  </lu-radio-group>
  <p>单个 radio 绑定值为 false，此时点击也不会选中</p>
  <lu-radio :model-value="false">a</lu-radio>
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
