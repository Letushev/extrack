import type { z } from 'zod'

export const nullableInput = <TOutput extends any>(schema: z.ZodType<TOutput>, message: string) => {
  return schema
    .nullable()
    .default(null)
    .refine((value) => value !== null, { message })
    .transform((value) => value as TOutput)
}
