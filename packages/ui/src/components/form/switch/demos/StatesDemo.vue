<script setup lang="ts">
import LuluSwitch from '@lulu/vue/switch'
import '@lulu/vue/switch/style.css'
</script>

<template>
  <div class="grid gap-4">
    <LuluSwitch :model-value="false" disabled>关闭且禁用</LuluSwitch>
    <LuluSwitch :model-value="true" disabled>开启且禁用</LuluSwitch>
  </div>
</template>

