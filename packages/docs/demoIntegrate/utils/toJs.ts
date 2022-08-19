// 将vue模板中的defineComponent内容转译成javaScript

import { transformSync } from '@babel/core';

export default (content: string) => {
  const { code } = transformSync(content || '', {
    configFile: false,
    plugins: [
      [
        require.resolve('@babel/plugin-transform-typescript'),
        {
          isTSX: false,
        },
      ],
    ],
  }) || { code: '' };
  return code || '';
};
