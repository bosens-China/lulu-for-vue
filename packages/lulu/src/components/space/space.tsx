import { defineComponent, Fragment } from 'vue';
import { bool, oneOfType, string } from 'vue-types';
import { setClass, setStyles } from '../../utils/components';
import { filterEmpty } from '../../utils/element';
import { GetProps } from '../../utils/install';

export type SpaceSIze = 'small' | 'middle' | 'large' | number;
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
export type SpaceDirection = 'vertical' | 'horizontal';

export const spaceProps = () => {
  return {
    align: string<SpaceAlign>(),
    direction: string<SpaceDirection>().def('horizontal'),
    size: oneOfType<SpaceSIze | Array<SpaceSIze>>([String, Number, Array]).def('small'),
    wrap: bool(),
  };
};
export type SpaceProps = GetProps<typeof spaceProps>;

const getSize = (val: SpaceSIze | Array<SpaceSIze>) => {
  const size = Array.isArray(val) ? val : [val];
  return size.map((item) => {
    if (typeof item === 'number') {
      return item;
    }

    const obj: Record<Exclude<SpaceSIze, number>, number> = {
      small: 8,
      middle: 16,
      large: 24,
    };
    return obj[item];
  });
};

export const Space = defineComponent({
  name: 'LuSpace',
  inheritAttrs: false,
  props: spaceProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const rest = filterEmpty(slots?.default?.());
      if (!rest.length) {
        return null;
      }

      const args = {
        ...attrs,
        style: setStyles({
          attrs,
          style: {
            gap: getSize(props.size)
              .map((f) => `${f}px`)
              .join(' '),
            // display: props.direction === 'vertical' ? 'flex' : undefined,
            'flex-wrap': props.direction === 'horizontal' && props.wrap ? 'wrap' : undefined,
          },
        }),
        class: setClass({
          attrs,
          className: [
            'ul-space',
            {
              'ul-space-horizontal': props.direction === 'horizontal',
              'ul-space-vertical': props.direction === 'vertical',
              'ul-space-align-center':
                props.direction === 'vertical'
                  ? props.align
                  : (props.align || 'center') === 'center',
              'ul-space-align-start': props.align === 'start',
              'ul-space-align-end': props.align === 'end',
              'ul-space-align-baseline': props.align === 'baseline',
            },
          ],
        }),
      };
      const getSplit = (index) => {
        const split = slots?.split?.();

        if (!split) {
          return undefined;
        }
        if (rest.length > 1 && index < rest.length - 1) {
          return split;
        }
        return undefined;
      };

      return (
        <div {...args}>
          {rest.map((el, index) => {
            const split = getSplit(index);
            // 避免输出注释节点
            if (split) {
              return (
                <Fragment key={index}>
                  <div class="ul-space-item">{el}</div>
                  {split && <div class="ul-space-item-split">{split}</div>}
                </Fragment>
              );
            }
            return (
              <Fragment key={index}>
                <div class="ul-space-item">{el}</div>
              </Fragment>
            );
          })}
        </div>
      );
    };
  },
});
