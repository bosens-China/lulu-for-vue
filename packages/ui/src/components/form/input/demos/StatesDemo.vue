<script setup lang="ts">
import { ref } from 'vue'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/input/style.css'

const password = ref('')
const amount = ref<number | ''>(3)
const hour = ref<number | ''>(9)
</script>

<template>
  <div class="grid gap-4">
    <label class="grid gap-2">密码<LuluInput v-model="password" type="password" autocomplete="new-password" /></label>
    <label class="grid gap-2">数量（1–10）<LuluInput v-model="amount" type="number" min="1" max="10" /></label>
    <label class="grid gap-2">小时数（0–23）<LuluInput v-model="hour" type="number" min="0" max="23" step="1" /></label>
    <LuluInput model-value="不可编辑" disabled aria-label="禁用输入" />
    <LuluInput model-value="只读内容可复制" readonly aria-label="只读输入" />
    <LuluInput model-value="格式错误" invalid aria-label="错误输入" aria-describedby="input-state-error" />
    <p id="input-state-error">请按要求填写；invalid 只设置错误状态，不代替业务校验。</p>
    <output>数量：{{ amount }}</output>
  </div>
</template>

