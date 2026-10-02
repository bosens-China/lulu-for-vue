import { afterEach, describe, expect, it, vi } from 'vitest'
import { installCodeCopy } from '../codeCopy'

afterEach(() => {
  document.body.replaceChildren()
  vi.unstubAllGlobals()
})

describe('普通代码块复制', () => {
  it('复制代码文本并反馈成功状态', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    document.body.innerHTML = '<div class="docs-code-block"><button data-docs-copy data-copy-text="复制代码" data-copied-text="已复制">复制代码</button><pre><code>&lt;LuluButton /&gt;</code></pre></div>'
    const cleanup = installCodeCopy()
    const button = document.querySelector<HTMLButtonElement>('[data-docs-copy]')!

    button.click()
    await Promise.resolve()

    expect(writeText).toHaveBeenCalledWith('<LuluButton />')
    expect(button.textContent).toBe('已复制')
    cleanup()
  })
})
