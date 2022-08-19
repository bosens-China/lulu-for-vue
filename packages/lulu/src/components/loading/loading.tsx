import { defineComponent } from 'vue';
import { bool, number, string } from 'vue-types';
import { setClass, setStyles } from '../../utils/components';
import { GetProps } from '../../utils/install';

type LoadingSize = 1 | 2 | 3 | 4;
type LoadingRows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export const loadingProps = () => ({
  color: string(),
  size: number<LoadingSize>().def(2),
  rows: number<LoadingRows>().def(1),
  visible: bool().def(true),
});

export type LoadingProps = GetProps<typeof loadingProps>;

export const Loading = defineComponent({
  name: 'LuLoading',
  inheritAttrs: false,
  props: loadingProps(),
  setup(props, { attrs }) {
    return () => {
      const args = {
        ...attrs,
        class: setClass({
          attrs,
          className: ['ui-loading'],
        }),
        style: setStyles({
          attrs,
          style: {
            '--color': props.color ? props.color : undefined,
          },
        }),
        rows: props.rows,
        size: props.size,
      };
      if (!props.visible) {
        return null;
      }
      return <div {...args} />;
    };
  },
});
