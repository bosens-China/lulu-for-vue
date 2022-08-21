import type { App } from 'vue';
import { version } from '../package.json';
import * as components from './components';

const install = (app: App) => {
  Object.values(components).forEach((item) => {
    app.use(item);
  });
};

export default {
  install,
  version,
};

export * from './components';
