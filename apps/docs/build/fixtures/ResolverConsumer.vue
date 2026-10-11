<script setup lang="ts">
import { reactive, ref } from 'vue'
// 自动导入由消费构建的插件注入，源文件中不显式导入。
// eslint-disable-next-line no-undef
const message = useMessage()
const model = reactive({ time: '09:30' })
const page = ref(1)
const rows = [{ id: 1, title: '订单' }]
const columns = [{ key: 'title', label: '订单' }] as const
</script>

<template>
  <LuluButton @click="message.success('done')">Auto import</LuluButton>
  <LuluPopconfirm>
    <template #trigger>Delete</template>
  </LuluPopconfirm>
  <LuluForm :model="model">
    <LuluFormItem name="time" label="时间"><LuluTimePicker v-model="model.time" /></LuluFormItem>
  </LuluForm>
  <LuluTable v-model:page="page" :rows="rows" :columns="columns" row-key="id" :pagination="{ total: 40 }" />
</template>
