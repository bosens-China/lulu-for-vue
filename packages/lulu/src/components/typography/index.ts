import { withInstall } from '../../utils/install';
import { Link as Linkprivate } from './link';
import { Text as Textprivate } from './text';

export const Link = withInstall(Linkprivate);
export const Text = withInstall(Textprivate);

export * from './text';
export * from './link';
