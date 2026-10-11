<script setup lang="ts">
import { computed, inject, onScopeDispose, useId, useSlots } from 'vue'
import { formContextKey, provideFormItemControl } from './form-context'
import type { FormItemProps } from './form-types'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<FormItemProps>(), { required: false })
defineSlots<{
  default?(props: { controlProps: Record<string, unknown> }): unknown
  label?(): unknown
  help?(): unknown
  error?(props: { errorId: string | undefined; message: string }): unknown
}>()
const slots = useSlots()
const form = inject(formContextKey, undefined)
const generatedId = `lulu-field-${useId()}`
const controlId = computed(() => props.controlId ?? generatedId)
const message = computed(() => props.error ?? (props.name ? form?.errors.value[props.name] : undefined))
const errorId = computed(() => message.value ? `${controlId.value}-error` : undefined)
const helpId = computed(() => props.help || slots.help ? `${controlId.value}-help` : undefined)
const controlProps = computed<Record<string, unknown>>(() => ({
  id: controlId.value,
  name: props.name,
  required: props.required || undefined,
  'aria-describedby': [helpId.value, errorId.value].filter(Boolean).join(' ') || undefined,
  'aria-errormessage': errorId.value,
  'aria-invalid': message.value ? 'true' : undefined,
}))
provideFormItemControl(controlProps)
if (form) onScopeDispose(form.register({ getProps: () => props, getId: () => controlId.value }))
</script>

<template>
  <div v-bind="$attrs" class="lulu-form-item" :data-lulu-field-id="controlId">
    <label v-if="props.label || $slots.label" class="lulu-form-item__label" :for="controlId">
      <slot name="label">{{ props.label }}</slot>
      <span v-if="props.required" aria-hidden="true"> *</span>
    </label>
    <div class="lulu-form-item__control"><slot :control-props="controlProps" /></div>
    <p v-if="props.help || $slots.help" :id="`${controlId}-help`" class="lulu-form-item__help">
      <slot name="help">{{ props.help }}</slot>
    </p>
    <slot v-if="message" name="error" :error-id="errorId" :message="message">
      <p :id="errorId" class="lulu-form-item__error" role="alert" aria-atomic="true">{{ message }}</p>
    </slot>
  </div>
</template>
