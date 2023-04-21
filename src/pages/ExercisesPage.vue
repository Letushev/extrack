<script setup lang="ts">
import { computed, ref } from 'vue'

import { getExercises } from '@/api/exercises'
import AddExerciseButton from '@/components/exercises/AddExerciseButton.vue'
import DeleteExerciseModal from '@/components/exercises/DeleteExerciseModal.vue'
import EditExerciseModal from '@/components/exercises/EditExerciseModal.vue'
import ExerciseCard from '@/components/exercises/ExerciseCard.vue'
import NoData from '@/components/layout/NoData.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import { useQuery } from '@/composables/use-query'
import { useAuthStore } from '@/stores/auth'

type Exercise = {
  exerciseId: string
  image: string
  name: string
  muscleGroup: string
  equipment: string
  description?: string
}

const { userId } = useAuthStore()

const selectedExercise = ref<Exercise | null>(null)
const exerciseAction = ref<'edit' | 'delete' | null>(null)

const { data, refetch, isLoading } = useQuery(() => getExercises({ userId: userId! }))
const exercises = computed(() =>
  data.value
    ? Object.entries(data.value).map(([id, item]) => ({
        exerciseId: id,
        ...item
      }))
    : []
)

const selectExercise = (exercise: Exercise) => {
  if (selectedExercise.value && selectedExercise.value.exerciseId === exercise.exerciseId) {
    selectedExercise.value = null
  } else {
    selectedExercise.value = exercise
  }

  exerciseAction.value = null
}

const handleUpdate = () => {
  refetch()
  exerciseAction.value = null
  selectedExercise.value = null
}
</script>

<template>
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-[2rem] font-medium">My Exercises</h1>
    <AddExerciseButton @success="refetch" />
  </div>
  <div v-if="isLoading" class="flex-center h-80">
    <BaseLoader size="large" />
  </div>
  <NoData v-else-if="exercises.length === 0" />
  <div v-else class="grid grid-cols-5 gap-4">
    <ExerciseCard
      v-for="exercise of exercises"
      :key="exercise.exerciseId"
      v-bind="exercise"
      :selected="selectedExercise?.exerciseId === exercise.exerciseId"
      @click="selectExercise(exercise)"
      @delete="exerciseAction = 'delete'"
      @edit="exerciseAction = 'edit'"
    />
  </div>

  <DeleteExerciseModal
    v-if="selectedExercise"
    :open="exerciseAction === 'delete'"
    :exercise-id="selectedExercise.exerciseId"
    :exercise-name="selectedExercise.name"
    @close="exerciseAction = null"
    @success="handleUpdate"
  />

  <EditExerciseModal
    v-if="selectedExercise"
    :open="exerciseAction === 'edit'"
    :exercise="selectedExercise"
    @close="exerciseAction = null"
    @success="handleUpdate"
  />
</template>
