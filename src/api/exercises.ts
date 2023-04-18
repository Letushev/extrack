import { request } from '@/utils/request'

export const addExercise = (input: {
  userId: string
  image: string
  name: string
  muscleGroup: string
  equipment: string
  description: string
}) => {
  return request({
    method: 'POST',
    url: 'https://extrack-4fc97-default-rtdb.firebaseio.com/exercises.json',
    data: input
  })
}
