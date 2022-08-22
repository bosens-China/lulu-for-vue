<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <lu-radio :disabled="disabled">文本</lu-radio>
    <lu-button @click="disabled = !disabled">转换</lu-button>
  </lu-space>
  <p>批量禁用</p>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <lu-radio-group :disabled="disabledGroup" default-value="a">
      <lu-radio value="a">a</lu-radio>
      <lu-radio value="b">b</lu-radio>
      <lu-radio value="c">c</lu-radio>
      <lu-radio value="d">d</lu-radio>
    </lu-radio-group>
    <lu-button @click="onClick">全部禁用</lu-button>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const disabled = ref(true);
    const disabledGroup = ref(false);
    const onClick = () => {
      disabledGroup.value = true;
    };
    return {
      onClick,
      disabled,
      disabledGroup,
    };
  },
});
</script>
