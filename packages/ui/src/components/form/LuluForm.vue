<script setup lang="ts">
import { provide, useTemplateRef } from 'vue'
import { formContextKey } from './form-context'
import type { FormFinishFailed, FormModel, FormRules } from './form-types'
import { useModelForm } from './useModelForm'

interface FormProps {
  model?: object | undefined
  rules?: FormRules | undefined
}

defineOptions({ inheritAttrs: false })
const props = defineProps<FormProps>()
const emit = defineEmits<{
  submit: [event: Event]
  reset: [event: Event]
  finish: [values: FormModel]
  finishFailed: [result: FormFinishFailed]
}>()

const element = useTemplateRef<HTMLFormElement>('element')
const { errors, validating, register, validate, runValidation, resetFields, clearValidate } = useModelForm({
  model: () => props.model,
  rules: () => props.rules,
  element: () => element.value,
})
provide(formContextKey, { errors, register })

async function submit(event: Event) {
  emit('submit', event)
  if (!props.model) return
  event.preventDefault()
  const result = await runValidation()
  if (result.stale) return
  if (result.valid) emit('finish', result.values)
  else emit('finishFailed', { values: result.values, errors: result.errors })
}

function reset(event: Event) {
  emit('reset', event)
  if (!props.model) return
  event.preventDefault()
  resetFields()
}

function noValidate(value: unknown) {
  return props.model || value === true || typeof value === 'string' ? true : undefined
}

defineExpose({ element, errors, validating, validate, resetFields, clearValidate })
</script>

<template>
  <form
    ref="element"
    v-bind="$attrs"
    class="lulu-form"
    :novalidate="noValidate($attrs.novalidate)"
    :aria-busy="validating ? true : ($attrs['aria-busy'] === true || $attrs['aria-busy'] === 'true' ? true : undefined)"
    @submit="submit"
    @reset="reset"
  >
    <slot />
  </form>
</template>
