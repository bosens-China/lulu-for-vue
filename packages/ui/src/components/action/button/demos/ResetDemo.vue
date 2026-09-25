<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluInput from '@lulu/vue/input'

import '@lulu/vue/button/style.css'
import '@lulu/vue/input/style.css'
const name = ref('')
const status = ref('')
function reset() {
  name.value = ''
  status.value = '表单已重置'
}
</script>

<template>
  <div class="grid gap-4">
    <form class="grid gap-4" @reset="reset" @submit.prevent="status = '已提交：' + name">
      <LuluInput v-model="name" name="name" aria-label="按钮示例姓名" placeholder="先输入姓名" />
      <div class="flex gap-3"><LuluButton native-type="submit">提交姓名</LuluButton><LuluButton native-type="reset">重置姓名</LuluButton></div>
      <output>{{ status }}</output>
    </form>
  </div>
</template>

