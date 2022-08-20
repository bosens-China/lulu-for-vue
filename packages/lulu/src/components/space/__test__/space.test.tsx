import { mount } from '@vue/test-utils';
import { Space } from '../space';

test(`horizontal`, () => {
  const vm = mount({
    render() {
      return (
        <Space>
          hello wrold
          <span>hello</span>
        </Space>
      );
    },
  });

  expect(vm.classes()).toEqual(
    expect.arrayContaining(['ul-space', 'ul-space-horizontal', 'ul-space-align-center']),
  );
  expect(window.getComputedStyle(vm.element).gap).toBe('8px');
  const result = vm.findAll('.ul-space-item');
  expect(result).toHaveLength(2);
  expect(result.every((f) => f.classes().includes('ul-space-item'))).toBeTruthy();
  expect(result[0]?.text()).toBe('hello wrold');
  expect(result[1]?.text()).toBe('hello');
});

test('vertical', () => {
  const vm = mount({
    render() {
      return (
        <Space direction={'vertical'}>
          hello
          <div>world</div>
        </Space>
      );
    },
  });
  expect(vm.classes()).toEqual(expect.arrayContaining(['ul-space', 'ul-space-vertical']));
  expect(window.getComputedStyle(vm.element).gap).toBe('8px');
});

test('split', () => {
  const vm = mount({
    render() {
      const slots = {
        split: () => 1,
      };
      return (
        <Space direction={'vertical'} v-slots={slots}>
          hello
          <div>world</div>
        </Space>
      );
    },
  });

  const split = vm.findAll('.ul-space-item-split');
  expect(split).toHaveLength(1);
  expect(vm.findAll('.ul-space-item')).toHaveLength(2);
  expect(split[0]?.text()).toBe('1');
});

test('set Props', async () => {
  const vm = mount({
    render() {
      return (
        <Space direction={'vertical'}>
          hello
          <div>world</div>
        </Space>
      );
    },
  });
  await vm.setProps({
    align: 'start',
    direction: 'horizontal',
    size: [20, 10],
    wrap: true,
  });
  expect(vm.classes()).not.toContain('ul-space-vertical');
  expect(vm.classes()).toEqual(
    expect.arrayContaining(['ul-space-horizontal', 'ul-space-align-start']),
  );
  expect(window.getComputedStyle(vm.element)).toMatchObject({
    gap: '20px 10px',
    'flex-wrap': 'wrap',
  });
});
