<script setup>
// 自动导入由消费构建的插件注入，源文件中不显式导入。
// eslint-disable-next-line no-undef
const message = useMessage()
</script>

<template>
  <LuluButton @click="message.success('done')">Auto import</LuluButton>
</template>
