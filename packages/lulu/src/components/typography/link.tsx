import { defineComponent } from 'vue';
import { string } from 'vue-types';
import { setClass } from '../../utils/components';
import { GetProps } from '../../utils/install';
import type { TextType } from './text';

export type LinktType = TextType;

export const linktProps = () => {
  return {
    type: string<LinktType>(),
    href: string(),
  };
};

export type LinkProps = GetProps<typeof linktProps>;

export const Link = defineComponent({
  name: 'LuLink',
  inheritAttrs: false,
  props: linktProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const args = {
        ...attrs,
        href: props.href,
        class: setClass({
          attrs,
          className: [props.type],
        }),
      };
      return <a {...args}>{slots?.default?.()}</a>;
    };
  },
});
