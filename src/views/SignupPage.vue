<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import TextField from '@/components/TextField.vue'
import UnauthLayoutVue from '@/components/UnauthLayout.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import axios from 'axios'
import * as yup from 'yup'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required().email().default('').label('Email'),
      password: yup.string().required().min(8).default('').label('Password')
    })
  )
})

const onSubmit = handleSubmit(async (values) => {
  const response = await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB-zAf2zmVZqOnItZ4yAvLZ0RRiVxYgbA',
    {
      email: values.email,
      password: values.password,
      returnSecureToken: true
    }
  )

  console.log(response)
})
</script>

<template>
  <UnauthLayoutVue title="Sign up">
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
      <BaseButton size="large" class="w-full mb-4">Sign up</BaseButton>
      <p class="text-sm text-center">
        Already have an account?
        <RouterLink class="text-blue" :to="{ name: 'login' }">Sign in</RouterLink>
      </p>
    </form>
  </UnauthLayoutVue>
</template>
