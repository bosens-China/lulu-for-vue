import { Radio } from '../radio';
import { mount } from '@vue/test-utils';
import { Group } from '../group';

test(`base`, () => {
  const vm = mount(Group);
  expect(vm.classes()).toContain('ui-radio-group');
  expect(vm.text()).toBe('');
});

test(`children`, async () => {
  const vm = mount({
    render() {
      return (
        <Group>
          <Radio>a</Radio>
          <Radio>b</Radio>
        </Group>
      );
    },
  });
  const inps = vm.findAll('input');
  expect(inps).toHaveLength(2);

  expect(
    inps.every((f) => {
      return f.attributes('name').includes('radio_');
    }),
  ).toBeTruthy();
  await vm.setProps({
    disabled: true,
  });
  expect(
    inps.every((f) => {
      return f.attributes('disabled') === '';
    }),
  ).toBeTruthy();

  await vm.setProps({ name: 'hello' });
  expect(
    inps.every((f) => {
      return f.attributes('name') === 'hello';
    }),
  ).toBeTruthy();
  await vm.setProps({
    options: [1, 2, 3, 4],
  });
  expect(vm.findAll('input')).toHaveLength(4);
});

test(`v-model`, async () => {
  const vm = mount({
    data() {
      return {
        value: 1,
      };
    },
    render() {
      return (
        <Group v-model={this.value}>
          <Radio value={1}>a</Radio>
          <Radio value={2}>b</Radio>
        </Group>
      );
    },
  });

  expect(vm.find('input').element.checked).toBeTruthy();
  await vm.setData({
    value: 2,
  });
  expect(vm.findAll('input')[0]?.element.checked).toBeFalsy();
  expect(vm.findAll('input')[1]?.element.checked).toBeTruthy();
});

test(`defaultValue`, async () => {
  const vm = mount({
    data() {
      return {
        value: 1,
      };
    },

    render() {
      return (
        <Group defaultValue={this.value}>
          <Radio value={1}>a</Radio>
          <Radio value={2}>b</Radio>
        </Group>
      );
    },
  });

  expect(vm.find('input').element.checked).toBeTruthy();
  await vm.setData({
    value: 2,
  });

  expect(vm.findAll('input')[0]?.element.checked).toBeFalsy();
  expect(vm.findAll('input')[1]?.element.checked).toBeTruthy();
});
