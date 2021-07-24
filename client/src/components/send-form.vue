<template>
  <form @submit.prevent="send">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Message" v-model="message" />
      <button class="btn btn-outline-secondary" type="submit" :disabled="message.length === 0">Send</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { userId } from "../stores/user"
import { add } from "../stores/message"
import { peers } from "../stores/peer"

const message = ref("")

function send() {
  // 모든 Peer로 전송한다.
  for (const peer of peers)
    try {
      peer.connection.send(userId.value!, message.value)
    } catch (e) {
      // 전송이 실패하는 Peer는 무시한다.
    }

  add({ userId: userId.value!, message: message.value })
  message.value = ""
}
</script>
