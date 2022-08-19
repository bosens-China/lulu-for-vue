import scriptTransformation from '../scriptTransformation';

const code = `<template>
<lu-loading v-model="show" />
<lu-buttton @click="onClick">关闭</lu-buttton>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
setup() {
  const show = ref<boolean>(true);
  const onClick = () => {
    show.value = false;
  };
  return {
    show,
    onClick,
  };
},
});
</script>
`;

test('scriptTransformation', () => {
  const result = scriptTransformation(code);
  expect(result).not.toContain('lang="ts"');
  expect(result).not.toContain('<boolean>');
});
