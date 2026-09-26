import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DocFooterNav from '../DocFooterNav.vue'

it('按指南和组件配置的统一顺序渲染前后页', async () => {
  const wrapper = mount(DocFooterNav, { props: { currentPath: '/guide/installation/' } })
  expect(wrapper.findAll('a').map(link => link.attributes('href'))).toEqual(['/guide/quick-start/'])

  await wrapper.setProps({ currentPath: '/guide/on-demand/' })
  expect(wrapper.findAll('a').map(link => link.attributes('href'))).toEqual([
    '/guide/theme/',
    '/components/button/',
  ])
})
