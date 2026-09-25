<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluForm from '@lulu/vue/form'
import LuluFormField from '@lulu/vue/form-field'
import LuluInput from '@lulu/vue/input'
import { useFormValidation, type FormValidationRules } from '@lulu/vue/use-form-validation'
import '@lulu/vue/button/style.css'
import '@lulu/vue/form/style.css'
import '@lulu/vue/form-field/style.css'
import '@lulu/vue/input/style.css'

const form = useTemplateRef<{ element: HTMLFormElement | null }>('form')
const email = ref('')
const submitted = ref(false)
const rules: FormValidationRules = {
  email: (value) => value.endsWith('@example.com') ? undefined : '请使用 example.com 邮箱',
}
const { errors, validate } = useFormValidation(() => form.value?.element, { rules })

function submit(event: Event) {
  event.preventDefault()
  submitted.value = validate()
}
</script>

<template>
  <LuluForm ref="form" novalidate @submit="submit">
    <LuluFormField
      v-slot="{ controlProps }"
      control-id="email"
      :error="errors.email ?? ''"
      label="邮箱"
      required
    >
      <LuluInput
        v-model="email"
        v-bind="controlProps"
        name="email"
        placeholder="name@example.com"
        type="email"
        @update:model-value="submitted = false"
      />
    </LuluFormField>
    <LuluButton native-type="submit">验证并提交</LuluButton>
    <p v-if="submitted" role="status">校验通过，可以提交</p>
  </LuluForm>
</template>
