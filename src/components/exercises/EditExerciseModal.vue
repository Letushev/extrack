<script setup lang="ts">
import { editExercise } from '@/api/exercises'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useMutation } from '@/composables/use-mutation'
import { useAuthStore } from '@/stores/auth'
import { useToastsStore } from '@/stores/toasts'

import type { ExerciseFormOutput } from './exercise-form/exercise-form-schema'
import ExerciseForm from './exercise-form/ExerciseForm.vue'

type Exercise = {
  exerciseId: string
  image: string
  name: string
  muscleGroup: string
  equipment: string
  description?: string
}

const props = defineProps<{
  open: boolean
  exercise: Exercise
}>()

const { userId } = useAuthStore()
const { showToast } = useToastsStore()

const emit = defineEmits<{
  (emit: 'close'): void
  (emit: 'success'): void
}>()

const $edit = useMutation(editExercise)

const formId = 'edit-exercise-form'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmEdit = ({ file, ...values }: ExerciseFormOutput) => {
  $edit.mutate(
    {
      userId: userId!,
      exerciseId: props.exercise.exerciseId,
      image: props.exercise.image,
      ...values
    },
    {
      onSuccess: () => {
        showToast({ type: 'success', message: 'Exercise has been updated' })
        emit('success')
        emit('close')
      }
    }
  )
}
</script>

<template>
  <BaseModal :open="open" title="Edit exercise" :form-id="formId" @close="$emit('close')">
    <ExerciseForm
      :form-id="formId"
      @submit="confirmEdit"
      variant="edit"
      :initial-values="exercise"
      :imageUrl="exercise.image"
    />
  </BaseModal>
</template>
