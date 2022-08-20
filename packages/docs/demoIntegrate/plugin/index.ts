import { load, CheerioAPI } from 'cheerio';
import type { Plugin as vitePlguin } from 'vite';
import path from 'path';
import { createMarkdownRenderer } from 'vitepress';
import { transformation, reduction } from '../utils/translation';

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
      /*
       * markdown-it 会过滤掉style和script，这里先做替换，之后还原
       */

      const mdStr = render(transformation(code));

      const $ = load(reduction(mdStr), {
        xmlMode: false,
      });

      const result = [...(otherPlugIns || [])].map((fn) => {
        return fn($, { dir, render });
      });
      await Promise.all(result);

      /*
       * 最后 Tags with side effect (<script> and <style>) are ignored in client component templates.
       * 返回的html结构中，不应当出现<style></style>等之类的标签，这里已经借助.vue单文件进行了处理
       * 所以无需额外的处理，简单将以上标签替换成不能使用的script即可
       */
      return transformation($('body').html() || '');
    },
  };
  return returnValue;
};

export { viteExpandPlugin };
