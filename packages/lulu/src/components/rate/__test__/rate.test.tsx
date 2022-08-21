import { Rate } from '../rate';
import { mount } from '@vue/test-utils';

test(`base`, () => {
  const vm = mount(Rate);
  expect(vm.attributes()).toMatchObject({
    type: 'range',
    is: 'ui-rate',
    max: '5',
    step: '1',
  });
});

test(`disabled  and readonly `, async () => {
  const fn = jest.fn();
  const vm = mount({
    render() {
      return <Rate onChange={fn}></Rate>;
    },
  });
  await vm.setProps({
    readonly: true,
    disabled: true,
  });
  expect(vm.attributes()).toMatchObject({
    readonly: '',
    disabled: '',
  });
  await vm.trigger('change');
  expect(fn.mock.calls).toHaveLength(0);
});

test(`v-model`, () => {
  const vm = mount({
    components: {
      Rate,
    },
    template: `<Rate v-model="value"></Rate>`,
    data: () => ({ value: 2 }),
  });
  const el = vm.element as HTMLInputElement;
  expect(el.value).toBe('2');
});
