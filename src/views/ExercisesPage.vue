<script setup lang="ts">
import { computed, ref } from 'vue'

import { getExercises } from '@/api/exercises'
import AddExerciseButton from '@/components/AddExerciseButton.vue'
import DeleteExerciseModal from '@/components/DeleteExerciseModal.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
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

const { data, refetch } = useQuery(() => getExercises({ userId: userId! }))
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
</script>

<template>
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-[2rem] font-medium">My Exercises</h1>
    <AddExerciseButton />
  </div>
  <div class="grid grid-cols-5 gap-4">
    <ExerciseCard
      v-for="exercise of exercises"
      :key="exercise.exerciseId"
      v-bind="exercise"
      :selected="selectedExercise?.exerciseId === exercise.exerciseId"
      @click="selectExercise(exercise)"
      @delete="exerciseAction = 'delete'"
    />
  </div>

  <DeleteExerciseModal
    v-if="selectedExercise"
    :open="exerciseAction === 'delete'"
    :exercise-id="selectedExercise.exerciseId"
    :exercise-name="selectedExercise.name"
    @close="exerciseAction = null"
    @success="refetch"
  />
</template>
