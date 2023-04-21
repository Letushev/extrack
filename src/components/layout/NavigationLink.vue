<script setup lang="ts">
import { type RouteLocationRaw, useLink } from 'vue-router'

const props = defineProps<{
  to: RouteLocationRaw
}>()

const { isActive } = useLink({ to: props.to })
</script>

<template>
  <RouterLink
    :to="to"
    :class="[
      'relative h-full text-xl text-grey flex items-center',
      {
        [`text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue after:rounded-t-sm`]:
          isActive
      }
    ]"
  >
    <slot></slot>
  </RouterLink>
</template>
