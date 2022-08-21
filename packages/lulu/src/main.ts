import type { App } from 'vue';
import { version } from '../package.json';
import { default as Button } from './components/button';
import { default as Progress } from './components/progress';
import { default as Loading } from './components/loading';
import { Text, Link } from './components/typography';
import { default as Space } from './components/space';
import { default as Switch } from './components/switch';
import { default as Range } from './components/range';
import { default as Rate } from './components/rate';

const install = (app: App) => {
  app.use(Button);
  app.use(Progress);
  app.use(Loading);
  app.use(Text);
  app.use(Link);
  app.use(Space);
  app.use(Switch);
  app.use(Range);
  app.use(Rate);
};

export default {
  install,
  version,
};
