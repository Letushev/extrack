<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { z } from 'zod'

import { login } from '@/api/auth'
import UnauthLayoutVue from '@/components/layout/UnauthLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import TextField from '@/components/ui/TextField.vue'
import { useMutation } from '@/composables/use-mutation'
import { useAuthStore } from '@/stores/auth'
import { useToastsStore } from '@/stores/toasts'

const router = useRouter()

const authStore = useAuthStore()
const { showToast } = useToastsStore()

const { mutate, isLoading } = useMutation(login)

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().trim().min(1, 'Email is required').email().default(''),
      password: z.string().min(1, 'Password is required').default('')
    })
  )
})

const onSubmit = handleSubmit((values) => {
  mutate(
    {
      email: values.email,
      password: values.password
    },
    {
      onSuccess: (data) => {
        authStore.authorize({
          userId: data.localId,
          accessToken: data.idToken,
          expiresIn: data.expiresIn
        })

        router.push({ name: 'tracking' })
      },
      onError: (error) => {
        showToast({ type: 'error', message: error })
      }
    }
  )
})
</script>

<template>
  <UnauthLayoutVue title="Welcome Back">
    <form @submit="onSubmit">
      <div class="mb-8 space-y-6">
        <TextField name="email" label="Email" autocomplete="email" />
        <TextField
          name="password"
          label="Password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <BaseButton size="large" class="mb-4 w-full" :is-loading="isLoading">Sign in</BaseButton>
      <p class="text-center text-sm">
        New to ExTrack?
        <RouterLink class="text-blue" :to="{ name: 'signup' }">Create an account</RouterLink>
      </p>
    </form>
  </UnauthLayoutVue>
</template>
