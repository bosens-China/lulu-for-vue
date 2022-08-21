<template>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <lu-radio-group default-value="a" :options="arr1"> </lu-radio-group>
    <lu-radio-group :default-value="1" :options="arr2"> </lu-radio-group>
    <lu-radio-group :default-value="1" :options="arr3"> </lu-radio-group>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const arr1 = ['a', 'b', 'c', 'd'];
    const arr2 = [1, 2, , 3, 4];
    const arr3 = [
      {
        label: 'a',
        value: 1,
      },
      {
        label: 'b',
        value: 2,
      },
      {
        label: 'c',
        value: 3,
        disabled: true,
      },
      {
        label: 'd',
        value: 4,
      },
    ];
    return {
      arr1,
      arr2,
      arr3,
    };
  },
});
</script>
