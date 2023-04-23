<script setup lang="ts">
import { computed, ref } from 'vue'

import { getExercises } from '@/api/exercises'
import { logWorkout } from '@/api/tracking'
import ExerciseCard from '@/components/exercises/ExerciseCard.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { useMutation } from '@/composables/use-mutation'
import { useQuery } from '@/composables/use-query'
import { equipmentOptions } from '@/constants/equipment-options'
import { muscleGroupOptions } from '@/constants/muscle-group-options'
import { useAuthStore } from '@/stores/auth'
import { useToastsStore } from '@/stores/toasts'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (emit: 'close'): void
  (emit: 'success'): void
}>()

const { userId } = useAuthStore()
const { showToast } = useToastsStore()

const date = ref<Date | null>(null)

const muscleGroup = ref('')
const equipment = ref('')

const { data, isLoading } = useQuery(() => getExercises({ userId: userId! }))
const exercises = computed(() =>
  data.value
    ? Object.entries(data.value)
        .map(([id, item]) => ({
          exerciseId: id,
          ...item
        }))
        .filter((exercise) => {
          const muscleGroupMatch = !muscleGroup.value || exercise.muscleGroup === muscleGroup.value
          const equipmentMatch = !equipment.value || exercise.equipment === equipment.value
          return muscleGroupMatch && equipmentMatch
        })
    : []
)

const $logWorkout = useMutation(logWorkout)

const selectedExercises = ref(new Set<string>())

const clickExercise = (exerciseId: string) => {
  if (selectedExercises.value.has(exerciseId)) {
    selectedExercises.value.delete(exerciseId)
  } else {
    selectedExercises.value.add(exerciseId)
  }
}

const getExerciseOrder = (exerciseId: string) => {
  return [...selectedExercises.value].indexOf(exerciseId) + 1
}

const closeModal = () => {
  date.value = null
  muscleGroup.value = ''
  equipment.value = ''
  selectedExercises.value.clear()
  emit('close')
}

const submit = () => {
  $logWorkout.mutate(
    {
      userId: userId!,
      date: date.value!,
      exercises: [...selectedExercises.value].map((exerciseId) => ({
        exerciseId,
        ...data.value![exerciseId]
      }))
    },
    {
      onSuccess: () => {
        emit('success')
        showToast({ type: 'success', message: 'Workout has been successfully saved' })
        closeModal()
      }
    }
  )
}
</script>

<template>
  <BaseModal
    :open="open"
    title="Log workout"
    size="large"
    :disabled="selectedExercises.size === 0 || date === null"
    @close="closeModal"
    @confirm="submit"
  >
    <div class="min-h-[600px]">
      <div class="mb-8 flex items-center justify-between">
        <div class="w-[300px]">
          <label for="dp-input-date" class="mb-2 block text-sm text-grey">Date</label>
          <VueDatePicker v-model="date" uid="date" :enable-time-picker="false" />
        </div>
        <div class="ml-6 flex items-center space-x-6">
          <BaseSelect v-model="muscleGroup" label="Muscle group" :options="muscleGroupOptions" />
          <BaseSelect v-model="equipment" label="Equipment" :options="equipmentOptions" />
        </div>
      </div>
      <div v-if="isLoading" class="flex-center h-80">
        <BaseLoader size="large" />
      </div>
      <img
        v-else-if="exercises.length === 0"
        src="@/assets/images/no-data.png"
        alt="No data"
        class="mx-auto w-full max-w-[480px]"
      />
      <div v-else class="grid grid-cols-5 gap-4">
        <ExerciseCard
          v-for="exercise of exercises"
          :key="exercise.exerciseId"
          hideActions
          :logOrder="getExerciseOrder(exercise.exerciseId)"
          v-bind="exercise"
          :selected="selectedExercises.has(exercise.exerciseId)"
          @click="clickExercise(exercise.exerciseId)"
        />
      </div>
    </div>
  </BaseModal>
</template>
