import { Comment, Fragment, Text } from 'vue';

/*
 * 将元素扁平化
 */
export const filterEmpty = (el: Array<any> = []) => {
  const arr: Array<any> = [];
  el.forEach((item: any) => {
    if (Array.isArray(item)) {
      arr.push(...item);
    } else if (item?.type === Fragment) {
      arr.push(...filterEmpty(item.children));
    } else {
      arr.push(item);
    }
  });
  return arr.filter((f) => !filterEmptyWithUndefined(f));
};

/*
 * 当前元素是否为空
 */

export const filterEmptyWithUndefined = (el) => {
  return (
    el &&
    ((el.type === Text && el.children.trim() === '') ||
      (el.type === Fragment && el.children.length === 0) ||
      // https://stackoverflow.com/questions/41228833/how-to-comment-code-in-a-vue-js-file
      el.type === Comment)
  );
};
