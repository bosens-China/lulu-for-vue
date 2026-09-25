<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  colspan?: number
  empty?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  colspan: 1,
  empty: false,
})

const colspan = computed(() => {
  const value = Math.floor(props.colspan)

  return Number.isFinite(value) ? Math.max(1, value) : 1
})
</script>

<template>
  <table class="lulu-table">
    <caption v-if="$slots.caption" class="lulu-table__caption">
      <slot name="caption" />
    </caption>
    <thead v-if="$slots.head" class="lulu-table__head">
      <slot name="head" />
    </thead>
    <tbody class="lulu-table__body">
      <tr v-if="props.empty" class="lulu-table__empty-row">
        <td class="lulu-table__empty-cell" :colspan="colspan">
          <slot name="empty">No data</slot>
        </td>
      </tr>
      <slot v-else name="body"><slot /></slot>
    </tbody>
    <tfoot v-if="$slots.foot" class="lulu-table__foot">
      <slot name="foot" />
    </tfoot>
  </table>
</template>
