import { defineComponent, h, isVNode, onBeforeUnmount, onMounted, onUpdated, shallowRef, type ButtonHTMLAttributes, type PropType, type VNode } from 'vue'

export interface FloatingTriggerProps extends ButtonHTMLAttributes {
  id: string
  disabled: boolean
}

function hasBoundTrigger(nodes: VNode[], id: string): boolean {
  return nodes.some((node) => node.props?.id === id
    || (Array.isArray(node.children) && hasBoundTrigger(node.children.filter(isVNode), id)))
}

/** 旧插槽继续提供按钮内容；绑定 triggerProps 时由使用者提供真实触发元素。 */
export default defineComponent({
  name: 'FloatingTrigger',
  props: {
    triggerProps: { type: Object as PropType<FloatingTriggerProps>, required: true },
    label: { type: String, required: true },
  },
  emits: {
    element: (element: HTMLElement | null) => element === null || element instanceof HTMLElement,
  },
  setup(props, { emit, slots }) {
    const container = shallowRef<HTMLElement | null>(null)
    function syncElement() {
      const element = Array.from(container.value?.querySelectorAll<HTMLElement>('[id]') ?? [])
        .find(element => element.id === props.triggerProps.id)
      emit('element', element ?? null)
    }
    onMounted(syncElement)
    onUpdated(syncElement)
    onBeforeUnmount(() => emit('element', null))

    return () => {
      const content = slots.default?.({ triggerProps: props.triggerProps })
      const custom = content && hasBoundTrigger(content, props.triggerProps.id)
      return h('span', { ref: container, class: 'lulu-floating-trigger' },
        custom ? content : h('button', props.triggerProps, content ?? props.label))
    }
  },
})
