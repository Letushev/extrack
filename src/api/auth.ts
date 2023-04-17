import { z } from 'zod'

import { request } from '@/utils/request'

const AuthResponse = z.object({
  idToken: z.string(),
  expiresIn: z.string().transform((value) => Number(value)),
  localId: z.string()
})

export const signUp = ({ email, password }: { email: string; password: string }) => {
  return request(
    {
      method: 'POST',
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB-zAf2zmVZqOnItZ4yAvLZ0RRiVxYgbA',
      data: {
        email,
        password,
        returnSecureToken: true
      }
    },
    AuthResponse,
    {
      EMAIL_EXISTS: 'The email address is already in use by another account.',
      TOO_MANY_ATTEMPTS_TRY_LATER:
        'We have blocked all requests from this device due to unusual activity. Try again later.'
    }
  )
}

export const login = ({ email, password }: { email: string; password: string }) => {
  return request(
    {
      method: 'POST',
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB-zAf2zmVZqOnItZ4yAvLZ0RRiVxYgbA',
      data: {
        email,
        password,
        returnSecureToken: true
      }
    },
    AuthResponse,
    {
      EMAIL_NOT_FOUND: 'Incorrect email or password',
      INVALID_PASSWORD: 'Incorrect email or password',
      USER_DISABLED: 'The user account has been disabled by an administrator.'
    }
  )
}
