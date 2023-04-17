import type { TypedSchema } from 'vee-validate'

export type TypedSchemaOutput<TSchema> = TSchema extends TypedSchema<any, infer TOutput>
  ? TOutput
  : never
