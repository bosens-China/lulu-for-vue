import { mount } from '@vue/test-utils';
import { Progress } from '../progress';

test('base status', () => {
  const vm = mount({
    render() {
      return <Progress block />;
    },
  });
  expect(vm.classes()).toContain('ui-progress');
  expect(vm.attributes('max')).toBe('100');
  expect(vm.attributes('value')).toBe('0');
  expect(window.getComputedStyle(vm.element).width).toBe('100%');
});

test('v-model', async () => {
  const vm = mount({
    data() {
      return {
        value: 0,
      };
    },
    render() {
      return <Progress value={this.value} max={50} />;
    },
  });
  await vm.setData({
    value: 20,
  });
  expect(vm.attributes('value')).toBe('20');
  expect(vm.attributes('max')).toBe('50');
});
