import { transformation, reduction } from '../translation';

const from = `
<template>
  <lu-link href="#link">这是一句话</lu-link>
</template>
<script setup></script>
<style>
a {
  display: block;
}
</style>
`;
const to = `
<template>
  <lu-link href="#link">这是一句话</lu-link>
</template>
<script_private setup></script_private>
<style_private>
a {
  display: block;
}
</style_private>
`;

test(`transformation`, () => {
  const result = transformation(from);
  expect(result).toBe(to);
});

test(`reduction`, () => {
  const result = reduction(to);
  expect(result).toBe(from);
});
