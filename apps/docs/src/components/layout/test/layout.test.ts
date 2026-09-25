import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DocsContent from '../DocsContent.vue'
import DocsHeader from '../DocsHeader.vue'
import DocsLayout from '../DocsLayout.vue'
import DocsSider from '../DocsSider.vue'

describe('Docs App Builtin Layout Components', () => {
  it('renders DocsLayout with default flex-col', () => {
    const wrapper = mount(DocsLayout, {
      slots: {
        default: 'Layout Content',
      },
    })
    expect(wrapper.classes()).toContain('docs-layout')
    expect(wrapper.classes()).toContain('flex-col')
    expect(wrapper.text()).toBe('Layout Content')
  })

  it('renders DocsLayout with flex-row when containing DocsSider', async () => {
    const wrapper = mount({
      components: { DocsLayout, DocsSider, DocsContent },
      template: `
        <DocsLayout>
          <DocsSider>Sider</DocsSider>
          <DocsContent>Content</DocsContent>
        </DocsLayout>
      `,
    })

    await nextTick()
    const layout = wrapper.findComponent(DocsLayout)
    expect(layout.classes()).toContain('flex-row')
  })

  it('supports Sider collapsible toggle', async () => {
    const wrapper = mount(DocsSider, {
      props: {
        collapsible: true,
        width: '240px',
        collapsedWidth: '60px',
      },
      slots: {
        default: ({ collapsed }: { collapsed: boolean }) => (collapsed ? 'Collapsed' : 'Expanded'),
      },
    })

    expect(wrapper.attributes('style')).toContain('width: 240px;')
    expect(wrapper.text()).toContain('Expanded')

    const trigger = wrapper.find('.cursor-pointer')
    await trigger.trigger('click')

    expect(wrapper.emitted('update:collapsed')).toEqual([[true]])
    expect(wrapper.attributes('style')).toContain('width: 60px;')
  })

  it('renders Header and Content slots correctly', () => {
    const headerWrapper = mount(DocsHeader, {
      slots: { default: 'Header Text' },
    })
    expect(headerWrapper.classes()).toContain('docs-header')
    expect(headerWrapper.text()).toBe('Header Text')

    const contentWrapper = mount(DocsContent, {
      slots: { default: 'Main Content' },
    })
    expect(contentWrapper.classes()).toContain('docs-content')
    expect(contentWrapper.text()).toBe('Main Content')
  })
})
