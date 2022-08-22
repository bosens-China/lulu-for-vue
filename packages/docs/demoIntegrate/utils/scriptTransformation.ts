import { load } from 'cheerio';
import toJs from './toJs';

export default (code: string) => {
  const $ = load(code, null, false);
  $('script').each((_index, el) => {
    $(el).removeAttr('lang');
    $(el).html(toJs($(el).html() || ''));
  });

  return $.html() || '';
};
