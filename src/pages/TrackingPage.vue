<script setup lang="ts">
import { format } from 'date-fns'
import { computed, ref } from 'vue'

import { deleteWorkout, getWorkoutLogs } from '@/api/tracking'
import NoData from '@/components/layout/NoData.vue'
import LogWorkoutModal from '@/components/tracking/LogWorkoutModal.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { useMutation } from '@/composables/use-mutation'
import { useQuery } from '@/composables/use-query'
import { useAuthStore } from '@/stores/auth'
import { useToastsStore } from '@/stores/toasts'

type WorkoutLog = {
  workoutId: string
  date: Date
  exercises: Array<{
    exerciseId: string
    image: string
    name: string
    muscleGroup: string
    equipment: string
    description?: string
  }>
}

const { showToast } = useToastsStore()
const { userId } = useAuthStore()

const openLogWorkout = ref(false)
const order = ref<'NEWEST' | 'OLDEST'>('NEWEST')

const $deleteWorkout = useMutation(deleteWorkout)
const workoutToDelete = ref<string | null>(null)

const { data, isLoading, refetch } = useQuery(() => getWorkoutLogs({ userId: userId! }))

const workoutLogs = computed(() =>
  data.value
    ? Object.entries(data.value)
        .map(([workoutId, workout]) => ({
          workoutId,
          ...workout
        }))
        .sort((workoutA, workoutB) =>
          order.value === 'NEWEST'
            ? workoutB.date.getTime() - workoutA.date.getTime()
            : workoutA.date.getTime() - workoutB.date.getTime()
        )
    : []
)

const groupMuscleGroups = (workoutLog: WorkoutLog): Array<string> => {
  const groupedInfo = workoutLog.exercises.reduce<Record<string, number>>((result, exercise) => {
    const muscleGroup = exercise.muscleGroup
    const currentNumber = result[muscleGroup]
    return {
      ...result,
      [muscleGroup]: currentNumber ? currentNumber + 1 : 1
    }
  }, {})

  return Object.entries(groupedInfo)
    .sort((groupA, groupB) => groupB[1] - groupA[1])
    .map(([muscleGroup, count]) => `${count} x ${muscleGroup}`)
}

const confirmDelete = () => {
  $deleteWorkout.mutate(
    { workoutId: workoutToDelete.value! },
    {
      onSuccess: () => {
        refetch()
        showToast({ type: 'success', message: 'Workout has been removed' })
        workoutToDelete.value = null
      }
    }
  )
}
</script>

<template>
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-[2rem] font-medium">Tracking</h1>
    <div class="flex items-center space-x-8">
      <BaseSelect
        v-model="order"
        class="w-[180px]"
        disable-clear-button
        :options="[
          { value: 'NEWEST', label: 'Newest' },
          { value: 'OLDEST', label: 'Oldest' }
        ]"
      />
      <BaseButton @click="openLogWorkout = true" class="flex-none">Log workout</BaseButton>
    </div>
  </div>
  <div v-if="isLoading" class="flex-center h-80">
    <BaseLoader size="large" />
  </div>
  <NoData v-else-if="workoutLogs.length === 0" />
  <div v-else class="space-y-6">
    <div
      v-for="workout of workoutLogs"
      :key="workout.workoutId"
      class="w-full rounded-lg border border-bright-grey bg-white p-6"
    >
      <div class="mb-6 flex items-center">
        <p class="mr-8 text-lg font-medium">
          {{ format(workout.date, 'PP') }}
        </p>
        <div class="flex items-center space-x-2">
          <BaseBadge
            v-for="muscleGroup of groupMuscleGroups(workout)"
            :key="muscleGroup"
            color="green"
          >
            {{ muscleGroup }}
          </BaseBadge>
        </div>

        <button class="ml-auto text-red" @click="workoutToDelete = workout.workoutId">
          <FontAwesomeIcon icon="fa-solid fa-trash-can" size="md" />
        </button>
      </div>
      <div class="grid grid-cols-6 gap-4">
        <div v-for="(exercise, index) of workout.exercises" :key="exercise.exerciseId">
          <img :src="exercise.image" :alt="exercise.image" class="aspect-square object-cover" />
          <div class="mt-2 flex items-start">
            <span
              class="flex-center block h-6 w-6 flex-none rounded-full border border-blue text-xs text-blue"
            >
              {{ index + 1 }}
            </span>
            <p class="ml-2 mt-1 text-xs">{{ exercise.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LogWorkoutModal :open="openLogWorkout" @close="openLogWorkout = false" @success="refetch" />
  <BaseModal
    :open="workoutToDelete !== null"
    title="Delete workout"
    confirm-text="Delete"
    variant="danger"
    @close="workoutToDelete = null"
    @confirm="confirmDelete"
  >
    <p class="text-base text-grey">Are you sure you want to delete this workout?</p>
  </BaseModal>
</template>
