import { defineComponent, computed, nextTick } from 'vue';
import { bool, func, number, string } from 'vue-types';
import { useSynchronization } from '../../hooks/useSynchronization';
import { setStyles } from '../../utils/components';
import { GetProps } from '../../utils/install';

export type RangeDirection = 'normal' | 'reverse';

export type PromptFormat = (from: number, to?: number) => string | [string, string] | undefined;

export const rangeProps = () => {
  return {
    modelValue: number(),
    min: number().def(0),
    max: number().def(100),
    step: number().def(1),
    // 方向
    direction: string<RangeDirection>().def('normal'),
    // 提示格式
    promptFormat: func<PromptFormat>(),
    disabled: bool(),
    block: bool(),
    /*
     * 区块特有属性
     */
    // 区块
    multiple: bool(),
    // range: array<[number, number]>(),
    // 区块选择开始端数字
    from: number().def(0),
    // 区块选择结束端数字
    to: number().def(100),
  };
};

export type RangeProps = GetProps<typeof rangeProps>;

export const Range = defineComponent({
  name: 'LuRange',
  inheritAttrs: false,
  props: rangeProps(),
  emits: {
    input: (e: Event) => e instanceof Event,
    change: (e: Event) => e instanceof Event,
    'update:modelValue': (e: number) => typeof e === 'number',
    'update:from': (e: number) => typeof e === 'number',
    'update:to': (e: number) => typeof e === 'number',
  },
  setup(props, { attrs, emit }) {
    const value = useSynchronization(props.modelValue || 0);
    const to = useSynchronization(props.to);
    const from = useSynchronization(props.from);

    const getPercent = (num: number) => {
      return (num - props.min) / (props.max - props.min);
    };
    const onInput = (e: Event) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      const el = e.target as HTMLInputElement;
      const current = +el.value;
      const isFrom = props.multiple && el.getAttribute('data-range') === 'from';

      if (!props.multiple) {
        value.value = current;
        emit('update:modelValue', value.value);
      } else {
        // 确定属于哪一段
        if (isFrom) {
          from.value = current;
        }
        if (!isFrom) {
          to.value = current;
        }
        emit('update:from', Math.min(from.value, to.value));
        emit('update:to', Math.max(from.value, to.value));
        emit('input', e);
      }
      /*
       * 在不传递 v-model 的情况下可以任由更改
       */
      nextTick().then(() => {
        if (props.modelValue !== undefined) {
          value.value = props.modelValue;
          return;
        }
        if (isFrom && ![props.from, props.to].includes(current)) {
          from.value = props.from;
        }
        if (![props.from, props.to].includes(current)) {
          to.value = props.to;
        }
      });
    };
    const onChange = (e: Event) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      emit('change', e);
    };

    const onTouchstart = (e: Event) => {
      e.stopPropagation();
    };

    const tips = computed(() => {
      if (!props.multiple) {
        return (props.promptFormat || ((value) => `${value}`))(value.value);
      }
      return (props.promptFormat || ((from, to) => [`${from}`, `${to}`]))(from.value, to.value);
    });

    return () => {
      const args = {
        ...attrs,
        is: 'ui-range',
        type: 'range',
        value: value.value,
        min: props.min,
        max: props.max,
        stop: props.step,
        disabled: props.disabled,
        ...(props.direction === 'reverse' ? { reverse: true } : {}),
        style: setStyles({
          attrs,
          style: {
            '--percent': getPercent(value.value),
            width: props.block ? '100%' : undefined,
          },
          cover: true,
        }),
        ...(tips.value != null ? { 'data-tips': tips.value } : {}),
        onInput,
        onChange,
        onTouchstart,
      };

      if (!props.multiple) {
        return <input {...args}></input>;
      }

      /*
       * 区块属性合集
       */

      ['value', 'data-range', 'data-tips'].forEach((key) => Reflect.deleteProperty(args, key));

      const multipleArgs = {
        ...args,
        multiple: true,
        range: [props.min, props.max].join(','),
        style: setStyles({
          attrs: args,
          style: {
            '--from': Math.min(from.value, to.value),
            '--to': Math.max(from.value, to.value),
            '--percent': getPercent(from.value),
          },
          cover: true,
        }),
      };
      const [fromTips, toTips] = tips.value as [string, string];

      return (
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: props.block ? '100%' : undefined,
          }}
        >
          <input
            {...multipleArgs}
            data-tips={fromTips}
            data-range="from"
            value={from.value}
          ></input>
          <input
            {...multipleArgs}
            data-tips={toTips}
            data-range="to"
            value={to.value}
            style={setStyles({
              attrs: multipleArgs,
              style: {
                '--percent': getPercent(to.value),
              },
              cover: true,
            })}
          ></input>
        </div>
      );
    };
  },
});
