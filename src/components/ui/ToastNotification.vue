<script setup lang="ts">
defineProps<{ type: 'success' | 'error'; message: string }>()
</script>

<template>
  <div
    class="relative flex w-80 items-center overflow-auto rounded bg-white p-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
  >
    <FontAwesomeIcon
      v-if="type === 'success'"
      icon="fa-regular fa-circle-check"
      size="lg"
      class="text-green"
    />
    <FontAwesomeIcon v-else icon="fa-solid fa-circle-exclamation" size="lg" class="text-red" />
    <p class="ml-4 text-sm">
      {{ message }}
    </p>
    <div
      class="progress"
      :class="[
        'animation-collapse absolute bottom-0 left-0 h-0.5',
        type === 'success' ? 'bg-green' : 'bg-red'
      ]"
    />
  </div>
</template>

<style scoped>
.progress {
  animation-name: collapse;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes collapse {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
