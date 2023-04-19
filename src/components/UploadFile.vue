<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'

import IconButton from './IconButton.vue'

const props = defineProps<{
  name: string
  title: string
}>()

const { handleChange, errorMessage } = useField<File | null>(() => props.name)

const url = ref<string | null>(null)

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const file = input.files[0]
    handleChange(file)
    url.value = URL.createObjectURL(file)
  }
}

const clearFile = () => {
  url.value = null
  handleChange(null)
}
</script>

<template>
  <div class="w-full">
    <div v-if="url" class="relative flex justify-center">
      <img :src="url" alt="" class="mx-auto max-w-full" />
      <IconButton
        color="error"
        @click="clearFile"
        class="absolute right-2 top-2"
      >
        <FontAwesomeIcon icon="fa-solid fa-trash-can" size="sm" />
      </IconButton>
    </div>
    <label
      v-else
      class="flex h-12 w-full cursor-pointer items-center justify-center rounded border border-blue text-base font-medium text-blue hover:bg-bubbles"
    >
      {{ title }}
      <input type="file" class="sr-only" @change="onFileChange" accept="image/*" />
    </label>
    <span v-if="errorMessage" class="mt-1.5 block text-xs text-red">
      {{ errorMessage }}
    </span>
  </div>
</template>
