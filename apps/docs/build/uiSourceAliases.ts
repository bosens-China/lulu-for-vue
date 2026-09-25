import { resolve } from 'node:path'
import packageJson from '../../../packages/ui/package.json' with { type: 'json' }

const sourceRoot = resolve(import.meta.dirname, '../../../packages/ui/src')
const styleAliases = Object.entries(packageJson.exports)
  .filter(([subpath]) => subpath.endsWith('/style.css'))
  .map(([subpath, target]) => ({
    find: `@lulu/vue/${subpath.slice(2)}`,
    replacement: resolve(sourceRoot, `styles/${String(target).split('/').at(-1)}`),
  }))

export const uiSourceAliases = [
  { find: /^@lulu\/vue$/, replacement: resolve(sourceRoot, 'index.ts') },
  { find: /^@lulu\/vue\/tokens\.css$/, replacement: resolve(sourceRoot, 'styles/tokens.css') },
  { find: /^@lulu\/vue\/base\.css$/, replacement: resolve(sourceRoot, 'styles/source-base.css') },
  { find: /^@lulu\/vue\/style\.css$/, replacement: resolve(sourceRoot, 'styles/index.css') },
  ...styleAliases,
  {
    find: /^@lulu\/vue\/([^/]+)$/,
    replacement: `${resolve(sourceRoot, 'entries')}/$1.ts`,
  },
]
