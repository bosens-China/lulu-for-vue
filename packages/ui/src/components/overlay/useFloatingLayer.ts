import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch, type CSSProperties, type Ref } from 'vue'

export type FloatingPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

interface FloatingLayerOptions {
  closeOnEscape: Ref<boolean>
  closeOnOutside: Ref<boolean>
  offset: Ref<number>
  onRequestClose: () => void
  open: Ref<boolean>
  panel: Ref<HTMLElement | null>
  placement: Ref<FloatingPlacement>
  trigger: Ref<HTMLElement | null>
}

interface FloatingLayerResult {
  floatingStyle: Ref<CSSProperties>
  isMounted: Ref<boolean>
  teleportTarget: Ref<HTMLElement | 'body'>
  updatePosition: () => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getPosition(
  trigger: DOMRect,
  panel: DOMRect,
  placement: FloatingPlacement,
  offset: number,
) {
  const [side, alignment] = placement.split('-') as [
    'top' | 'right' | 'bottom' | 'left',
    'start' | 'end' | undefined,
  ]
  let left = trigger.left + (trigger.width - panel.width) / 2
  let top = trigger.top + (trigger.height - panel.height) / 2

  if (side === 'top') top = trigger.top - panel.height - offset
  if (side === 'bottom') top = trigger.bottom + offset
  if (side === 'left') left = trigger.left - panel.width - offset
  if (side === 'right') left = trigger.right + offset

  if (side === 'top' || side === 'bottom') {
    if (alignment === 'start') left = trigger.left
    if (alignment === 'end') left = trigger.right - panel.width
  } else {
    if (alignment === 'start') top = trigger.top
    if (alignment === 'end') top = trigger.bottom - panel.height
  }

  return { left, top }
}

/**
 * 为已有触发器和浮层提供最小的关闭与定位能力。
 * 当 Popover、Tooltip 和 Dropdown 同时使用后再抽出，替代旧版 Follow 的全局 DOM 操作。
 */
export function useFloatingLayer(options: FloatingLayerOptions): FloatingLayerResult {
  const floatingStyle = ref<CSSProperties>({ position: 'fixed' })
  const isMounted = shallowRef(false)
  const teleportTarget = computed(() => {
    if (typeof document === 'undefined') return 'body'
    const themeRoot = options.trigger.value?.closest<HTMLElement>('[data-lulu-theme]')
    return themeRoot && themeRoot !== document.documentElement ? themeRoot : 'body'
  })
  let listening = false

  function updatePosition() {
    if (typeof window === 'undefined' || !options.trigger.value || !options.panel.value) return

    const offset = Math.max(0, options.offset.value)
    const position = getPosition(
      options.trigger.value.getBoundingClientRect(),
      options.panel.value.getBoundingClientRect(),
      options.placement.value,
      offset,
    )
    const panel = options.panel.value.getBoundingClientRect()
    const maxLeft = Math.max(offset, window.innerWidth - panel.width - offset)
    const maxTop = Math.max(offset, window.innerHeight - panel.height - offset)

    floatingStyle.value = {
      left: `${clamp(position.left, offset, maxLeft)}px`,
      position: 'fixed',
      top: `${clamp(position.top, offset, maxTop)}px`,
    }
  }

  function requestCloseForPointer(event: PointerEvent) {
    if (!options.open.value || !options.closeOnOutside.value || !(event.target instanceof Node)) return

    if (options.trigger.value?.contains(event.target) || options.panel.value?.contains(event.target)) return
    options.onRequestClose()
  }

  function requestCloseForKeyboard(event: KeyboardEvent) {
    if (options.open.value && options.closeOnEscape.value && event.key === 'Escape') {
      options.onRequestClose()
    }
  }

  function removeListeners() {
    if (typeof document === 'undefined' || !listening) return

    document.removeEventListener('pointerdown', requestCloseForPointer)
    document.removeEventListener('keydown', requestCloseForKeyboard)
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
    listening = false
  }

  async function addListeners() {
    if (typeof document === 'undefined' || !options.open.value || listening) return

    await nextTick()
    if (!options.open.value || listening) return

    updatePosition()
    document.addEventListener('pointerdown', requestCloseForPointer)
    document.addEventListener('keydown', requestCloseForKeyboard)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    listening = true
  }

  watch(
    [options.open, options.placement, options.offset],
    ([open]) => {
      if (open) void addListeners()
      else removeListeners()
    },
    { flush: 'post' },
  )

  onMounted(() => {
    isMounted.value = true
    if (options.open.value) void addListeners()
  })
  onBeforeUnmount(removeListeners)

  return { floatingStyle, isMounted, teleportTarget, updatePosition }
}
