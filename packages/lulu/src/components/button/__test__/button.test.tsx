import { mount } from '@vue/test-utils';
import { Button } from '../button';

test('base status', () => {
  const vm = mount({
    render() {
      return (
        <Button
          type="danger"
          class="abc"
          style={{ width: '50%', height: '100px' }}
          loading
          disabled
          block
        >
          hello
        </Button>
      );
    },
  });

  expect(vm.text()).toBe('hello');
  expect(vm.attributes('data-type')).toBe('danger');
  expect(vm.attributes('loading')).not.toBeUndefined();
  expect(vm.attributes('disabled')).not.toBeUndefined();
  const styles = window.getComputedStyle(vm.element);
  expect(styles.width).toBe('50%');
  expect(styles.height).toBe('100px');
  expect(vm.classes()).toContain('ui-button');
  expect(vm.classes()).toContain('abc');
});

test('disabled onClick', async () => {
  const vm = mount({
    render() {
      return (
        <Button type="danger" disabled>
          hello
        </Button>
      );
    },
  });
  vm.trigger('click');
  expect(vm.emitted()).not.toHaveProperty('click');
  await vm.setProps({
    disabled: false,
  });
  await vm.trigger('click');
  const click = vm.emitted('click');
  expect(click).toHaveLength(1);
  expect((vm.emitted().click as any)[0][0] instanceof Event).toBeTruthy();
});

test('loading onClick', async () => {
  const fn = jest.fn();
  const vm = mount({
    render() {
      return (
        <Button type="danger" loading onClick={fn}>
          hello
        </Button>
      );
    },
  });
  vm.trigger('click');
  expect(fn.mock.calls.length).toBe(0);
  await vm.setProps({
    loading: false,
  });
  vm.trigger('click');
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0] instanceof Event).toBeTruthy();
});
