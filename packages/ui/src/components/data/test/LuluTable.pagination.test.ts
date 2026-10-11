import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluTable from '../LuluTable.vue'

const columns = [{ key: 'name', label: '名称' }] as const
const rows = [{ id: 41, name: '当前页第一行' }, { id: 42, name: '当前页第二行' }]
type Row = typeof rows[number]

describe('Table 受控分页与加载', () => {
  it('默认不显示分页；启用后不再切分当前页 rows', async () => {
    const wrapper = mount(LuluTable<Row>, { props: { columns, rows, rowKey: 'id' } })
    expect(wrapper.find('nav').exists()).toBe(false)

    await wrapper.setProps({ pagination: { total: 100, pageSize: 2 }, page: 21 })
    expect(wrapper.get('[aria-current="page"]').text()).toBe('21')
    expect(wrapper.findAll('[data-row-key]')).toHaveLength(2)
    expect(wrapper.get('tbody').text()).toContain('当前页第一行')

    await wrapper.get('[aria-label="下一页"]').trigger('click')
    expect(wrapper.emitted('update:page')).toEqual([[22]])
    expect(wrapper.findAll('[data-row-key]')).toHaveLength(2)
  })

  it('总数收缩时归一化页码；单页隐藏导航并保持数据', async () => {
    const wrapper = mount(LuluTable<Row>, {
      props: { columns, rows, rowKey: 'id', page: 5, pagination: { total: 100, pageSize: 20 } },
    })
    await wrapper.setProps({ pagination: { total: 40, pageSize: 20 } })
    expect(wrapper.emitted('update:page')).toEqual([[2]])
    await wrapper.setProps({ page: 2, pagination: { total: 2, pageSize: 20 } })
    expect(wrapper.emitted('update:page')).toEqual([[2], [1]])
    expect(wrapper.find('nav').exists()).toBe(false)
    expect(wrapper.findAll('[data-row-key]')).toHaveLength(2)
  })

  it('首载复用 Loading，加载结束后自动显示空态', async () => {
    const wrapper = mount(LuluTable<Row>, {
      props: { columns, rows: [], rowKey: 'id', loading: true, loadingText: '正在读取成员' },
    })
    expect(wrapper.get('table').attributes('aria-busy')).toBe('true')
    expect(wrapper.get('[role="status"]').text()).toContain('正在读取成员')
    expect(wrapper.find('[data-testid="table-empty"]').exists()).toBe(false)
    await wrapper.setProps({ loading: false })
    expect(wrapper.get('table').attributes('aria-busy')).toBe('false')
    expect(wrapper.get('[data-testid="table-empty"]').text()).toBe('暂无数据')
  })

  it('刷新保留已有行、显示遮罩并暂停表格与分页交互', async () => {
    const wrapper = mount(LuluTable<Row>, {
      props: { columns, rows, rowKey: 'id', selectable: true, pagination: { total: 60 } },
    })
    const row = wrapper.get('[data-row-key="41"]').element
    await wrapper.setProps({ loading: true })
    expect(wrapper.get('[data-row-key="41"]').element).toBe(row)
    expect(wrapper.get('table').attributes('inert')).toBeDefined()
    expect(wrapper.find('.lulu-table__loading-overlay .lulu-loading').exists()).toBe(true)
    await wrapper.get('[data-row-key="41"] input').trigger('change')
    expect(wrapper.emitted('select')).toBeUndefined()
    await wrapper.get('[aria-label="下一页"]').trigger('click')
    expect(wrapper.emitted('update:page')).toBeUndefined()
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.lulu-table__loading-overlay').exists()).toBe(false)
    expect(wrapper.get('table').attributes('inert')).toBeUndefined()
  })

  it('首载与刷新保留 loading 插槽；显式禁用分页有效', async () => {
    const wrapper = mount(LuluTable<Row>, {
      props: { columns, rows: [], rowKey: 'id', loading: true, pagination: { total: 60, disabled: true } },
      slots: { loading: '自定义读取状态' },
    })
    expect(wrapper.get('[data-testid="table-loading"]').text()).toBe('自定义读取状态')
    await wrapper.setProps({ rows })
    expect(wrapper.get('.lulu-table__loading-overlay').text()).toBe('自定义读取状态')
    await wrapper.setProps({ loading: false })
    await wrapper.get('[aria-label="下一页"]').trigger('click')
    expect(wrapper.emitted('update:page')).toBeUndefined()
  })

  it('保留 table Attributes，并让组合层继承实例主题', () => {
    const wrapper = mount(LuluTable<Row>, {
      props: { columns, rows, rowKey: 'id', pagination: { total: 60 } },
      attrs: { class: 'members', 'aria-label': '成员', 'data-lulu-theme': 'dark', style: { '--lulu-color-primary': 'purple' } },
    })
    expect(wrapper.get('table').classes()).toContain('members')
    expect(wrapper.get('table').attributes('aria-label')).toBe('成员')
    expect(wrapper.get('.lulu-table-container').attributes('data-lulu-theme')).toBe('dark')
    expect((wrapper.element as HTMLElement).style.getPropertyValue('--lulu-color-primary')).toBe('purple')
  })

  it.each([
    ['--lulu-color-primary: purple; margin: 12px'],
    [['--lulu-color-primary: orange; margin: 8px', { '--lulu-color-primary': 'purple', margin: '12px' }]],
  ])('样式字符串或数组只将主题变量复制到组合层', (style) => {
    const wrapper = mount(LuluTable<Row>, { props: { columns, rows, rowKey: 'id' }, attrs: { style } })
    const container = wrapper.element as HTMLElement
    const table = wrapper.get('table').element
    expect(container.style.getPropertyValue('--lulu-color-primary')).toBe('purple')
    expect(container.style.margin).toBe('')
    expect(table.style.margin).toBe('12px')
    expect(table.style.getPropertyValue('--lulu-color-primary')).toBe('purple')
  })
})
