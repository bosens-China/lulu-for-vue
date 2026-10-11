<script setup lang="ts">
import LuluMessageHost from '@lulu/vue/message-host'
import '@lulu/vue/message/style.css'
import '@lulu/vue/message-host/style.css'
import QueueActions from './QueueActions.vue'
</script>

<template>
  <LuluMessageHost :duration="2500"><QueueActions /></LuluMessageHost>
</template>
