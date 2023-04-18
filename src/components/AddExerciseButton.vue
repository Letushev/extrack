<script setup lang="ts">
import { computed, ref } from 'vue'

import { addExercise } from '@/api/exercises'
import { uploadFile } from '@/api/file'
import { useMutation } from '@/composables/use-mutation'
import { useAuthStore } from '@/stores/auth'
import { useToastsStore } from '@/stores/toasts'

import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import type { ExerciseFormOutput } from './exercise-form/exercise-form-schema'
import ExerciseForm from './exercise-form/ExerciseForm.vue'

const { userId } = useAuthStore()
const { showToast } = useToastsStore()

const $addExercise = useMutation(addExercise)
const $uploadImage = useMutation(uploadFile)

const formId = 'add-exercise-form'
const showModal = ref(false)

const isLoading = computed(() => $addExercise.isLoading.value || $uploadImage.isLoading.value)

const onSubmit = async ({ file, ...rest }: ExerciseFormOutput) => {
  $uploadImage.mutate(file, {
    onError: (error) => {
      showToast({ type: 'error', message: error })
    },
    onSuccess: (image) => {
      $addExercise.mutate(
        {
          userId: userId!,
          image,
          ...rest
        },
        {
          onError: (error) => {
            showToast({ type: 'error', message: `Failed to add exercise. ${error}` })
          },
          onSuccess: () => {
            showModal.value = false
            showToast({ type: 'success', message: 'Exercise has been successfully added' })
          }
        }
      )
    }
  })
}
</script>

<template>
  <BaseButton @click="showModal = true">Add exercise</BaseButton>
  <BaseModal
    title="Add exercise"
    :open="showModal"
    @close="showModal = false"
    :form-id="formId"
    :loading="isLoading"
  >
    <ExerciseForm :formId="formId" @submit="onSubmit" />
  </BaseModal>
</template>
