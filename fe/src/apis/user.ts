'use client'

import { api } from '.'

import { GetUserByIDResponse } from '@/gen'

export const GetUserByID = async (id: string): Promise<GetUserByIDResponse> => {
  return api
    .get(`user/secure/${id}`)
    .then((r) => r.data)
    .catch((e) => e.message)
}
