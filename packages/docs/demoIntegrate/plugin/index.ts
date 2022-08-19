import { load, CheerioAPI } from 'cheerio';
import type { Plugin as vitePlguin } from 'vite';
import path from 'path';
import { createMarkdownRenderer } from 'vitepress';

export interface Ctx {
  dir: string;
  render(md: string): string;
}

export type Plugin = ($: CheerioAPI, ctx: Ctx) => Promise<void> | void;

/*
 * 这里返回any是因为vite的plguin推导有问题
 */
const viteExpandPlugin = (otherPlugIns?: Array<Plugin>): any => {
  const returnValue: vitePlguin = {
    name: 'vite-expand-plugin',
    enforce: 'pre',

    async transform(code: string, id: string) {
      if (!id.endsWith('.md')) {
        return code;
      }

      const { filename } = this as any;
      const dir = path.dirname(filename);
      const { render } = (await createMarkdownRenderer(dir)) as any;

      const $ = load(render(code));

      const result = [...(otherPlugIns || [])].map((fn) => {
        return fn($, { dir, render });
      });
      await Promise.all(result);

      return $('body').html();
    },
  };
  return returnValue;
};

export { viteExpandPlugin };
