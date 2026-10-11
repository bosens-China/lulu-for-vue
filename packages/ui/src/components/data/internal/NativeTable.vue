<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  colspan?: number
  empty?: boolean
  scrollLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  colspan: 1,
  empty: false,
  scrollLabel: '表格滚动区域',
})

const colspan = computed(() => {
  const value = Math.floor(props.colspan)

  return Number.isFinite(value) ? Math.max(1, value) : 1
})
</script>

<template>
  <div class="lulu-table-scroll" tabindex="0" role="region" :aria-label="props.scrollLabel">
    <table v-bind="$attrs" class="lulu-table">
      <caption v-if="$slots.caption" class="lulu-table__caption">
        <slot name="caption" />
      </caption>
      <thead v-if="$slots.head" class="lulu-table__head">
        <slot name="head" />
      </thead>
      <tbody class="lulu-table__body">
        <tr v-if="props.empty" class="lulu-table__empty-row">
          <td class="lulu-table__empty-cell" :colspan="colspan">
            <slot name="empty">暂无数据</slot>
          </td>
        </tr>
        <slot v-else name="body"><slot /></slot>
      </tbody>
      <tfoot v-if="$slots.foot" class="lulu-table__foot">
        <slot name="foot" />
      </tfoot>
    </table>
  </div>
</template>
