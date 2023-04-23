import { z } from 'zod'

import { request } from '@/utils/request'

export const logWorkout = (input: {
  userId: string
  date: Date
  exercises: Array<{
    exerciseId: string
    image: string
    name: string
    muscleGroup: string
    equipment: string
    description?: string
  }>
}) => {
  return request({
    method: 'POST',
    url: 'https://extrack-4fc97-default-rtdb.firebaseio.com/tracking.json',
    data: input
  })
}

const WorkoutLogs = z.record(
  z.string(),
  z.object({
    date: z.coerce.date(),
    exercises: z.array(
      z.object({
        exerciseId: z.string(),
        image: z.string(),
        name: z.string(),
        muscleGroup: z.string(),
        equipment: z.string(),
        description: z.string().optional()
      })
    )
  })
)

export const getWorkoutLogs = ({ userId }: { userId: string }) => {
  return request(
    {
      method: 'GET',
      url: `https://extrack-4fc97-default-rtdb.firebaseio.com/tracking.json`,
      params: {
        orderBy: '"userId"',
        equalTo: `"${userId}"`
      }
    },
    WorkoutLogs
  )
}

export const deleteWorkout = ({ workoutId }: { workoutId: string }) => {
  return request({
    method: 'DELETE',
    url: `https://extrack-4fc97-default-rtdb.firebaseio.com/tracking/${workoutId}.json`
  })
}
