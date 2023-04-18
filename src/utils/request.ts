import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { z, type ZodTypeAny } from 'zod'

const ClientErrorSchema = z.object({
  error: z.object({
    message: z.string()
  })
})

/** Simple axios request with strict response schema and primitive error handling  */
export const request = async <TResponseSchema extends ZodTypeAny>(
  requestConfig: AxiosRequestConfig,
  responseSchema?: TResponseSchema,
  clientErrors: Record<string, string> = {}
) => {
  try {
    const response = await axios(requestConfig)

    if (!responseSchema) return

    const parsedData = responseSchema.safeParse(response.data)

    if (parsedData.success) {
      return parsedData.data as z.infer<typeof responseSchema>
    } else {
      throw 'Failed to parse the response'
    }
  } catch (error) {
    if (typeof error === 'string') {
      throw error
    }

    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status >= 400) {
          const parsedError = ClientErrorSchema.safeParse(error.response.data)

          if (parsedError.success) {
            throw clientErrors[parsedError.data.error.message] ?? parsedError.data.error.message
          }

          throw `Something went wrong: ${error.message}`
        }

        if (error.response.status >= 500) {
          throw 'The server encountered an error and could not complete your request. Please try again later.'
        }
      }
    }

    throw 'An unexpected error occurred. Please try again later.'
  }
}
