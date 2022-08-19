import toJs from '../toJs';

test(`to js`, () => {
  const code = `import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const show = ref<boolean>(true);
      const onClick = () => {
        show.value = false;
      };
      return {
        show,
        onClick,
      };
    },
  });`;
  const result = toJs(code);

  expect(result).not.toContain('<boolean>');
});
