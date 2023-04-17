import { ref } from 'vue'

export const useMutation = <Data extends any, Input extends Record<string, any>>(
  func: (input: Input) => Promise<Data>
) => {
  const isLoading = ref(false)

  return {
    isLoading,
    mutate: async (
      input: Input,
      {
        onSuccess,
        onError
      }: {
        onSuccess?: (data: Data) => void
        onError?: (error: string) => void
      } = {}
    ) => {
      isLoading.value = true

      try {
        const data = await func(input)
        onSuccess?.(data)
      } catch (error) {
        onError?.(error as string)
      } finally {
        isLoading.value = false
      }
    }
  }
}
