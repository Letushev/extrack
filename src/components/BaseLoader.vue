<script setup lang="ts">
import { computed } from 'vue'

type LoaderSize = 'small' | 'medium' | 'large'
const props = withDefaults(
  defineProps<{
    size: LoaderSize
  }>(),
  {
    size: 'medium'
  }
)

const styles: Record<LoaderSize, string> = {
  small: 'w-4 h-4 border-2',
  medium: 'w-8 h-8 border-4',
  large: 'w-12 h-12 border-[6px]'
}

const loaderClass = computed(() => [
  'inline-block rounded-full border-y-blue border-x-transparent animate-spin',
  styles[props.size]
])
</script>

<template>
  <div :class="loaderClass"></div>
</template>
