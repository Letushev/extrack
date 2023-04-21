<script setup lang="ts">
import { deleteExercise } from '@/api/exercises'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useMutation } from '@/composables/use-mutation'
import { useToastsStore } from '@/stores/toasts'

const props = defineProps<{
  open: boolean
  exerciseName: string
  exerciseId: string
}>()

const { showToast } = useToastsStore()

const emit = defineEmits<{
  (emit: 'close'): void
  (emit: 'success'): void
}>()

const $delete = useMutation(deleteExercise)

const confirmDelete = () => {
  $delete.mutate(
    { exerciseId: props.exerciseId },
    {
      onSuccess: () => {
        showToast({ type: 'success', message: 'Exercise has been removed' })
        emit('success')
        emit('close')
      }
    }
  )
}
</script>

<template>
  <BaseModal
    :open="open"
    title="Delete exercise"
    confirm-text="Delete"
    variant="danger"
    @close="$emit('close')"
    @confirm="confirmDelete"
  >
    <p class="text-base text-grey">
      Are you sure you want to delete this exercise ({{ exerciseName }})? You won’t be able to
      recover it.
    </p>
  </BaseModal>
</template>
