<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <peer-list />
      </div>
      <div class="col">
        <chat />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import PeerList from "./peer-list.vue"
import Chat from "./chat.vue"
import Signaling from "../webrtc/signaling"

onMounted(() => {
  new Signaling()
})
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
