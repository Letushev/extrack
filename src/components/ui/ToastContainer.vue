<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useToastsStore } from '@/stores/toasts'

import ToastNotification from './ToastNotification.vue'

const store = useToastsStore()
const { toasts } = storeToRefs(store)
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-8 left-8 top-8 flex flex-col justify-end space-y-4"
    >
      <TransitionGroup name="toast">
        <ToastNotification
          v-for="toast of toasts"
          :key="toast.toastId"
          :type="toast.type"
          :message="toast.message"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-500;
}

.toast-enter-from,
.toast-leave-to {
  @apply -translate-x-full opacity-0;
}

.toast-leave-active {
  @apply absolute;
}
</style>
