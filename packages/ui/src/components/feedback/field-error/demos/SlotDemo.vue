<script setup lang="ts">
import LuluFieldError from '@lulu/vue/field-error'

import '@lulu/vue/field-error/style.css'

</script>

<template>
  <div class="grid gap-4">
    <LuluFieldError><strong>无法保存：</strong>请检查必填项后重试。</LuluFieldError>
  </div>
</template>

