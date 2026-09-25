<script setup lang="ts">
import { useTemplateRef } from 'vue'

const element = useTemplateRef<HTMLFormElement>('element')

defineExpose({ element })
</script>

<template>
  <form ref="element" class="lulu-form">
    <slot />
  </form>
</template>
