import path from 'path';
import fs from 'fs-extra';
import type { Plugin } from './index';
import { encode } from '../utils/code';
import scriptTransformation from '../utils/scriptTransformation';
import md5 from '../utils/md5';

const ROUTE = path.join(__dirname, '../.temporary');
fs.removeSync(ROUTE);

const demo = (): Plugin => {
  return ($, { dir, render }) => {
    const all = $('demo');
    Array.from(all)
      .filter((f) => {
        const { length } = $(f).children();
        const attr = $(f).attr() || {};
        let { src, describe } = attr;
        let filePath = path.join(dir, src || '');
        // 如果都不存在跳过处理
        if (!length && !src) {
          return true;
        }
        // 如果是chilren
        if (length) {
          const sourceCode = $(f).html() || '';
          const temporaryPath = path.join(ROUTE, `v${md5(sourceCode)}.vue`);
          src = path.relative(filePath, temporaryPath).replace(/\\/g, '/');
          filePath = temporaryPath;
          fs.outputFileSync(temporaryPath, sourceCode);
        }
        const fileCode = (src ? fs.readFileSync(filePath, 'utf-8') : $(f).html()) || '';
        const { ext } = path.parse(filePath);

        const sourceCode = fileCode;
        const sourceCodeJs = scriptTransformation(fileCode);
        let code = '';
        let codeJs = '';

        try {
          code = render(`\`\`\`${ext.slice(1)}\n${sourceCode}\n\`\`\``);
          codeJs = render(`\`\`\`${ext.slice(1)}\n${sourceCodeJs}\n\`\`\``);
        } catch {
          code = render(`\`\`\`vue\n${sourceCode}\n\`\`\``);
          codeJs = render(`\`\`\`vue\n${sourceCodeJs}\n\`\`\``);
        }

        $(f)
          .removeAttr('src')
          .attr(':src', `import('${src}')`)
          .attr('sourceCode', encode(sourceCode))
          .attr('sourceCodeJs', encode(sourceCodeJs))
          .attr('code', encode(code))
          .attr('codeJs', encode(codeJs))
          .attr('fileName', encode(src || ''));
        if (!length) {
          $(f).attr('SFC', '');
        }
        if (describe) {
          $(f).attr('describe', render(describe));
        }
        return false;
      })
      // 删除不存在children和src属性的文件
      .forEach((e) => {
        $(e).remove();
      });
  };
};

export default demo;
