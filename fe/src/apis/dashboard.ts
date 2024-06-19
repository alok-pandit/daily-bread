'use client'
import { api } from '.'

import { GetProductsResponse, GetUserByIDResponse } from '@/gen'

export const GetProducts = async ({
  pageParam
}: {
  pageParam: string
}): Promise<GetProductsResponse[]> =>
  api
    .post('products/list', {
      before: '',
      after: pageParam,
      first: Number(process.env.NEXT_PUBLIC_PAGE_COUNT),
      last: 0
    })
    .then((r) => r.data)
    .catch((e) => e.message)

export const GetUserByID = async (id: string): Promise<GetUserByIDResponse> => {
  return api
    .get(`user/secure/${id}`)
    .then((r) => r.data)
    .catch((e) => e.message)
}
