'use server'
import { api } from '.'

import { LoginAPIInput, LoginAPIResponse } from '@/codegen'

export const Login = async (
  payload: LoginAPIInput
): Promise<LoginAPIResponse> =>
  api
    .post('user/login', payload)
    .then((r) => r.data)
    .catch((e) => e.message)
