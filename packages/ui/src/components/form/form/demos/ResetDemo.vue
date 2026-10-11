<script setup lang="ts">
import { reactive, shallowRef, useTemplateRef } from 'vue'
import LuluForm from '@lulu/vue/form'
import LuluFormItem from '@lulu/vue/form-item'
import LuluInput from '@lulu/vue/input'
import LuluButton from '@lulu/vue/button'
import type { FormInstance, FormRules } from '@lulu/vue/form'
import '@lulu/vue/form/style.css'
import '@lulu/vue/form-item/style.css'
import '@lulu/vue/input/style.css'
import '@lulu/vue/button/style.css'
const form = useTemplateRef<FormInstance>('resetForm')
const model = reactive({ email: 'default@example.com' })
const status = shallowRef('')
const rules: FormRules = {
  email: value => typeof value === 'string' && value.endsWith('@example.com') ? undefined : '请使用 example.com 邮箱',
}
function reset() {
  form.value?.resetFields()
  status.value = '数据与校验已重置'
}
</script>

<template>
  <div class="grid gap-4">
    <LuluForm ref="resetForm" :model="model" :rules="rules" @finish="status = '校验通过'" @finish-failed="status = '请修正邮箱'">
      <LuluFormItem name="email" label="复位示例邮箱" required>
        <LuluInput v-model="model.email" type="email" />
      </LuluFormItem>
      <div class="flex flex-wrap gap-3"><LuluButton native-type="submit">检查邮箱</LuluButton><LuluButton @click="reset">重置表单与校验</LuluButton></div>
      <output>{{ status }}</output>
    </LuluForm>
  </div>
</template>
