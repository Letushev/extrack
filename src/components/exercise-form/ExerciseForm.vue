<script setup lang="ts">
import { useForm } from 'vee-validate'

import BaseSelect from '../BaseSelect.vue'
import TextField from '../TextField.vue'
import UploadFile from '../UploadFile.vue'
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
  <form :id="formId" novalidate @submit="onSubmit" class="space-y-6">
    <UploadFile name="file" title="Upload exercise image" />
    <TextField name="name" label="Name" />
    <BaseSelect
      name="muscleGroup"
      label="Muscle group"
      :options="[
        { value: '1', label: 'Foo' },
        { value: '2', label: 'Bar lorem' }
      ]"
    />
    <BaseSelect
      name="equipment"
      label="Equipment"
      :options="[
        { value: '1', label: 'Foo' },
        { value: '2', label: 'Bar lorem' }
      ]"
    />
    <TextField name="description" label="Description" multiline />
  </form>
</template>
