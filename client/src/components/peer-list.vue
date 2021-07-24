<template>
  <div class="root">
    <h3>Peers</h3>
    <ul class="list-group mb-2">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ userId }}
        <span class="badge bg-primary rounded-pill">ME</span>
      </li>
    </ul>
    <ul class="list-group">
      <li
        v-for="peer in peers"
        :key="peer.userId"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ peer.userId }}
        <span v-if="peer.ready" class="badge bg-success rounded-pill">&nbsp;</span>
        <span v-else class="badge bg-warning rounded-pill">&nbsp;</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { userId } from "../stores/user"
import { peers } from "../stores/peer"
</script>

<style scoped>
.root {
  height: 100vh;
  overflow-y: auto;
  padding: 30px 0;
}
</style>
