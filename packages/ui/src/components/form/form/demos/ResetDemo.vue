<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import LuluForm from '@lulu/vue/form'
import LuluFormField from '@lulu/vue/form-field'
import LuluInput from '@lulu/vue/input'
import LuluButton from '@lulu/vue/button'
import { useFormValidation } from '@lulu/vue/use-form-validation'
import '@lulu/vue/form/style.css'
import '@lulu/vue/form-field/style.css'
import '@lulu/vue/input/style.css'
import '@lulu/vue/button/style.css'
const form = useTemplateRef<{ element: HTMLFormElement | null }>('resetForm')
const email = ref('')
const status = ref('')
const { errors, validate, reset: resetValidation } = useFormValidation(() => form.value?.element, {
  rules: { email: value => value.endsWith('@example.com') ? undefined : '请使用 example.com 邮箱' },
})
function submit() {
  status.value = validate() ? '校验通过' : '请修正邮箱'
}
function reset(event: Event) {
  // resetValidation 会清理错误；此事件只负责同步业务模型，避免递归 reset。
  event.preventDefault()
  email.value = ''
  status.value = '数据与校验已重置'
}
</script>

<template>
  <div class="grid gap-4">
    <LuluForm ref="resetForm" class="grid gap-4" novalidate @submit.prevent="submit" @reset="reset">
      <LuluFormField v-slot="{ controlProps }" control-id="reset-email" label="复位示例邮箱" :error="errors.email ?? ''" required>
        <LuluInput v-model="email" v-bind="controlProps" name="email" type="email" />
      </LuluFormField>
      <div class="flex gap-3"><LuluButton native-type="submit">检查邮箱</LuluButton><LuluButton @click="resetValidation">重置表单与校验</LuluButton></div>
      <output>{{ status }}</output>
    </LuluForm>
  </div>
</template>
