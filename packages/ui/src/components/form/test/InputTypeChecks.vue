<script setup lang="ts">
import { ref } from 'vue'
import LuluInput from '../LuluInput.vue'
import type { LuluInputProps as EntryInputProps } from '../../../entries/input'
import type { LuluInputProps as PublicInputProps } from '../../../index'

const text = ref('')
const number = ref<number | ''>(0)
const entryProps: EntryInputProps<'number'> = { type: 'number' }
const publicProps: PublicInputProps<'email'> = { type: 'email' }
</script>

<template>
  <LuluInput v-model="text" />
  <LuluInput v-model="text" v-bind="publicProps" />
  <LuluInput v-model="number" v-bind="entryProps" />
  <!-- @vue-expect-error 数字输入不应写入只接受 string 的模型。 -->
  <LuluInput v-model="text" type="number" />
  <!-- @vue-expect-error 普通文本输入不应接受数值模型。 -->
  <LuluInput v-model="number" />
</template>
