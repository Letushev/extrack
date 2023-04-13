<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import TextField from '@/components/TextField.vue'
import UnauthLayoutVue from '@/components/UnauthLayout.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import axios from 'axios'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required().email().default('').label('Email'),
      password: yup.string().required().default('').label('Password')
    })
  )
})

const onSubmit = handleSubmit(async (values) => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB-zAf2zmVZqOnItZ4yAvLZ0RRiVxYgbA',
    {
      email: values.email,
      password: values.password,
      returnSecureToken: true
    }
  )

  console.log(response)
  router.push({ name: 'exercises' })
})
</script>

<template>
  <UnauthLayoutVue title="Welcome Back">
    <form @submit="onSubmit">
      <div class="space-y-6 mb-8">
        <TextField name="email" label="Email" autocomplete="email" />
        <TextField
          name="password"
          label="Password"
          type="password"
          autocomplete="current-password"
        />
      </div>
      <BaseButton size="large" class="w-full mb-4">Sign in</BaseButton>
      <p class="text-sm text-center">
        New to ExTrack?
        <RouterLink class="text-blue" :to="{ name: 'signup' }">Create an account</RouterLink>
      </p>
    </form>
  </UnauthLayoutVue>
</template>
