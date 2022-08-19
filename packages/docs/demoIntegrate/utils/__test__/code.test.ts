import base64 from 'js-base64';
import { encode, decode } from '../code';

test(`encode not object`, () => {
  expect(encode(`test 123`)).toBe(base64.encode('test 123'));
});

test('encode object', () => {
  const base = { hello: 123 };
  expect(encode(base)).toEqual(base64.encode(JSON.stringify(base)));
});

test(`decode not object`, () => {
  const code = base64.encode('test 123');
  expect(decode(code)).toBe('test 123');
});

test('decode object', () => {
  const base = { hello: 123 };
  const code = base64.encode(JSON.stringify(base));
  expect(decode(code, { json: true })).toEqual(base);
});
