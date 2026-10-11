<script setup lang="ts">
import { reactive } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluForm from '@lulu/vue/form'
import LuluFormItem from '@lulu/vue/form-item'
import '@lulu/vue/button/style.css'
import '@lulu/vue/form/style.css'
import '@lulu/vue/form-item/style.css'
import '@lulu/vue/input/style.css'

const model = reactive({ email: '' })
</script>

<template>
  <LuluForm :model="model">
    <LuluFormItem name="email" label="原生邮箱" help="第三方控件同样可绑定 controlProps。" required v-slot="{ controlProps }">
      <input v-model="model.email" v-bind="controlProps" class="lulu-input" type="email">
    </LuluFormItem>
    <LuluButton native-type="submit">检查邮箱</LuluButton>
  </LuluForm>
</template>
