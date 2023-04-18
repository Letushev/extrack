import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import type { TypedSchemaOutput } from '@/utils/handy-types'
import { nullableInput } from '@/utils/zod-schema'

export const exerciseFormSchema = toTypedSchema(
  z.object({
    file: nullableInput(z.instanceof(File), 'File is required'),
    name: z.string().trim().min(1, 'Name is required').max(50).default(''),
    muscleGroup: z.string().min(1, 'Muscle group is required').default(''),
    equipment: z.string().min(1, 'Equipment is required').default(''),
    description: z.string().trim().max(300).default('')
  })
)

export type ExerciseFormOutput = TypedSchemaOutput<typeof exerciseFormSchema>
