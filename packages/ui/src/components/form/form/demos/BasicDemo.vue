<script setup lang="ts">
import { reactive, ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluForm from '@lulu/vue/form'
import LuluFormItem from '@lulu/vue/form-item'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/button/style.css'
import '@lulu/vue/form/style.css'
import '@lulu/vue/form-item/style.css'
import '@lulu/vue/input/style.css'

const submitted = ref(false)
const model = reactive({ name: '' })
</script>

<template>
  <LuluForm :model="model" @finish="submitted = true" @finish-failed="submitted = false">
    <LuluFormItem name="name" label="姓名" required>
      <LuluInput v-model="model.name" placeholder="请输入姓名" @update:model-value="submitted = false" />
    </LuluFormItem>
    <LuluButton native-type="submit">提交</LuluButton>
    <p v-if="submitted" role="status">已提交姓名：{{ model.name }}</p>
  </LuluForm>
</template>
