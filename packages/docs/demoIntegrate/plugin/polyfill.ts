import { load } from 'cheerio';
import { transformation, reduction } from '../utils/translation';

export default (code: string, render: (code: string) => string) => {
  const $ = load(code, null, false);
  const map = new Map<string, string>();
  let _id = 0;
  $('demo')
    .filter((_i, el) => !!$(el).children().length)
    .each((_i, el) => {
      const id = `demo_${_id++}`;
      $(el).attr('id', id);
      map.set(id, $(el).html() || '');
    });
  /*
   * markdown-it 会过滤掉style和script，同时还会对demo代码块的元素做格式化等操作
   * 所以这里先将demo的children记录，之后将script和style的内容变更下，最后进行还原
   */
  const mdStr = render(transformation($.html()));
  const html$ = load(reduction(mdStr), null, false);

  // 还原
  for (const [key, value] of map) {
    html$(`#${key}`).html(value).removeAttr('id');
  }

  return html$;
};
