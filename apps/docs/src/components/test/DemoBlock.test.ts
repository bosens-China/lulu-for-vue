import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DemoBlock from '../DemoBlock.vue'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('DemoBlock', () => {
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
