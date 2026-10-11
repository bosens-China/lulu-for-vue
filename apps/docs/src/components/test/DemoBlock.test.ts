import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DemoBlock from '../DemoBlock.vue'
import Prism from '../../prism'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('DemoBlock', () => {
  it('高亮失败时仍安全展示和复制源码', async () => {
    const highlight = vi.spyOn(Prism, 'highlight').mockImplementation(() => { throw new Error('highlight failed') })
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const source = '<script>alert("test")</script>'
    const wrapper = mount(DemoBlock, {
      props: { source, sourceLabel: '查看源码', copyLabel: '复制', copiedLabel: '已复制' },
    })
    try {
      const details = wrapper.get('details')
      details.element.open = true
      await details.trigger('toggle')
      await vi.dynamicImportSettled()
      await flushPromises()
      expect(highlight).toHaveBeenCalled()
      expect(wrapper.get('code').text()).toBe(source)
      expect(wrapper.find('script').exists()).toBe(false)
      expect(wrapper.find('.token').exists()).toBe(false)
      await wrapper.get('button').trigger('click')
      expect(writeText).toHaveBeenCalledWith(source)
    } finally {
      wrapper.unmount()
    }
  })

  it('预览背景按钮不提交外层表单，并可轮换全部背景', async () => {
    const wrapper = mount(DemoBlock, {
      props: { source: '', sourceLabel: '查看源码', copyLabel: '复制', copiedLabel: '已复制' },
      slots: { default: '<p>组件预览</p>' },
    })
    const button = wrapper.get('button[aria-label="切换预览背景"]')
    expect(button.attributes('type')).toBe('button')
    for (const mode of ['dot', 'grid', 'checkerboard', 'clean']) {
      await button.trigger('click')
      expect(wrapper.find(`.docs-canvas--${mode}`).exists()).toBe(true)
    }
    wrapper.unmount()
  })

  it('展开后才高亮 Vue 中的 TypeScript、模板和样式，同时保留源码文本', async () => {
    const source = `<script setup lang="ts">\nimport { ref } from 'vue'\nconst open = ref<boolean>(false)\n</script>\n<template><button>打开</button></template>\n<style>button { color: red; }</style>`
    const wrapper = mount(DemoBlock, {
      props: { source, sourceLabel: '查看源码', copyLabel: '复制', copiedLabel: '已复制' },
    })
    expect(wrapper.get('code').text()).toBe(source)
    expect(wrapper.find('.token').exists()).toBe(false)
    const details = wrapper.get('details')
    details.element.open = true
    await details.trigger('toggle')
    await vi.dynamicImportSettled()
    await flushPromises()
    expect(wrapper.get('code').text()).toBe(source)
    expect(wrapper.get('.language-typescript .token.keyword').text()).toBe('import')
    expect(wrapper.get('.language-typescript .token.boolean').text()).toBe('false')
    expect(wrapper.findAll('.token.tag').length).toBeGreaterThan(0)
    expect(wrapper.get('.language-css .token.property').text()).toBe('color')
    wrapper.unmount()
  })

  it('展示预览、说明和同源源码', () => {
    const wrapper = mount(DemoBlock, {
      props: {
        copiedLabel: '已复制',
        copyLabel: '复制源码',
        source: '<button>Demo</button>',
        sourceLabel: '查看源码',
      },
      slots: {
        default: '<button>Demo</button>',
        description: '<p>基础示例</p>',
      },
    })

    expect(wrapper.text()).toContain('Demo')
    expect(wrapper.text()).toContain('基础示例')
    expect(wrapper.get('code').text()).toBe('<button>Demo</button>')
    wrapper.unmount()
  })

  it('通过浏览器剪贴板复制源码并反馈结果', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const wrapper = mount(DemoBlock, {
      props: {
        copiedLabel: 'Copied',
        copyLabel: 'Copy source',
        source: '<button>Demo</button>',
        sourceLabel: 'View source',
      },
    })

    await wrapper.get('button').trigger('click')

    expect(writeText).toHaveBeenCalledWith('<button>Demo</button>')
    expect(wrapper.get('button').text()).toBe('Copied')
    wrapper.unmount()
  })
})
