<script setup lang="ts">
import LuluFormField from '@lulu/vue/form-field'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/form-field/style.css'
import '@lulu/vue/input/style.css'
</script>

<template>
  <LuluFormField v-slot="{ controlProps }" control-id="email" label="邮箱" required>
    <LuluInput v-bind="controlProps" placeholder="name@example.com" />
  </LuluFormField>
</template>
