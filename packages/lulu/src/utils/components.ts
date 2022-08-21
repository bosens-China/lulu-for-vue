import type { SetupContext, CSSProperties } from 'vue';

export const setClass = ({
  attrs,
  className,
}: {
  attrs: SetupContext['attrs'];
  className: Array<string | undefined | null | Record<string, any>>;
}) => [attrs.class, ...className].filter((f) => f);

export const setStyles = ({
  attrs,
  style,
  cover = false,
}: {
  attrs: SetupContext['attrs'];
  style: CSSProperties;
  cover?: boolean;
}) => {
  if (cover) {
    return {
      ...((attrs.style as any) || {}),
      ...style,
    };
  }
  return {
    ...style,
    ...((attrs.style as any) || {}),
  };
};
