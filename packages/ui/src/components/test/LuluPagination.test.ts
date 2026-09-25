import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluPagination from '../LuluPagination.vue'

describe('LuluPagination', () => {
  it('允许配置导航与页码的可访问文案', () => {
    const wrapper = mount(LuluPagination, {
      props: {
        ariaLabel: '成员分页',
        modelValue: 2,
        nextLabel: '下一页',
        pageLabel: page => `第 ${page} 页`,
        pageSize: 10,
        previousLabel: '上一页',
        total: 40,
      },
    })

    expect(wrapper.get('nav').attributes('aria-label')).toBe('成员分页')
    expect(wrapper.get('[aria-label="上一页"]').attributes('disabled')).toBeUndefined()
    expect(wrapper.get('[aria-label="下一页"]').attributes('disabled')).toBeUndefined()
    expect(wrapper.get('[aria-label="第 2 页"]').attributes('aria-current')).toBe('page')
  })

  it('renders the current page with bounded page buttons and ellipses', () => {
    const wrapper = mount(LuluPagination, {
      props: {
        modelValue: 5,
        total: 200,
        pageSize: 20,
      },
    })

    expect(wrapper.find('[aria-current="page"]').text()).toBe('5')
    expect(wrapper.findAll('.lulu-pagination__ellipsis')).toHaveLength(2)
    expect(wrapper.findAll('button').map((button) => button.text())).toEqual([
      '‹',
      '1',
      '4',
      '5',
      '6',
      '10',
      '›',
    ])
  })

  it('updates v-model when a user selects another page', async () => {
    const wrapper = mount(LuluPagination, {
      props: {
        modelValue: 2,
        total: 100,
        pageSize: 10,
      },
    })

    await wrapper.get('[aria-label="Next page"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
  })

  it('does not update from unavailable navigation actions', async () => {
    const firstPage = mount(LuluPagination, {
      props: {
        modelValue: 1,
        total: 100,
        pageSize: 10,
      },
    })
    const disabled = mount(LuluPagination, {
      props: {
        modelValue: 2,
        total: 100,
        pageSize: 10,
        disabled: true,
      },
    })

    await firstPage.get('[aria-label="Previous page"]').trigger('click')
    await disabled.get('[aria-label="Next page"]').trigger('click')

    expect(firstPage.emitted('update:modelValue')).toBeUndefined()
    expect(disabled.emitted('update:modelValue')).toBeUndefined()
  })

  it('does not render when there is at most one page', () => {
    const wrapper = mount(LuluPagination, {
      props: {
        modelValue: 1,
        total: 20,
        pageSize: 20,
      },
    })

    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('normalizes an out-of-range v-model value after data shrinks', async () => {
    const wrapper = mount(LuluPagination, {
      props: {
        modelValue: 5,
        total: 100,
        pageSize: 20,
      },
    })

    await wrapper.setProps({ total: 40 })

    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
  })
})
