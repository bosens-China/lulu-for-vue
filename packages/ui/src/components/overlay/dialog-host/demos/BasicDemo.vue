<script setup lang="ts">
import LuluDialogHost from '@lulu/vue/dialog-host'
import LuluMessageHost from '@lulu/vue/message-host'
import '@lulu/vue/dialog-host/style.css'
import '@lulu/vue/message-host/style.css'
import DialogActions from './DialogActions.vue'
</script>

<template>
  <LuluMessageHost>
    <LuluDialogHost>
      <DialogActions />
    </LuluDialogHost>
  </LuluMessageHost>
</template>
