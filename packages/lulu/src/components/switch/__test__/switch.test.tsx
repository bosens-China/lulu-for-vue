import { mount } from '@vue/test-utils';
import { Switch } from '../switch';

test('base', () => {
  const vm = mount({
    components: {
      Switch,
    },
    template: `<Switch></Switch>`,
  });
  expect(vm.classes()).toEqual([]);
  expect(vm.attributes('is')).toBe('ui-switch');
  expect(vm.attributes('type')).toBe('checkbox');
});

test(`v-model`, async () => {
  const vm = mount({
    components: {
      Switch,
    },
    template: `<Switch v-model="value"></Switch>`,
    data: () => ({ value: true }),
  });
  const el = vm.element as HTMLInputElement;
  expect(el.checked).toBeTruthy();
  await vm.setData({ value: false });
  expect(el.checked).toBeFalsy();
});

test(`disabled`, async () => {
  const fn = jest.fn();
  const vm = mount({
    components: {
      Switch,
    },
    template: `<Switch @change="fn" :disabled="disabled"></Switch>`,
    data: () => ({ disabled: false, fn }),
  });
  const el = vm.element as HTMLInputElement;
  expect(el.disabled).toBeFalsy();
  await vm.setData({
    disabled: true,
  });
  expect(el.disabled).toBeTruthy();
  vm.trigger('change');
  expect(fn.mock.calls).toHaveLength(0);
  await vm.setData({
    disabled: false,
  });
  vm.trigger('change');
  expect(fn.mock.calls).toHaveLength(1);
  expect(fn.mock.calls[0][0] instanceof Event).toBeTruthy();
});

test(`Property value binding test`, async () => {
  const vm = mount({
    components: {
      Switch,
    },
    template: `<Switch v-model="value"></Switch>`,
    data: () => ({ value: true }),
  });
  const el = vm.element as HTMLInputElement;
  expect(el.checked).toBeTruthy();
  await vm.trigger('change');
  expect(el.checked).toBeTruthy();
});
test(`Property value: false`, async () => {
  const vm = mount({
    components: {
      Switch,
    },
    template: `<Switch v-model="value"></Switch>`,
    data: () => ({ value: false }),
  });
  const el = vm.element as HTMLInputElement;
  expect(el.checked).toBeFalsy();
  await vm.trigger('change');
  expect(el.checked).toBeFalsy();
});
