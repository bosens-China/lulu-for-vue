import { Text } from '../text';
import { mount } from '@vue/test-utils';

test(`base`, () => {
  const vm = mount({
    render() {
      return <Text block>hello</Text>;
    },
  });
  expect(vm.classes()).toContain('dark');
  expect(vm.text()).toBe('hello');
  expect(window.getComputedStyle(vm.element).display).toBe('block');
});

test(`set type`, async () => {
  const vm = mount({
    data() {
      return {
        type: 'dark' as any,
      };
    },
    render() {
      return <Text type={this.type}>hello</Text>;
    },
  });
  await vm.setData({
    type: 'red',
  });
  expect(vm.classes()).toContain('red');
});
