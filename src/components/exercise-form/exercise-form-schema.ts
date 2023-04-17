import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import type { TypedSchemaOutput } from '@/utils/handy-types'

export const exerciseFormSchema = toTypedSchema(
  z.object({
    name: z.string().trim().min(1, 'Name is required').max(50).default('')
  })
)

export type ExerciseFormOutput = TypedSchemaOutput<typeof exerciseFormSchema>
