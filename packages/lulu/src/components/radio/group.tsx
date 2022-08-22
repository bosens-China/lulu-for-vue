import { defineComponent, provide, computed, nextTick, Ref, watch, reactive } from 'vue';
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
      nextTick().then(() => {
        if (props.modelValue !== undefined && props.modelValue !== value) {
          refresh(props.modelValue);
          return;
        }
      });
    };
    const values = reactive({ ...props, name, setValue, set });
    provide(key, values);
    // 监听变化，更改传递的值
    watch(
      () => props,
      (val) => {
        Object.assign(values, { ...val, name });
      },
      { deep: true },
    );

    // 强制刷新值，确保v-model 和 default绑定的值正确
    const refresh = (value: any) => {
      set.forEach((el) => {
        if (!el.value) {
          return;
        }
        const result = el.value.value === value;
        el.value.checked = result;
      });
    };

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
