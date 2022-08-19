import { load } from 'cheerio';
import toJs from './toJs';

export default (code: string) => {
  const $ = load(`<div id="_code">${code}</div>`);
  $('script').each((_index, el) => {
    $(el).removeAttr('lang');
    $(el).html(toJs($(el).html() || ''));
  });

  return $('#_code').html() || '';
};
