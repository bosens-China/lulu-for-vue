import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

const docsDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const outputDirectory = resolve(docsDirectory, 'dist')

describe('文档 SSG 产物', () => {
  it('公共入口不提前加载首页、主题编辑器和示例高亮引擎', async () => {
    const html = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
    const entry = html.match(/<script[^>]*src="([^"]+\.js)"/)?.[1]
    expect(entry).toBeTruthy()
    const visited = new Set<string>()
    async function visit(file: string): Promise<void> {
      if (visited.has(file)) return
      visited.add(file)
      const code = await readFile(file, 'utf8')
      const ast = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.JS)
      for (const statement of ast.statements) {
        if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
          await visit(resolve(dirname(file), statement.moduleSpecifier.text))
        }
      }
    }
    await visit(resolve(outputDirectory, entry!.slice(1)))
    expect([...visited].some(file => /(?:HomePage|ThemePlayground|prism)-[^/\\]+\.js$/.test(file))).toBe(false)
    const assets = await readdir(resolve(outputDirectory, 'assets'))
    for (const name of ['HomePage', 'ThemePlayground', 'prism']) {
      expect(assets.some(file => file.startsWith(`${name}-`) && file.endsWith('.js'))).toBe(true)
    }
  })

  it('折叠源码静态输出纯文本，保留无 JavaScript 时的阅读能力', async () => {
    const html = await readFile(resolve(outputDirectory, 'components/button/index.html'), 'utf8')
    const sources = [...html.matchAll(/<code class="language-vue">([\s\S]*?)<\/code>/g)]
    expect(sources.length).toBeGreaterThan(0)
    expect(sources.some(match => match[1]!.includes('LuluButton'))).toBe(true)
    expect(sources.every(match => !match[1]!.includes('<span'))).toBe(true)
  })

  it('所有静态页面引用的样式和预加载资源均存在', async () => {
    const files = await readdir(outputDirectory, { recursive: true })
    for (const file of files.filter(path => path.endsWith('.html'))) {
      const html = await readFile(resolve(outputDirectory, file), 'utf8')
      const head = html.slice(0, html.indexOf('</head>'))
      const links = [...head.matchAll(/<link\b[^>]*>/g)]
        .map(match => match[0]).filter(link => /rel="(?:stylesheet|modulepreload)"/.test(link))
      expect(links.some(link => link.includes('rel="stylesheet"')), file).toBe(true)
      expect(new Set(links).size, file).toBe(links.length)
      for (const link of links) {
        const href = link.match(/href="([^"]+)"/)?.[1]
        expect(href, file).toMatch(/^\/assets\//)
        await access(resolve(outputDirectory, href!.slice(1)))
      }
    }
  })

  it('按路由拆分后，静态页仍提前包含当前组件的 CSS', async () => {
    const html = await readFile(resolve(outputDirectory, 'components/slider/index.html'), 'utf8')
    const styles = [...html.matchAll(/<link\b[^>]*>/g)]
      .map(match => match[0]).filter(link => link.includes('rel="stylesheet"'))
      .map(link => link.match(/href="([^"]+)"/)![1]!)
    const css = await Promise.all(styles.map(path => readFile(resolve(outputDirectory, path.slice(1)), 'utf8')))
    expect(css.join('\n')).toContain('.lulu-slider')
  })

  it('主题指南静态输出完整全局 Token 清单与明暗默认值', async () => {
    const html = await readFile(resolve(outputDirectory, 'guide/theme/index.html'), 'utf8')
    expect(html).toContain('共 41 个公开全局变量')
    expect(html).toContain('颜色全局变量')
    expect(html).toContain('尺寸与间距全局变量')
    expect(html).toContain('--lulu-font-family')
    expect(html).toContain('--lulu-z-index-message')
    expect(html).toContain('--lulu-shadow-focus')
    expect(html).toContain('#38bdf8')
    expect(html).not.toContain('<GlobalTokenTable')
  })
  it('保留可键盘访问的原生表格，并将全局 Token 放入默认折叠的说明', async () => {
    const html = await readFile(resolve(outputDirectory, 'components/button/index.html'), 'utf8')
    const globalTokens = html.match(/<details class="docs-token-details">([\s\S]*?)<\/details>/)?.[1]
    expect(globalTokens).toContain('<summary>全局基础变量</summary>')
    expect(globalTokens).toContain('--lulu-color-primary')
    expect(globalTokens).not.toContain('--lulu-button-height')
    expect(html).toContain('--lulu-button-height')
    const tableCount = [...html.matchAll(/<table>/g)].length
    expect(tableCount).toBe(4)
    expect([...html.matchAll(/role="region" aria-label="文档表格" tabindex="0"/g)]).toHaveLength(tableCount)
  })

  it('把根路径和全部组件页输出为完整静态 HTML', async () => {
    const rootHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
    const componentFiles = await readdir(resolve(outputDirectory, 'components'), { recursive: true })
    const componentPages = componentFiles.filter((file) => file.endsWith('index.html'))

    expect(componentPages).toHaveLength(32)
    expect(rootHtml).toContain('<html lang="zh-CN">')
    expect(rootHtml).toContain('<title>LuLu UI Vue - 简洁、可靠的 Vue 3 组件库</title>')
    expect(rootHtml).toContain('浏览全部组件')
    expect(rootHtml).not.toContain('<aside')
    expect(rootHtml).not.toContain('<!--app-html-->')
    const cssFiles = [...rootHtml.matchAll(/href="\/assets\/([^" ]+\.css)"/g)].map(match => match[1]!)
    expect(cssFiles.length).toBeGreaterThan(0)
    const css = await Promise.all(cssFiles.map(file => readFile(resolve(outputDirectory, 'assets', file), 'utf8')))
    expect(css.join('\n')).toMatch(/\.flex\{display:flex\}/)
    const guideHtml = await readFile(resolve(outputDirectory, 'guide/quick-start/index.html'), 'utf8')
    expect(guideHtml).toContain('快速开始')
    expect(guideHtml).toContain('class="token tag"')
    const notFoundHtml = await readFile(resolve(outputDirectory, '404.html'), 'utf8')
    expect(notFoundHtml).toContain('页面不存在')
    expect(notFoundHtml).toContain('返回首页')
    expect(notFoundHtml).toContain('href="/"')
    expect(notFoundHtml).not.toContain('<!--app-html-->')
    const llms = await readFile(resolve(outputDirectory, 'llms.txt'), 'utf8')
    expect(llms).toContain('# LuLu UI Vue')
    expect(llms).toContain('/guide/installation/index.md')
    const installationMarkdown = await readFile(
      resolve(outputDirectory, 'guide/installation/index.md'),
      'utf8',
    )
    expect(installationMarkdown).toContain('# 安装')
    await expect(access(resolve(outputDirectory, '.vite'))).rejects.toThrow()
  })

  it('输出可安全 hydration 的 Autocomplete 页面', async () => {
    const html = await readFile(
      resolve(outputDirectory, 'components/autocomplete/index.html'),
      'utf8',
    )

    expect(html).toContain('placeholder="输入城市"')
    expect(html).toContain('输入内容后可用键盘或鼠标选择候选项。')
    expect(html).not.toContain('<!--app-html-->')
    // 全局消息宿主会保留空标记；候选浮层在服务端不能输出内容。
    expect(html.replaceAll('<!--teleport start--><!----><!--teleport end-->', '')).not.toContain('<!--teleport start-->')
    expect(html).not.toContain('role="listbox"')
  })
})
