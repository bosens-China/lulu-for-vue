<template>
  <demo v-if="show" v-bind="translation">
    <suspense>
      <template #default>
        <View></View>
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
import { computed, defineAsyncComponent, ref } from 'vue';
import demo from './demo.vue';
import { decode } from '../../utils/code';

const props = defineProps<{
  code: string;
  codeJs: string;
  sourceCode: string;
  sourceCodeJs: string;
  title: string;
  src: any;
  fileName: string;
  describe?: string;
  SFC?: boolean;
}>();

const translation = computed(() => {
  const { fileName, SFC, src, title, describe, ...rest } = props;
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

const show = ref(true);

const View = computed(() => {
  // 如果是开发环境则直接使用变量来导入，否则直接使用固定值
  // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

  if (import.meta.env.DEV && !props.SFC) {
    const src = decode(props.fileName);

    return defineAsyncComponent(() => import(src));
  }
  return defineAsyncComponent(() => props.src);
});
</script>
