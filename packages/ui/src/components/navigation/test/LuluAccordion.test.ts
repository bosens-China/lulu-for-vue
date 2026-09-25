import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluAccordion from '../LuluAccordion.vue'

const items = [
  {
    content: 'Profile settings',
    title: 'Profile',
    value: 'profile',
  },
  {
    content: 'Security settings',
    title: 'Security',
    value: 'security',
  },
]

function getDetails(wrapper: ReturnType<typeof mount>, value: string) {
  return wrapper.get<HTMLDetailsElement>(`details[data-value="${value}"]`)
}

describe('LuluAccordion', () => {
  it('uses a string v-model to keep one item open', async () => {
    const wrapper = mount(LuluAccordion, {
      props: {
        items,
        modelValue: 'profile',
      },
    })
    const profile = getDetails(wrapper, 'profile')
    const security = getDetails(wrapper, 'security')

    expect(profile.element.open).toBe(true)
    expect(security.element.open).toBe(false)

    await security.get('summary').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['security'])
  })

  it('uses an array v-model to allow multiple items to be open', async () => {
    const wrapper = mount(LuluAccordion, {
      props: {
        items,
        modelValue: ['profile'],
      },
    })
    const profile = getDetails(wrapper, 'profile')
    const security = getDetails(wrapper, 'security')

    await security.get('summary').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toContainEqual([['profile', 'security']])

    await wrapper.setProps({ modelValue: ['profile', 'security'] })
    await profile.get('summary').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toContainEqual([['security']])
  })

  it('provides scoped slots for each item summary and content', () => {
    const wrapper = mount(LuluAccordion, {
      props: {
        items,
        modelValue: '',
      },
      slots: {
        default: ({ item }: { item: { content?: string } }) => h('p', `Content: ${item.content}`),
        summary: ({ item }: { item: { title: string } }) => h('span', `Section: ${item.title}`),
      },
    })

    expect(wrapper.get('summary').text()).toBe('Section: Profile')
    expect(wrapper.get('.lulu-accordion__content').text()).toBe('Content: Profile settings')
  })
})
