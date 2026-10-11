<script setup lang="ts">
import LuluMessageHost from '@lulu/vue/message-host'
import '@lulu/vue/message/style.css'
import '@lulu/vue/message-host/style.css'
import MessageAction from './MessageAction.vue'
</script>

<template>
  <LuluMessageHost>
    <MessageAction />
  </LuluMessageHost>
</template>
