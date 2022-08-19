import { defineComponent } from 'vue';
import { string } from 'vue-types';
import { GetProps } from '../../utils/install';

export const dotProps = () => ({
  describe: string().def('正在加载中'),
});

export type DotProps = GetProps<typeof dotProps>;

export const Dot = defineComponent({
  name: 'LuLoadingDot',
  inheritAttrs: false,
  props: dotProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const args = {
        ...attrs,
        'is-dot': true,
      };
      return (
        <>
          {props.describe || slots?.default?.()}
          <span {...args} />
        </>
      );
    };
  },
});
