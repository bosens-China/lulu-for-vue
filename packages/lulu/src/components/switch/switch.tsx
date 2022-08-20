import { defineComponent, nextTick, ref } from 'vue';
import { bool } from 'vue-types';
import { GetProps } from '../../utils/install';

export const switchProps = () => {
  return {
    disabled: bool(),
    modelValue: bool().def(undefined),
  };
};

export type SwitchProps = GetProps<typeof switchProps>;

export const Switch = defineComponent({
  name: 'LuSwitch',
  inheritAttrs: false,
  props: switchProps(),
  emits: {
    change: (e: Event) => e instanceof Event,
    'update:modelValue': (e: boolean) => typeof e === 'boolean',
  },
  setup(props, { attrs, emit }) {
    const el = ref<HTMLInputElement | null>(null);
    const onChange = (e: Event) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      emit('change', e);
      emit('update:modelValue', (e.target as any).checked);

      // 如果 modelValue 值没有指定，则清空
      if (props.modelValue !== undefined) {
        nextTick().then(() => {
          el.value!.checked = props.modelValue;
        });
      }
    };
    return () => {
      const args = {
        ...attrs,
        type: 'checkbox',
        is: 'ui-switch',
        checked: props.modelValue,
        disabled: props.disabled,
        onChange,
        ref: el,
      };
      return <input {...args}></input>;
    };
  },
});
