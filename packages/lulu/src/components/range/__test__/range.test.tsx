import { Range } from '../range';
import { mount } from '@vue/test-utils';

test(`base`, async () => {
  const vm = mount(Range);
  expect(vm.attributes()).toMatchObject({
    type: 'range',
    min: '0',
    max: '100',
    is: 'ui-range',
  });
  await vm.setProps({
    multiple: true,
  });
  expect(vm.find('input').attributes()).toMatchObject({
    multiple: '',
    min: '0',
    max: '100',
    range: '0,100',
  });
});

test(`set attrs`, async () => {
  const vm = mount(Range);
  await vm.setProps({
    min: -10,
    max: 40,
    step: 10,
    direction: 'reverse',
    disabled: true,
    block: true,
  });
  expect(vm.attributes()).toMatchObject({
    min: '-10',
    max: '40',
    reverse: expect.any(String),
    disabled: '',
    stop: '10',
    'data-tips': '0',
  });
  expect((vm.element as any).style.getPropertyValue(['--percent'])).toBe('0.2');
  expect((vm.element as any).style.getPropertyValue(['width'])).toBe('100%');
});

test(`v-model`, () => {
  const vm = mount({
    components: {
      Range,
    },
    template: `<Range multiple v-model="value" :from="from" :to="to"></Range>`,
    data: () => ({ value: 2, from: 10, to: 20 }),
  });

  let input = vm.find('input').element as any;
  expect(input.style.getPropertyValue(['--from'])).toBe('10');
  expect(input.style.getPropertyValue(['--to'])).toBe('20');
  expect(input.style.getPropertyValue(['--percent'])).toBe('0.1');
});
