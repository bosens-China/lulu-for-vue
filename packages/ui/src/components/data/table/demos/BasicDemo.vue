<script setup lang="ts">
import LuluTable from '@lulu/vue/table'
import '@lulu/vue/table/style.css'
</script>

<template>
  <LuluTable>
    <template #caption>成员列表</template>
    <template #head>
      <tr><th>姓名</th><th>角色</th><th>邮箱</th><th>最近登录</th></tr>
    </template>
    <tr><td>小鹿</td><td>维护者</td><td>xiaolu@example.com</td><td>2026-10-02 09:30</td></tr>
  </LuluTable>
</template>
