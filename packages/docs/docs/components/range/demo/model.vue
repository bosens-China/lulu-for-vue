<template>
  <p>range</p>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <div>
      <p>固定值为40</p>
      <lu-range :model-value="40"></lu-range>
    </div>
    <div>
      <p>当前值为：{{ value }}</p>
      <lu-range v-model="value"></lu-range>
    </div>
  </lu-space>
  <p>range multiple</p>
  <lu-space direction="vertical" :style="{ display: 'flex' }">
    <div>
      <p>固定区间 40-60</p>
      <lu-range multiple :from="40" :to="60"></lu-range>
    </div>
    <div>
      <p>当前值为：{{ from }} - {{ to }}</p>
      <lu-range v-model:from="from" v-model:to="to" multiple></lu-range>
    </div>
  </lu-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(10);
    const from = ref(20);
    const to = ref(50);
    return {
      value,
      from,
      to,
    };
  },
});
</script>
