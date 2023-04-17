<script setup lang="ts">
import { useForm } from 'vee-validate'

import TextField from '../TextField.vue'
import { type ExerciseFormOutput, exerciseFormSchema } from './exercise-form-schema'

defineProps<{
  formId: string
}>()

const emit = defineEmits<{
  (emit: 'submit', values: ExerciseFormOutput): void
}>()

const { handleSubmit } = useForm({
  validationSchema: exerciseFormSchema
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form :id="formId" novalidate @submit="onSubmit">
    <TextField name="name" label="Name" />
  </form>
</template>
