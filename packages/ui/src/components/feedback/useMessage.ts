import { inject } from 'vue'
import type { InjectionKey } from 'vue'

export type MessageType = 'success' | 'error' | 'info' | 'warning'

export interface MessageOptions {
  duration?: number
}

export interface MessageConfig extends MessageOptions {
  type?: MessageType
}

export interface MessageEntry {
  id: number
  message: string
  type: MessageType
  duration: number
}

export interface MessageHandle {
  close: () => void
}

export interface MessageApi {
  show: (message: string, options?: MessageConfig) => MessageHandle
  success: (message: string, options?: MessageOptions) => MessageHandle
  error: (message: string, options?: MessageOptions) => MessageHandle
  info: (message: string, options?: MessageOptions) => MessageHandle
  warning: (message: string, options?: MessageOptions) => MessageHandle
}

export const messageKey: InjectionKey<MessageApi> = Symbol('lulu-message')

export function useMessage(): MessageApi {
  const message = inject(messageKey)

  if (!message) {
    throw new Error('useMessage() must be used inside LuluMessageHost.')
  }

  return message
}
