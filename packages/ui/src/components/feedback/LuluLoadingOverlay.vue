<script setup lang="ts">
import LuluLoading from './LuluLoading.vue'

interface Props {
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Loading',
})

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <div
    v-if="open"
    class="lulu-loading-overlay"
    aria-busy="true"
  >
    <LuluLoading :label="props.message">
      <slot>{{ props.message }}</slot>
    </LuluLoading>
  </div>
</template>
