<script setup lang="ts">
import { ref } from 'vue'
import LuluFormField from '@lulu/vue/form-field'
import LuluInput from '@lulu/vue/input'
import LuluFieldError from '@lulu/vue/field-error'
import LuluButton from '@lulu/vue/button'

import '@lulu/vue/form-field/style.css'
import '@lulu/vue/input/style.css'
import '@lulu/vue/field-error/style.css'
import '@lulu/vue/button/style.css'
const value = ref('')
const error = ref('用户名至少两个字')
function check() { error.value = value.value.trim().length < 2 ? '用户名至少两个字' : '' }
</script>

<template>
  <div class="grid gap-4">
    <LuluFormField control-id="field-error-name" :error="error" required>
      <template #label>账户名称 <small>（公开展示）</small></template>
      <template #default="{ controlProps }">
        <LuluInput v-model="value" v-bind="controlProps" :aria-describedby="[controlProps['aria-describedby'], 'field-name-help'].filter(Boolean).join(' ')" />
        <p id="field-name-help">至少两个字，请勿填写联系方式。</p>
      </template>
      <template #error="{ errorId, message }"><LuluFieldError :id="errorId"><strong>检查结果：</strong>{{ message }}</LuluFieldError></template>
    </LuluFormField>
    <LuluButton @click="check">检查账户名称</LuluButton>
  </div>
</template>

