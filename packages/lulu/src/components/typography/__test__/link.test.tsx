import { Link } from '../link';
import { mount } from '@vue/test-utils';

test(`base`, () => {
  const vm = mount({
    render() {
      return <Link href="test">hello</Link>;
    },
  });
  expect(vm.classes()).toEqual([]);
  expect(vm.text()).toBe('hello');
  expect(vm.attributes('href')).toBe('test');
});

test(`set type`, async () => {
  const vm = mount({
    data() {
      return {
        type: 'dark' as any,
      };
    },
    render() {
      return <Link type={this.type}>hello</Link>;
    },
  });
  await vm.setData({
    type: 'red',
  });
  expect(vm.classes()).toContain('red');
});
