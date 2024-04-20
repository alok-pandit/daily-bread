'use client'
import { api } from '.'

import { GetProductsResponse } from '@/codegen'

export const GetProducts = async ({
  pageParam
}: {
  pageParam: string
}): Promise<GetProductsResponse[]> =>
  api
    .post('products/list', {
      before: '',
      after: pageParam,
      first: 100,
      last: 0
    })
    .then((r) => r.data)
    .catch((e) => e.message)
