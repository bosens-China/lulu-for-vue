import type { App } from 'vue';
import { version } from '../package.json';
import { default as Button } from './components/button';
import { default as Progress } from './components/progress';
import { default as Loading } from './components/loading';

const install = (app: App) => {
  app.use(Button);
  app.use(Progress);
  app.use(Loading);
};

export default {
  install,
  version,
};
