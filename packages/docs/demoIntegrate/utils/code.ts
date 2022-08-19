import { Base64 } from 'js-base64';

export const encode = (code: string | Record<string, any>) =>
  Base64.encode(typeof code === 'string' ? code : JSON.stringify(code));

export const decode = (code: string, options?: { json?: boolean }): string => {
  const { json } = options || {};

  if (!json) {
    return Base64.decode(code);
  }
  try {
    return JSON.parse(Base64.decode(code));
  } catch {
    return '';
  }
};
