import { Radio } from '../radio';
import { mount } from '@vue/test-utils';

test(`base`, () => {
  const vm = mount({
    render() {
      return <Radio>hello</Radio>;
    },
  });
  expect(vm.text()).toBe('hello');
  expect(vm.attributes());
  expect(vm.find('input').attributes()).toMatchObject({
    type: 'radio',
    is: 'ui-radio',
  });
  expect(vm.classes()).toContain('ui-radio-root');
});

test(`model`, async () => {
  const vm = mount({
    render() {
      return <Radio v-model={this.value}></Radio>;
    },
    data: () => ({ value: true }),
  });
  const el = vm.find('input').element as HTMLInputElement;
  expect(el.checked).toBeTruthy();
  await vm.setData({ value: false });
  expect(el.checked).toBeFalsy();
});

test(`disabled`, async () => {
  const fn = jest.fn();
  const vm = mount({
    data() {
      return { disabled: true };
    },
    render() {
      return <Radio onChange={fn} disabled={this.disabled}></Radio>;
    },
  });

  expect(vm.find('input').attributes('disabled')).toBe('');
  await vm.find('input').trigger('change');
  expect(fn.mock.calls).toHaveLength(0);
  await vm.setData({
    disabled: false,
  });
  await vm.find('input').trigger('change');
  expect(fn.mock.calls).toHaveLength(1);
});
