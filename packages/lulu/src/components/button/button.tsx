import { defineComponent } from 'vue';
import { string, bool } from 'vue-types';
import { setClass, setStyles } from '../../utils/components';
import type { GetProps } from '../../utils/install';

export type Type = 'normal' | 'primary' | 'success' | 'warning' | 'danger';

export const buttonProps = () => ({
  block: bool(),
  type: string<Type>(),
  disabled: bool(),
  loading: bool(),
});

export type ButtonProps = GetProps<typeof buttonProps>;

export const Button = defineComponent({
  name: 'LuButton',
  inheritAttrs: false,
  props: buttonProps(),
  emits: {
    click: (e: MouseEvent) => e instanceof Event,
  },
  setup(props, { attrs, slots, emit }) {
    const onClick = (e: MouseEvent) => {
      if (props.loading || props.disabled) {
        e.preventDefault();
        return;
      }
      emit('click', e);
    };
    return () => {
      const args = {
        ...attrs,
        style: setStyles({
          attrs,
          style: {
            width: props.block ? '100%' : undefined,
          },
        }),
        class: setClass({ className: ['ui-button', { loading: props.loading }], attrs }),
        onClick,
        disabled: props.disabled,

        'data-type': props.type,
      };
      return <button {...args}>{slots?.default?.()}</button>;
    };
  },
});
