import type { z } from 'zod'

export const nullableInput = <TSchema extends z.ZodType>(schema: TSchema, message: string) => {
  return schema
    .nullable()
    .default(null)
    .refine((value) => value !== null, { message })
    .transform((value) => value as Exclude<typeof value, null>)
}
