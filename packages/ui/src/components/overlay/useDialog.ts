import { inject, onScopeDispose } from 'vue'
import type { InjectionKey, VNodeChild } from 'vue'

export interface DialogOptions {
  title: string
  content: string | (() => VNodeChild)
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

export interface DialogConfirmOptions extends DialogOptions {
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | false | Promise<void | false>
}

export interface DialogHandle {
  close: () => void
  closed: Promise<void>
}

export interface DialogApi {
  open: (options: DialogOptions) => DialogHandle
  confirm: (options: DialogConfirmOptions) => Promise<boolean>
  alert: (options: DialogConfirmOptions) => Promise<void>
}

export type DialogMode = 'open' | 'confirm' | 'alert'
export interface DialogRequest {
  close: () => void
  result: Promise<boolean>
}
export const dialogKey: InjectionKey<(options: DialogConfirmOptions, mode: DialogMode) => DialogRequest> = Symbol('lulu-dialog')

/** 在调用方作用域内管理实例，避免路由卸载后留下弹窗和未结束的等待。 */
export function useDialog(): DialogApi {
  const create = inject(dialogKey)
  if (!create) throw new Error('useDialog() must be used inside LuluDialogHost.')

  const requests = new Set<DialogRequest>()
  let disposed = false
  onScopeDispose(() => {
    disposed = true
    for (const request of requests) request.close()
    requests.clear()
  })

  function request(options: DialogConfirmOptions, mode: DialogMode) {
    if (disposed) throw new Error('useDialog() scope has been disposed.')
    const entry = create!(options, mode)
    requests.add(entry)
    void entry.result.then(() => requests.delete(entry))
    return entry
  }

  return {
    open(options) {
      const entry = request(options, 'open')
      return { close: entry.close, closed: entry.result.then(() => {}) }
    },
    confirm: (options) => request(options, 'confirm').result,
    alert: (options) => request(options, 'alert').result.then(() => {}),
  }
}
