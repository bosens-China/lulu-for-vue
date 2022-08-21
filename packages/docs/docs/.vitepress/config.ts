import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteExpandPlugin } from '../../demoIntegrate/plugin';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import demo from '../../demoIntegrate/plugin/demo';
import table from '../../demoIntegrate/plugin/table';

export default defineConfig({
  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      vueJsx(),
      viteExpandPlugin([demo(), table()]),
    ],
    optimizeDeps: {
      include: ['lulu', '.temporary'],
    },
  },
  lang: 'zh',
  title: 'lulu-for-vue',
  description: 'vue3版本的lulu ui库，基于TypeScript + tsx开发，让你享受到IDE智能提示。',
  head: [['link', { rel: 'shortcut icon', href: '/favicon.ico' }]],
  themeConfig: {
    siteTitle: 'lulu-for-vue',
    logo: '/favicon.svg',
    sidebar: [
      {
        text: '通用',
        items: [{ text: 'Typography 排版', link: '/components/typography/' }],
      },
      {
        text: '布局',
        items: [{ text: 'Space 间距', link: '/components/space/' }],
      },
      {
        text: '控件',
        items: [
          { text: 'Button 按钮', link: '/components/button/' },
          { text: 'Switch 开关', link: '/components/switch/' },
          { text: 'Progress 进度条', link: '/components/progress/' },
          { text: 'Range 范围选择', link: '/components/range/' },
          { text: 'Rate 评分', link: '/components/rate/' },
        ],
      },
      {
        text: '组件',
        items: [{ text: 'Loading 加载中', link: '/components/loading/' }],
      },
    ],
  },
});
