<script setup lang="ts">
import { shallowRef } from 'vue'
import LuluForm from '../LuluForm.vue'
import LuluFormItem from '../LuluFormItem.vue'
import type { FormRule } from '../form-types'

interface Profile {
  email: string
  enabled: boolean
  tags: string[]
}

const model = shallowRef<Profile>({ email: '', enabled: false, tags: [] })
const rule: FormRule = value => typeof value === 'string' && value.includes('@') ? undefined : '请检查邮箱'
</script>

<template>
  <LuluForm :model="model" :rules="{ email: rule }">
    <LuluFormItem name="email" :rules="[rule]" />
  </LuluForm>
</template>
