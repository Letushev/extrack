import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const userId = ref<string | null>(null)
  const accessToken = ref<string | null>(null)

  const isAuthorized = computed(() => accessToken.value !== null)

  let timeoutId: NodeJS.Timeout | null = null

  const authorize = (params: {
    userId: string
    accessToken: string
    /** The number of seconds in which the ID token expires. */
    expiresIn: number
  }) => {
    const expiresAtTimestamp = Date.now() + params.expiresIn * 1000

    localStorage.setItem('accessToken', params.accessToken)
    localStorage.setItem('tokenExpiresAt', expiresAtTimestamp.toString())
    localStorage.setItem('userId', params.userId)

    userId.value = params.userId
    accessToken.value = params.accessToken

    axios.defaults.params = {}
    axios.defaults.params['auth'] = params.accessToken

    timeoutId = setTimeout(logout, params.expiresIn * 1000)
  }

  const tryAutoAuthorize = () => {
    const token = localStorage.getItem('accessToken')
    const expiresAtString = localStorage.getItem('tokenExpiresAt')
    const id = localStorage.getItem('userId')

    if (!token || !expiresAtString || !id) return

    const expiresAtTimestamp = Number(expiresAtString)

    if (expiresAtTimestamp <= Date.now()) return

    userId.value = id
    accessToken.value = token

    axios.defaults.params = {}
    axios.defaults.params['auth'] = token

    timeoutId = setTimeout(logout, expiresAtTimestamp - Date.now())
  }

  const logout = () => {
    userId.value = null
    accessToken.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenExpiresAt')
    localStorage.removeItem('userId')

    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    axios.defaults.params = {}
    router.push({ name: 'login' })
  }

  return {
    isAuthorized,
    userId,
    accessToken,
    authorize,
    tryAutoAuthorize,
    logout
  }
})
