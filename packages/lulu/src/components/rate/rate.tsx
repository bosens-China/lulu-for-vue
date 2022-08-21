import { defineComponent, nextTick } from 'vue';
import { bool, number } from 'vue-types';
import { useSynchronization } from '../../hooks/useSynchronization';
import { setStyles } from '../../utils/components';
import { GetProps } from '../../utils/install';

export const rateProps = () => {
  return {
    modelValue: number(),
    count: number().def(5),
    disabled: bool(),
    readonly: bool(),
    allowHalf: bool(),
  };
};

export type RateProps = GetProps<typeof rateProps>;

export const Rate = defineComponent({
  name: 'LuRate',
  inheritAttrs: false,
  props: rateProps(),
  emits: {
    change: (e: Event) => e instanceof Event,
    'update:modelValue': (e: number) => typeof e === 'number',
  },
  setup(props, { attrs, emit }) {
    const value = useSynchronization(props.modelValue || 0);
    const onChange = (e: Event) => {
      if (props.disabled || props.readonly) {
        e.preventDefault();
        return;
      }
      const el = e.target as HTMLInputElement;
      const current = +el.value;
      value.value = current;
      emit('change', e);
      emit('update:modelValue', current);
      nextTick().then(() => {
        if (props.modelValue !== undefined) {
          value.value = props.modelValue;
        }
      });
    };

    return () => {
      const args = {
        ...attrs,
        type: 'range',
        is: 'ui-rate',
        max: props.count,
        step: props.allowHalf ? 0.5 : 1,
        value: value.value,
        style: setStyles({
          attrs,
          style: {
            '--number': props.count,
          },
        }),
        disabled: props.disabled,
        readonly: props.readonly,
        min: 0,
        onChange,
      };
      return <input {...args}></input>;
    };
  },
});
