import type { App } from 'vue';
import { version } from '../package.json';
import { default as Button } from './components/button';
import { default as Progress } from './components/progress';
import { default as Loading } from './components/loading';
import { Text, Link } from './components/typography';

const install = (app: App) => {
  app.use(Button);
  app.use(Progress);
  app.use(Loading);
  app.use(Text);
  app.use(Link);
};

export default {
  install,
  version,
};
