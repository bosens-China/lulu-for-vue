import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DemoBlock from '../DemoBlock.vue'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('DemoBlock', () => {
  it('高亮 Vue 中的 TypeScript、模板和样式，同时保留源码文本', () => {
    const source = `<script setup lang="ts">\nimport { ref } from 'vue'\nconst open = ref<boolean>(false)\n</script>\n<template><button>打开</button></template>\n<style>button { color: red; }</style>`
    const wrapper = mount(DemoBlock, {
      props: { source, sourceLabel: '查看源码', copyLabel: '复制', copiedLabel: '已复制' },
    })
    expect(wrapper.get('code').text()).toBe(source)
    expect(wrapper.get('.language-typescript .token.keyword').text()).toBe('import')
    expect(wrapper.get('.language-typescript .token.boolean').text()).toBe('false')
    expect(wrapper.findAll('.token.tag').length).toBeGreaterThan(0)
    expect(wrapper.get('.language-css .token.property').text()).toBe('color')
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
  })
})
