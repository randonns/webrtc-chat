<template>
  <div class="d-flex flex-column align-items-start">
    <template v-for="(m, i) in messages" :key="i">
      <p v-if="m.userId !== userId" class="mb-0 text-black-50 fs-6 fw-lighter">
        <em>{{ m.userId }}</em>
      </p>
      <div
        class="alert"
        :class="{
          'alert-dark': m.userId !== userId,
          'alert-primary': m.userId === userId,
          'align-self-end': m.userId === userId
        }"
        role="alert"
      >
        {{ m.message }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from "vue"
import { userId } from "../stores/user"
import { messages } from "../stores/message"

export default defineComponent({
  emits: ["update"],
  setup(props, { emit }) {
    onUpdated(() => {
      emit("update")
    })

    return { userId, messages }
  }
})
</script>

<style scoped>
.alert {
  max-width: 80%;
}
</style>
