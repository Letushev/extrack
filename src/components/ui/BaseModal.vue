<script setup lang="ts">
import { computed } from 'vue'

import BaseButton from './BaseButton.vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    confirmText?: string
    formId?: string
    loading?: boolean
    variant?: 'success' | 'danger'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
  }>(),
  {
    confirmText: 'Save',
    loading: false,
    variant: 'success',
    size: 'small',
    disabled: false
  }
)

defineEmits<{
  (emit: 'close'): void
  (emit: 'confirm'): void
}>()

const sizeStyle = {
  small: 'w-[480px]',
  medium: 'w-[720px]',
  large: 'w-[1180px]'
}

console.log(props.size)

const modalClass = computed(() => [
  'fixed left-1/2 top-1/2 z-50 max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg bg-white p-8 shadow-[0_5px_15px_rgba(0,0,0,0.35)]',
  sizeStyle[props.size]
])
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop" @click="$emit('close')">
      <div v-if="open" class="fixed left-0 top-0 z-40 h-screen w-screen bg-[#000] opacity-50"></div>
    </Transition>
    <Transition name="modal">
      <div v-if="open" :class="modalClass">
        <h1 class="mb-8 text-xl font-medium">{{ title }}</h1>
        <slot></slot>
        <div class="mt-12 flex items-center justify-between">
          <BaseButton size="small" variant="outlined" color="text" @click="$emit('close')">
            Cancel
          </BaseButton>
          <BaseButton
            size="small"
            @click="$emit('confirm')"
            :form="formId"
            :is-loading="loading"
            :color="variant === 'success' ? 'primary' : 'error'"
            :disabled="disabled"
          >
            {{ confirmText }}
          </BaseButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active,
.backdrop-enter-active,
.backdrop-leave-active {
  @apply transition-all duration-300;
}

.backdrop-enter-from,
.backdrop-leave-to {
  @apply opacity-0;
}

.modal-enter-from,
.modal-leave-to {
  @apply scale-75 opacity-0;
}
</style>
