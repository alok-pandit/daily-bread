'use server'
import { api } from '.'

import { CreateUserInput, CreateUserResponse } from '@/codegen'

export const SignUp = async (
  payload: CreateUserInput
): Promise<CreateUserResponse> =>
  api
    .post('user', payload)
    .then((r) => r.data)
    .catch((e) => e.message)
