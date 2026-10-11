<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluForm from '@lulu/vue/form'
import LuluFormItem from '@lulu/vue/form-item'
import LuluInput from '@lulu/vue/input'
import type { FormRules } from '@lulu/vue/form'
import '@lulu/vue/button/style.css'
import '@lulu/vue/form/style.css'
import '@lulu/vue/form-item/style.css'
import '@lulu/vue/input/style.css'

const model = reactive({ email: '' })
const submitted = shallowRef(false)
const rules: FormRules = {
  email: (value) => typeof value === 'string' && value.endsWith('@example.com') ? undefined : '请使用 example.com 邮箱',
}
</script>

<template>
  <LuluForm :model="model" :rules="rules" @finish="submitted = true" @finish-failed="submitted = false">
    <LuluFormItem name="email" label="邮箱" required>
      <LuluInput
        v-model="model.email"
        placeholder="name@example.com"
        type="email"
        @update:model-value="submitted = false"
      />
    </LuluFormItem>
    <LuluButton native-type="submit">验证并提交</LuluButton>
    <p v-if="submitted" role="status">校验通过，可以提交</p>
  </LuluForm>
</template>
