/*
 * 将md中不支持的script和style进行转换
 */

export const transformation = (code: string) => {
  return code
    .replace('<script', '<script_private')
    .replace('script>', 'script_private>')
    .replace('<style', '<style_private')
    .replace('style>', 'style_private>');
};
export const reduction = (code: string) => {
  return (
    code
      // 对转义符进行处理
      .replace('&lt;', '<')
      .replace('&gt;', '>')
      .replace('&amp;', '&')
      .replace('<script_private', '<script')
      .replace('script_private>', 'script>')
      .replace('<style_private', '<style')
      .replace('style_private>', 'style>')
  );
};
