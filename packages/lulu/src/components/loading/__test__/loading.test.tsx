import { mount } from '@vue/test-utils';
import { Loading } from '../loading';
import { Dot } from '../dot';

test('default', () => {
  const vm = mount({
    render() {
      return <Loading />;
    },
  });
  expect(vm.classes()).toContain('ui-loading');
  expect(vm.attributes('rows')).toBe('1');
  expect(vm.attributes('size')).toBe('2');
});

test('modelValue false', () => {
  const vm = mount({
    render() {
      return <Loading visible={false} />;
    },
  });
  expect(vm.html()).toBeFalsy();
});

test('color', async () => {
  const vm = mount({
    render() {
      return <Loading />;
    },
  });
  await vm.setProps({
    color: '#fff',
  });
  expect(((vm.element as any).style as CSSStyleDeclaration).getPropertyValue('--color')).toBe(
    '#fff',
  );
});

test('Dot base', () => {
  const vm = mount({
    render() {
      return <Dot describe="test">hello</Dot>;
    },
  });
  expect(vm.html()).toContain('test');
  const span = vm.find('span');
  expect(span.attributes('is-dot')).not.toBeUndefined();
});

test('Dot default', () => {
  const vm = mount({
    render() {
      return <Dot />;
    },
  });
  expect(vm.html()).toContain('正在加载中');
});
