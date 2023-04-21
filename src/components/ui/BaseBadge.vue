<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  color: 'green' | 'orange'
}>()

const badgeColor = computed(() =>
  props.color === 'green' ? 'text-green border-green' : 'text-orange border-orange'
)
</script>

<template>
  <span
    :class="[
      'flex h-5 min-w-[32px] items-center justify-center rounded-full border px-2 text-xxs',
      badgeColor
    ]"
  >
    <slot></slot>
  </span>
</template>
