<template>
  <div class="card">
    <div class="card-body" ref="container">
      <message-list @update="scroll" />
    </div>
    <div class="card-footer">
      <send-form />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue"
import MessageList from "./message-list.vue"
import SendForm from "./send-form.vue"

const container = ref<HTMLElement | undefined>()

function scroll() {
  nextTick(() => {
    // 마지막으로 스크롤
    const c = container.value!
    c.scrollTop = c.scrollHeight
  })
}
</script>

<style scoped>
.card {
  margin-top: 30px;
  height: calc(100vh - 60px);
}

.card-body {
  overflow-y: auto;
}
</style>
