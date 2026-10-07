<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  disabled?: boolean
  /** 传入后渲染为链接（<a>），保留按钮外观，target/rel 等原生属性透传 */
  href?: string
  loading?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'normal' | 'primary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  nativeType: 'button',
  variant: 'default',
})

// 传入 href 时切换为链接语义；禁用或加载中的链接不可跳转
const isLink = computed(() => Boolean(props.href))
const inert = computed(() => props.disabled || props.loading)

function onLinkClick(event: MouseEvent) {
  if (inert.value) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<template>
  <a
    v-if="isLink"
    class="lulu-button lulu-u-inline-flex lulu-u-items-center lulu-u-justify-center"
    :href="inert ? undefined : props.href"
    :aria-disabled="inert || undefined"
    :aria-busy="props.loading || undefined"
    :data-variant="props.variant"
    @click="onLinkClick"
  >
    <span v-if="props.loading" class="lulu-button__loading" aria-hidden="true" />
    <slot />
  </a>
  <button
    v-else
    class="lulu-button lulu-u-inline-flex lulu-u-items-center lulu-u-justify-center"
    :type="props.nativeType"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading || undefined"
    :data-variant="props.variant"
  >
    <span v-if="props.loading" class="lulu-button__loading" aria-hidden="true" />
    <slot />
  </button>
</template>
