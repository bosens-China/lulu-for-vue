import type { ExtractPropTypes, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T, E extends Record<string, any>>(obj: T, extra?: E) => {
  const main = obj;
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};

export type GetProps<T extends () => any> = Partial<ExtractPropTypes<ReturnType<T>>>;
