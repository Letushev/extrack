<script setup lang="ts">
import { computed } from 'vue'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import IconButton from '@/components/ui/IconButton.vue'

const props = defineProps<{
  image: string
  name: string
  muscleGroup: string
  equipment: string
  description?: string
  selected: boolean
}>()

defineEmits<{
  (emit: 'edit'): void
  (emit: 'delete'): void
}>()

const cardClass = computed(() => {
  return [
    'cursor-pointer overflow-auto rounded-lg border bg-white',
    props.selected ? 'border-blue' : 'border-bright-grey'
  ]
})
</script>

<template>
  <div class="relative">
    <div :class="cardClass">
      <img :src="image" alt="" class="aspect-square object-cover" />
      <div class="p-4 pt-2">
        <p class="text-sm">{{ name }}</p>
        <div class="mt-2 flex space-x-2">
          <BaseBadge color="green">{{ muscleGroup }}</BaseBadge>
          <BaseBadge color="orange">{{ equipment }}</BaseBadge>
        </div>
        <p v-if="description" class="mt-2 text-xxs text-grey">{{ description }}</p>
      </div>
    </div>
    <div v-if="selected" class="absolute left-full top-0 z-10 ml-2 flex flex-col space-y-2">
      <IconButton color="primary" @click.stop="$emit('edit')">
        <FontAwesomeIcon icon="fa-solid fa-pencil" size="xs" />
      </IconButton>
      <IconButton color="error" @click.stop="$emit('delete')">
        <FontAwesomeIcon icon="fa-solid fa-trash-can" size="xs" />
      </IconButton>
    </div>
  </div>
</template>
