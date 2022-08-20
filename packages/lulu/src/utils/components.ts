import type { SetupContext, CSSProperties } from 'vue';

export const setClass = ({
  attrs,
  className,
}: {
  attrs: SetupContext['attrs'];
  className: Array<string | undefined | null>;
}) => [attrs.class, ...className].filter((f) => f);

export const setStyles = ({
  attrs,
  style,
}: {
  attrs: SetupContext['attrs'];
  style: CSSProperties;
}) => ({
  ...style,
  ...((attrs.style as any) || {}),
});
