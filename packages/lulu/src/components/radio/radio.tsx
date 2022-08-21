import { defineComponent, inject, nextTick, ref, onUnmounted, InjectionKey, Ref } from 'vue';
import { any, bool } from 'vue-types';
import { useSynchronization } from '../../hooks/useSynchronization';
import { setClass } from '../../utils/components';
import { GetProps } from '../../utils/install';
import type { GroupProps } from './group';

export const key = Symbol() as unknown as InjectionKey<
  GroupProps & {
    setValue: (value: any) => void;
    set: Set<Ref<HTMLInputElement | null>>;
  }
>;

export const radioProps = () => {
  return {
    disabled: bool(),
    modelValue: any(),
    value: any(),
  };
};

// let _id = 0;

export type RadioProps = GetProps<typeof radioProps>;

export const Radio = defineComponent({
  name: 'LuRadio',
  inheritAttrs: false,
  props: radioProps(),
  emits: {
    change: (e: Event) => e instanceof Event,
    'update:modelValue': (e: boolean) => typeof e === 'boolean',
  },
  setup(props, { slots, attrs, emit }) {
    const superior = inject(key, undefined);
    const myRef = ref<HTMLInputElement | null>(null);
    superior?.set.add(myRef);
    onUnmounted(() => {
      superior?.set.delete(myRef);
    });

    /*
     * 初始是否选中
     */
    const checked = useSynchronization(
      (superior?.modelValue !== undefined && props.value !== undefined
        ? superior.modelValue === props.value
        : props.modelValue) as boolean | undefined,
    );

    if (checked.value === undefined && superior?.defaultValue && props.value !== undefined) {
      checked.value = superior.defaultValue === props.value;
    }

    const onChange = (e: Event) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      const el = e.target as HTMLInputElement;
      checked.value = el.checked;
      emit('update:modelValue', el.checked);
      emit('change', e);
      superior?.setValue?.(props.value);
      // 绑定值时禁止选中其他
      nextTick().then(() => {
        if (props.modelValue !== undefined) {
          checked.value = props.modelValue;
        }
      });
    };

    return () => {
      const args = {
        type: 'radio',
        is: 'ui-radio',
        checked: checked.value,
        disabled: props.disabled || superior?.disabled,
        value: props.value,
        onChange,
        name: superior?.name,
        ref: myRef,
      };
      const rootArgs = {
        ...attrs,
        class: setClass({
          attrs,
          className: ['ui-radio-root'],
        }),
      };
      return (
        <label {...rootArgs}>
          <input {...args} />
          <span>{slots?.default?.()}</span>
        </label>
      );
    };
  },
});
