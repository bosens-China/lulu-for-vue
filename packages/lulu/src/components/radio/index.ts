import { withInstall } from '../../utils/install';
import { Radio } from './radio';
import { Group } from './group';

export * from './radio';
export * from './group';
export default withInstall(Radio, { Group });
