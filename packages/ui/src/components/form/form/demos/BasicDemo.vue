<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluForm from '@lulu/vue/form'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/button/style.css'
import '@lulu/vue/form/style.css'
import '@lulu/vue/input/style.css'

const submitted = ref(false)

function submit(event: Event) {
  event.preventDefault()
  submitted.value = true
}
</script>

<template>
  <LuluForm @submit="submit">
    <LuluInput name="name" placeholder="请输入姓名" required />
    <LuluButton native-type="submit">提交</LuluButton>
    <p v-if="submitted" role="status">已收到提交事件</p>
  </LuluForm>
</template>
