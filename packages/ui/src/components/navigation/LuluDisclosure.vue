<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open', { default: false })

function syncOpenState(event: Event) {
  const details = event.currentTarget

  if (details instanceof HTMLDetailsElement) {
    open.value = details.open
  }
}
</script>

<template>
  <details
    class="lulu-disclosure"
    :open="open"
    @toggle="syncOpenState"
  >
    <summary class="lulu-disclosure__summary">
      <slot name="summary">{{ props.title }}</slot>
    </summary>
    <div class="lulu-disclosure__content">
      <slot />
    </div>
  </details>
</template>
