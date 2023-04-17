import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastConfig = {
  type: 'success' | 'error'
  message: string
}

type Toast = {
  toastId: string
} & ToastConfig

export const useToastsStore = defineStore('toasts', () => {
  const toasts = ref<Array<Toast>>([])

  const showToast = (newToast: ToastConfig) => {
    const toastId = crypto.randomUUID()
    toasts.value.unshift({ toastId, ...newToast })
    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.toastId !== toastId)
    }, 5000)
  }

  return {
    toasts,
    showToast
  }
})
