import { defineComponent } from 'vue';
import { bool, string } from 'vue-types';
import { setClass, setStyles } from '../../utils/components';
import { GetProps } from '../../utils/install';

export type TextType = 'dark' | 'light' | 'gray' | 'blue' | 'red' | 'orange' | 'green' | 'white';

export const textProps = () => {
  return {
    type: string<TextType>().def('dark'),
    block: bool(),
  };
};

export type TextProps = GetProps<typeof textProps>;

export const Text = defineComponent({
  name: 'LuText',
  inheritAttrs: false,
  props: textProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const args = {
        ...attrs,
        class: setClass({
          attrs,
          className: [props.type],
        }),
        style: setStyles({
          attrs,
          style: {
            display: props.block ? 'block' : undefined,
          },
        }),
      };
      return <span {...args}>{slots?.default?.()}</span>;
    };
  },
});
