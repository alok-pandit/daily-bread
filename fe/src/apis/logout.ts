'use client'

import { api } from '.'

import { CreateUserResponse } from '@/gen'

export const Logout = async (): Promise<CreateUserResponse> => {
  return api
    .get(`user/secure/logout-now`)
    .then((r) => r.data)
    .catch((e) => e.message)
}
