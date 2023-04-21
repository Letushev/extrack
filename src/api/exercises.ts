import { z } from 'zod'

import { request } from '@/utils/request'

type ExerciseInput = {
  userId: string
  image: string
  name: string
  muscleGroup: string
  equipment: string
  description?: string
}

export const addExercise = (input: ExerciseInput) => {
  return request({
    method: 'POST',
    url: 'https://extrack-4fc97-default-rtdb.firebaseio.com/exercises.json',
    data: input
  })
}

const Exercises = z.record(
  z.string(),
  z.object({
    image: z.string(),
    name: z.string(),
    muscleGroup: z.string(),
    equipment: z.string(),
    description: z.string().optional()
  })
)

export const getExercises = ({ userId }: { userId: string }) => {
  return request(
    {
      method: 'GET',
      url: 'https://extrack-4fc97-default-rtdb.firebaseio.com/exercises.json',
      params: {
        orderBy: '"userId"',
        equalTo: `"${userId}"`
      }
    },
    Exercises
  )
}

export const deleteExercise = ({ exerciseId }: { exerciseId: string }) => {
  return request({
    method: 'DELETE',
    url: `https://extrack-4fc97-default-rtdb.firebaseio.com/exercises/${exerciseId}.json`
  })
}

export const editExercise = ({ exerciseId, ...input }: { exerciseId: string } & ExerciseInput) => {
  return request({
    method: 'PUT',
    url: `https://extrack-4fc97-default-rtdb.firebaseio.com/exercises/${exerciseId}.json`,
    data: input
  })
}
