import { withInstall } from '../../utils/install';
import { Loading } from './loading';
import { Dot } from './dot';

export default withInstall(Loading, {
  Dot,
});

export * from './loading';
export * from './dot';
