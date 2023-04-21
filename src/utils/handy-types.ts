import type { TypedSchema } from 'vee-validate'

export type TypedSchemaInput<TSchema> = TSchema extends TypedSchema<infer TInput, any>
  ? TInput
  : never

export type TypedSchemaOutput<TSchema> = TSchema extends TypedSchema<any, infer TOutput>
  ? TOutput
  : never
