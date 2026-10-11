import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluTable from '../LuluTable.vue'
import NativeTable from '../internal/NativeTable.vue'
import type { TableCellSlot, TableColumn } from '../types'

interface Member {
  id: number
  name: string
  role: string
}

const columns: TableColumn<Member>[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
]

const rows: Member[] = [
  { id: 1, name: 'Ada', role: 'Admin' },
  { id: 2, name: 'Bea', role: 'Editor' },
]

function getCheckbox(wrapper: ReturnType<typeof mount>, key: number) {
  const element = wrapper.get(`[data-row-key="${key}"] input`).element

  if (!(element instanceof HTMLInputElement)) {
    throw new Error('选择控件必须是原生复选框。')
  }

  return element
}

describe('NativeTable', () => {
  it('在可访问的横向滚动区域中保留表格属性', () => {
    const wrapper = mount(NativeTable, {
      attrs: {
        'aria-label': '成员数据',
        'class': 'member-table',
        'data-testid': 'members',
      },
      props: { scrollLabel: '成员表格滚动区域' },
    })

    expect(wrapper.get('.lulu-table-scroll').attributes()).toMatchObject({
      'aria-label': '成员表格滚动区域',
      'role': 'region',
      'tabindex': '0',
    })
    expect(wrapper.get('table').attributes()).toMatchObject({
      'aria-label': '成员数据',
      'data-testid': 'members',
    })
    expect(wrapper.get('table').classes()).toContain('member-table')
  })

  it('renders semantic caption, head, body, foot, and empty slots', () => {
    const wrapper = mount(NativeTable, {
      slots: {
        body: () => h('tr', [h('td', 'Row')]),
        caption: () => h('span', 'Members'),
        foot: () => h('tr', [h('td', 'Total')]),
        head: () => h('tr', [h('th', 'Name')]),
      },
    })

    expect(wrapper.get('caption').text()).toBe('Members')
    expect(wrapper.get('thead th').text()).toBe('Name')
    expect(wrapper.get('tbody td').text()).toBe('Row')
    expect(wrapper.get('tfoot td').text()).toBe('Total')
  })

  it('renders its empty slot across the requested column count', () => {
    const wrapper = mount(NativeTable, {
      props: {
        colspan: 3,
        empty: true,
      },
      slots: {
        empty: 'No members',
      },
    })

    expect(wrapper.get('.lulu-table__empty-cell').attributes('colspan')).toBe('3')
    expect(wrapper.text()).toContain('No members')
  })
})

describe('LuluTable', () => {
  it('允许覆盖辅助文案及行选择的可访问名称', async () => {
    const wrapper = mount(LuluTable<Member>, {
      props: {
        columns,
        emptyText: '暂无数据',
        loadingText: '正在读取',
        rowKey: 'id',
        rowSelectionLabel: row => `选择 ${row.name}`,
        rows,
        selectable: true,
        selectionLabel: '选择',
      },
    })

    expect(wrapper.get('.lulu-table__selection-header').text()).toBe('选择')
    expect(wrapper.get('[data-row-key="1"] input').attributes('aria-label')).toBe('选择 Ada')
    await wrapper.setProps({ rows: [] })
    expect(wrapper.get('[data-testid="table-empty"]').text()).toBe('暂无数据')
    await wrapper.setProps({ loading: true })
    expect(wrapper.get('[data-testid="table-loading"] .lulu-loading__label').text()).toBe('正在读取')
  })

  it('拒绝重复的行键', () => {
    expect(() => mount(LuluTable<Member>, {
      props: { columns, rowKey: 'id', rows: [rows[0]!, rows[0]!] },
    })).toThrow('rowKey 必须在当前 rows 中唯一')
  })

  it('uses rowKey to retain the selected row after rows reorder and renders cell slots', async () => {
    const wrapper = mount(LuluTable<Member>, {
      props: {
        columns,
        rowKey: 'id',
        rows,
        selectable: true,
        selectedKeys: [2],
      },
      slots: {
        cell: (props: TableCellSlot<Member>) => h(
          'strong',
          { 'data-testid': `member-${props.row.id}` },
          String(props.value),
        ),
      },
    })

    expect(wrapper.get('[data-testid="member-2"]').text()).toBe('Bea')
    expect(getCheckbox(wrapper, 2).checked).toBe(true)

    await wrapper.setProps({ rows: [...rows].reverse() })

    expect(wrapper.get('[data-row-key="2"] [data-testid="member-2"]').text()).toBe('Bea')
    expect(getCheckbox(wrapper, 2).checked).toBe(true)
  })

  it('renders loading before empty and then shows the empty slot', async () => {
    const wrapper = mount(LuluTable<Member>, {
      props: {
        columns,
        loading: true,
        rowKey: 'id',
        rows: [],
      },
      slots: {
        empty: 'Nothing here',
        loading: 'Loading members',
      },
    })

    expect(wrapper.get('[data-testid="table-loading"]').text()).toBe('Loading members')
    expect(wrapper.find('[data-testid="table-empty"]').exists()).toBe(false)

    await wrapper.setProps({ loading: false })

    expect(wrapper.find('[data-testid="table-loading"]').exists()).toBe(false)
    expect(wrapper.get('[data-testid="table-empty"]').text()).toBe('Nothing here')
  })

  it('emits controlled selected keys and selection events from a row checkbox', async () => {
    const wrapper = mount(LuluTable<Member>, {
      props: {
        columns,
        rowKey: 'id',
        rows,
        selectable: true,
      },
    })

    await wrapper.get('[data-row-key="1"] input').trigger('change')

    expect(wrapper.emitted('update:selectedKeys')).toEqual([[[1]]])
    expect(wrapper.emitted('select')).toEqual([[
      { key: 1, row: rows[0], selected: true },
    ]])
  })
})
