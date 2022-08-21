import { isRef, ref, watch } from 'vue';

export const useSynchronization = <T>(initialValue: T) => {
  const value = ref(initialValue);
  watch(
    () => initialValue,
    () => {
      value.value = (isRef(initialValue) ? initialValue.value : initialValue) as any;
    },
    { deep: true },
  );
  return value;
};
