import { onMounted, ref } from 'vue'

export const useQuery = <TData extends any>(func: () => Promise<TData>) => {
  const data = ref<TData>()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sendQuery = async () => {
    isLoading.value = true

    try {
      const response = await func()
      data.value = response
    } catch (e) {
      error.value = e as string
      data.value = undefined
    } finally {
      isLoading.value = false
    }
  }

  onMounted(sendQuery)

  return {
    data,
    isLoading,
    error,
    refetch: sendQuery
  }
}
