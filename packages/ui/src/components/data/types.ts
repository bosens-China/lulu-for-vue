export type TableKey = string | number
export type TableRow = object

export interface DataTableColumn<Row extends TableRow> {
  align?: 'start' | 'center' | 'end'
  key: keyof Row
  label: string
}

export type DataTableRowKey<Row extends TableRow> =
  | keyof Row
  | ((row: Row) => TableKey)

export interface LuluDataTableProps<Row extends TableRow> {
  columns: readonly DataTableColumn<Row>[]
  emptyText?: string
  loading?: boolean
  loadingText?: string
  rowKey: DataTableRowKey<Row>
  rowSelectionLabel?: (row: Row, rowIndex: number) => string
  rows: readonly Row[]
  selectable?: boolean
  selectionLabel?: string
}

export interface DataTableCellSlot<Row extends TableRow> {
  column: DataTableColumn<Row>
  row: Row
  rowIndex: number
  value: unknown
}

export interface DataTableSelection<Row extends TableRow> {
  key: TableKey
  row: Row
  selected: boolean
}
