import { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import lulu from '@boses/lulu';
import '@boses/lulu/src/styles';
import demo from '../../../demoIntegrate/components/demo/index.vue';
import table from '../../../demoIntegrate/components/table/index.vue';
// import antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(antd);
    app.use(lulu);
    app.component('Demo', demo);
    app.component('DemoTable', table);
  },
} as Theme;
