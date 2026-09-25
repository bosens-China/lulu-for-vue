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
  loading?: boolean
  rowKey: DataTableRowKey<Row>
  rows: readonly Row[]
  selectable?: boolean
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
