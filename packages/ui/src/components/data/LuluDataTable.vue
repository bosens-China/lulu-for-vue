<script lang="ts">
export type TableKey = string | number

export interface DataTableColumn<Row extends object> {
  align?: 'start' | 'center' | 'end'
  key: keyof Row
  label: string
}

export type DataTableRowKey<Row extends object> = keyof Row | ((row: Row) => TableKey)

export interface LuluDataTableRuntimeProps<Row extends object> {
  columns: readonly DataTableColumn<Row>[]
  loading?: boolean
  loadingText?: string
  emptyText?: string
  rowKey: DataTableRowKey<Row>
  rowSelectionLabel?: (row: Row, rowIndex: number) => string
  rows: readonly Row[]
  selectable?: boolean
  selectionLabel?: string
}

export interface DataTableCellSlot<Row extends object> {
  column: DataTableColumn<Row>
  row: Row
  rowIndex: number
  value: unknown
}

export interface DataTableSelection<Row extends object> {
  key: TableKey
  row: Row
  selected: boolean
}
</script>

<script setup lang="ts" generic="Row extends object">
import { computed } from 'vue'
import LuluTable from './LuluTable.vue'

interface TableRowData {
  key: TableKey
  row: Row
  rowIndex: number
}

const props = withDefaults(defineProps<LuluDataTableRuntimeProps<Row>>(), {
  loading: false,
  selectable: false,
})

const selectedKeys = defineModel<TableKey[]>('selectedKeys', {
  default: () => [],
})

const emit = defineEmits<{
  select: [selection: DataTableSelection<Row>]
}>()

defineSlots<{
  caption?(): unknown
  cell?(props: DataTableCellSlot<Row>): unknown
  empty?(): unknown
  loading?(): unknown
}>()

const tableRows = computed<TableRowData[]>(() => {
  // 选择和渲染都以稳定的 rowKey 为依据，rows 重排不会改变已选行。
  const keys = new Set<TableKey>()

  return props.rows.map((row, rowIndex) => {
    const key = getRowKey(row)

    if (keys.has(key)) {
      throw new Error('LuluDataTable 的 rowKey 必须在当前 rows 中唯一。')
    }

    keys.add(key)

    return { key, row, rowIndex }
  })
})

const selectedKeySet = computed(() => new Set(selectedKeys.value))
const isEmpty = computed(() => !props.loading && tableRows.value.length === 0)
const columnCount = computed(() => Math.max(1, props.columns.length + Number(props.selectable)))

function getRowKey(row: Row): TableKey {
  const value = typeof props.rowKey === 'function'
    ? props.rowKey(row)
    : row[props.rowKey]

  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new TypeError('LuluDataTable 的 rowKey 必须指向 string 或 number。')
  }

  return value
}

function getCellValue(row: Row, column: DataTableColumn<Row>) {
  return row[column.key]
}

function formatCell(value: unknown) {
  return value == null ? '' : String(value)
}

function isSelected(key: TableKey) {
  return selectedKeySet.value.has(key)
}

function toggleSelection(row: Row, key: TableKey) {
  const selected = !isSelected(key)
  const keys = selected
    ? [...selectedKeys.value, key]
    : selectedKeys.value.filter((selectedKey) => selectedKey !== key)

  selectedKeys.value = keys
  emit('select', { key, row, selected })
}
</script>

<template>
  <LuluTable class="lulu-data-table" :colspan="columnCount" :empty="isEmpty">
    <template v-if="$slots.caption" #caption>
      <slot name="caption" />
    </template>

    <template #head>
      <tr>
        <th v-if="props.selectable" scope="col" class="lulu-data-table__selection-header">
          {{ props.selectionLabel ?? 'Select' }}
        </th>
        <th
          v-for="column in props.columns"
          :key="String(column.key)"
          scope="col"
          :data-align="column.align"
        >
          {{ column.label }}
        </th>
      </tr>
    </template>

    <template #body>
      <tr v-if="props.loading" class="lulu-data-table__loading-row">
        <td :colspan="columnCount" class="lulu-data-table__loading-cell" data-testid="data-table-loading">
          <slot name="loading">{{ props.loadingText ?? 'Loading…' }}</slot>
        </td>
      </tr>

      <tr
        v-for="item in tableRows"
        v-else
        :key="item.key"
        class="lulu-data-table__row"
        :data-row-key="item.key"
      >
        <td v-if="props.selectable" class="lulu-data-table__selection-cell">
          <input
            type="checkbox"
            :aria-label="props.rowSelectionLabel?.(item.row, item.rowIndex) ?? `Select row ${item.rowIndex + 1}`"
            :checked="isSelected(item.key)"
            @change="toggleSelection(item.row, item.key)"
          >
        </td>
        <td
          v-for="column in props.columns"
          :key="String(column.key)"
          :data-align="column.align"
        >
          <slot
            name="cell"
            :column="column"
            :row="item.row"
            :row-index="item.rowIndex"
            :value="getCellValue(item.row, column)"
          >
            {{ formatCell(getCellValue(item.row, column)) }}
          </slot>
        </td>
      </tr>
    </template>

    <template #empty>
      <span data-testid="data-table-empty"><slot name="empty">{{ props.emptyText ?? 'No data' }}</slot></span>
    </template>
  </LuluTable>
</template>
