<script setup lang="ts">
import { ref } from 'vue'
import LuluTextarea from '@lulu/vue/textarea'
import '@lulu/vue/textarea/style.css'

const value = ref('可继续编辑')
</script>

<template>
  <div class="grid gap-4">
    <LuluTextarea v-model="value" aria-label="编辑备注" rows="3" />
    <LuluTextarea model-value="不可编辑的备注" disabled aria-label="禁用备注" />
    <LuluTextarea model-value="只读备注可复制" readonly aria-label="只读备注" />
    <LuluTextarea model-value="内容不符合要求" invalid aria-label="错误备注" aria-describedby="textarea-state-error" />
    <p id="textarea-state-error">请修改备注内容。</p>
  </div>
</template>

