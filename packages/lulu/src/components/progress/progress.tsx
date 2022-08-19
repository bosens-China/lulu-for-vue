import { defineComponent } from 'vue';
import { bool, number } from 'vue-types';
import { setClass, setStyles } from '../../utils/components';
import { GetProps } from '../../utils/install';

export const progressProps = () => ({
  max: number().def(100),
  block: bool(),
  value: number().def(0),
});

export type ProgressProps = GetProps<typeof progressProps>;

export const Progress = defineComponent({
  name: 'LuProgress',
  inheritAttrs: false,
  props: progressProps(),
  setup(props, { attrs }) {
    return () => {
      const args = {
        ...attrs,
        class: setClass({
          attrs,
          className: ['ui-progress'],
        }),
        value: props.value,
        max: props.max,
        style: setStyles({
          attrs,
          style: { width: props.block ? '100%' : undefined },
        }),
      };
      return <progress {...args} />;
    };
  },
});
