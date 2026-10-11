export type TableKey = string | number
export type TableRow = object

export interface TableColumn<Row extends TableRow> {
  align?: 'start' | 'center' | 'end'
  key: keyof Row
  label: string
}

export type TableRowKey<Row extends TableRow> =
  | keyof Row
  | ((row: Row) => TableKey)

export interface TablePagination {
  total: number
  pageSize?: number
  disabled?: boolean
}

export interface LuluTableProps<Row extends TableRow> {
  columns: readonly TableColumn<Row>[]
  emptyText?: string
  loading?: boolean
  loadingText?: string
  pagination?: false | TablePagination
  rowKey: TableRowKey<Row>
  rowSelectionLabel?: (row: Row, rowIndex: number) => string
  rows: readonly Row[]
  selectable?: boolean
  selectionLabel?: string
}

export interface TableCellSlot<Row extends TableRow> {
  column: TableColumn<Row>
  row: Row
  rowIndex: number
  value: unknown
}

export interface TableSelection<Row extends TableRow> {
  key: TableKey
  row: Row
  selected: boolean
}
