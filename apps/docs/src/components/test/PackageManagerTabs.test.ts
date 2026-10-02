import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PackageManagerTabs from '../PackageManagerTabs.vue'

describe('PackageManagerTabs', () => {
  it('切换并展示对应安装命令', async () => {
    const wrapper = mount(PackageManagerTabs, { props: { packageName: '@lulu/vue' } })

    expect(wrapper.get('[role="tabpanel"]:not([hidden]) code').text()).toBe('pnpm add @lulu/vue')
    await wrapper.get('[role="tab"][aria-selected="false"]').trigger('click')

    expect(wrapper.get('[role="tabpanel"]:not([hidden]) code').text()).toBe('npm install @lulu/vue')
    expect(wrapper.get('[role="tabpanel"]:not([hidden]) [data-docs-copy]').attributes('aria-label')).toBe('复制代码')
  })
})
