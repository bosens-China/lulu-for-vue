<script setup lang="ts">
import { computed } from 'vue'
import LuluFieldError from '../feedback/LuluFieldError.vue'

defineOptions({ inheritAttrs: false })

interface Props {
  controlId: string
  error?: string
  label?: string
  required?: boolean
}

type ControlProps = {
  id: string
  required?: true | undefined
  'aria-describedby'?: string | undefined
  'aria-errormessage'?: string | undefined
  'aria-invalid'?: 'true' | undefined
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
})

const errorId = computed(() => props.error ? `${props.controlId}-error` : undefined)
const controlProps = computed<ControlProps>(() => ({
  id: props.controlId,
  required: props.required || undefined,
  'aria-describedby': errorId.value,
  'aria-errormessage': errorId.value,
  'aria-invalid': props.error ? 'true' : undefined,
}))
</script>

<template>
  <div v-bind="$attrs" class="lulu-form-field">
    <label
      v-if="props.label || $slots.label"
      class="lulu-form-field__label"
      :for="props.controlId"
    >
      <slot name="label">{{ props.label }}</slot>
      <span v-if="props.required" aria-hidden="true"> *</span>
    </label>
    <div class="lulu-form-field__control">
      <slot :control-props="controlProps" />
    </div>
    <slot
      v-if="props.error"
      name="error"
      :error-id="errorId"
      :message="props.error"
    >
      <LuluFieldError :id="errorId" :message="props.error" />
    </slot>
  </div>
</template>
