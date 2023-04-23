<script setup lang="ts">
import { useForm } from 'vee-validate'

import FormSelect from '@/components/form/FormSelect.vue'
import TextField from '@/components/ui/TextField.vue'
import UploadFile from '@/components/ui/UploadFile.vue'
import { equipmentOptions } from '@/constants/equipment-options'
import { muscleGroupOptions } from '@/constants/muscle-group-options'
import { createFileFromUrl } from '@/utils/create-file-from-url'

import {
  type ExerciseFormInput,
  type ExerciseFormOutput,
  exerciseFormSchema
} from './exercise-form-schema'

const props = defineProps<{
  formId: string
  variant: 'create' | 'edit'
  imageUrl?: string
  initialValues?: ExerciseFormInput
}>()

const emit = defineEmits<{
  (emit: 'submit', values: ExerciseFormOutput): void
}>()

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: exerciseFormSchema,
  initialValues: props.initialValues
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

const initFile = async () => {
  if (props.imageUrl) {
    const file = await createFileFromUrl(props.imageUrl, 'image.jpg')
    setFieldValue('file', file)
  }
}

initFile()
</script>

<template>
  <form :id="formId" novalidate @submit="onSubmit" class="space-y-6">
    <UploadFile
      name="file"
      title="Upload exercise image"
      :initialUrl="imageUrl"
      :disableDelete="variant === 'edit'"
    />
    <TextField name="name" label="Name" />
    <FormSelect name="muscleGroup" label="Muscle group" :options="muscleGroupOptions" />
    <FormSelect name="equipment" label="Equipment" :options="equipmentOptions" />
    <TextField name="description" label="Description" multiline />
  </form>
</template>
