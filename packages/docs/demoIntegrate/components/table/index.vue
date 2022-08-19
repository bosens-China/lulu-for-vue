<template>
  <a-table :data-source="values.dataSource" :columns="columns" :pagination="false">
    <template #headerCell="{ title }">
      <div v-html="title"></div>
    </template>
  </a-table>
</template>

<script setup lang="tsx">
import { computed } from 'vue';
import { Base64 } from 'js-base64';

const props = defineProps<{
  datasource: string;
  columns: string;
}>();

const values = computed<{
  columns: Array<any>;
  dataSource: Array<any>;
}>(() => {
  try {
    return {
      dataSource: JSON.parse(Base64.decode(props.datasource)),
      columns: JSON.parse(Base64.decode(props.columns)),
    };
  } catch {
    return {
      dataSource: [],
      columns: [],
    };
  }
});

const customHeaderCell = () => {
  return {
    class: 'vp-doc',
  };
};

// 将其转化为html
const columns = computed(() => {
  return values.value.columns.map((item) => {
    return {
      ...item,
      customRender({ text }: { text: string }) {
        return <div v-html={text}></div>;
      },
      customHeaderCell,
      customCell() {
        return {
          class: 'vp-doc',
        };
      },
    };
  });
});
</script>
