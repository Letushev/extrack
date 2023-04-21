<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  color: 'primary' | 'error'
}>()

const buttonClass = computed(() => [
  'flex h-8 w-8 items-center justify-center rounded-full border bg-white',
  props.color === 'primary' ? 'border-blue text-blue' : 'border-red text-red'
])
</script>

<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>
