<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluFormItem from '@lulu/vue/form-item'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/button/style.css'
import '@lulu/vue/form-item/style.css'
import '@lulu/vue/input/style.css'

const name = ref('')
const error = ref('请输入至少两个字符')
</script>

<template>
  <div class="space-y-4">
    <LuluFormItem control-id="custom-name" :error="error" required>
      <template #label>姓名 <span class="text-[var(--lulu-color-text-muted)]">（用于展示）</span></template>
      <LuluInput v-model="name" placeholder="请输入姓名" />
      <template #help>此处演示业务传入错误，也可由 Form 的规则自动管理。</template>
      <template #error="{ errorId, message }">
        <p :id="errorId" class="m-0 text-sm text-[var(--lulu-color-danger)]" role="alert" aria-atomic="true"><strong>检查结果：</strong>{{ message }}</p>
      </template>
    </LuluFormItem>
    <LuluButton variant="normal" @click="error = name.trim().length >= 2 ? '' : '请输入至少两个字符'">检查姓名</LuluButton>
  </div>
</template>
