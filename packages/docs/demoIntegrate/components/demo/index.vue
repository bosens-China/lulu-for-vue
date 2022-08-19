<template>
  <demo v-bind="translation">
    <suspense>
      <template #default>
        <template v-if="props.src">
          <View></View>
        </template>
        <template v-else>
          <slot></slot>
        </template>
      </template>
      <template #fallback>
        <div>
          <a-spin tip="Loading..."></a-spin>
        </div>
      </template>
    </suspense>
  </demo>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import demo from './demo.vue';
import { decode } from '../../utils/code';

const props = defineProps<{
  code: string;
  codeJs: string;
  sourceCode: string;
  sourceCodeJs: string;
  title: string;
  describe: string;
  src?: any;
}>();

const translation = computed(() => {
  const { src, title, describe, ...rest } = props;
  type Key = keyof typeof rest;
  const keys = Object.keys(rest) as Array<Key>;
  return keys.reduce(
    (obj, key) => {
      obj[key] = decode(rest[key] || '');
      return obj;
    },
    { title, describe } as Record<Key, string> & { title: string; describe: string },
  );
});

const View = defineAsyncComponent(() => props.src);
</script>
