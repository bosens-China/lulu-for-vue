import { defineComponent, provide, computed, nextTick, Ref } from 'vue';
import { any, array, bool, string } from 'vue-types';
import type { GetProps } from '../../utils/install';
import { setClass } from '../../utils/components';
import { isObject } from '../../utils/type';
import { Radio, key } from './radio';

export type Options = string | number | { label: string; value: string; disabled?: boolean };

export const groupProps = () => {
  return {
    disabled: bool(),
    name: string(),
    modelValue: any(),
    options: array<Options>(),
    defaultValue: any(),
  };
};

export type GroupProps = GetProps<typeof groupProps>;

let _name = 0;

export const Group = defineComponent({
  name: 'LuRadioGroup',
  inheritAttrs: false,
  props: groupProps(),
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const name = computed(() => {
      return props.name ? props.name : `radio_${_name++}`;
    });
    const set = new Set<Ref<HTMLInputElement | null>>();

    const setValue = (value: any) => {
      emit('update:modelValue', value);
      // 强制锁定 modelValue
      nextTick().then(() => {
        if (props.modelValue !== undefined && props.modelValue !== value) {
          set.forEach((el) => {
            if (!el.value) {
              return;
            }
            const result = el.value.value === props.modelValue;
            el.value.checked = result;
          });
        }
      });
    };

    provide(key, { ...props, name: name.value, setValue, set });
    return () => {
      const args = {
        ...attrs,
        class: setClass({
          attrs,
          className: ['ui-radio-group'],
        }),
      };

      const children = Array.isArray(props.options)
        ? props.options.map((item) => {
            if (isObject(item)) {
              return (
                <Radio disabled={item.disabled} value={item.value}>
                  {item.label}
                </Radio>
              );
            }
            return <Radio value={item}>{item}</Radio>;
          })
        : slots?.default?.();

      return <div {...args}>{children}</div>;
    };
  },
});
