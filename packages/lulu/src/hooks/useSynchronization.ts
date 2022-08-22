import { isRef, ref, watch } from 'vue';

export const useSynchronization = <T>(initialValue: T) => {
  // 这里是为了防止计算属性不可用
  const value = ref(isRef(initialValue) ? initialValue.value : initialValue);

  watch(
    () => initialValue,
    (val) => {
      value.value = (isRef(val) ? val.value : val) as any;
    },
    { deep: true },
  );
  return value;
};
