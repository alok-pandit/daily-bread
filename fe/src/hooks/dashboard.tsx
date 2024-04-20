import { useInfiniteQuery } from '@tanstack/react-query'

import { GetProducts } from '@/apis/dashboard'

const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ['get-products'],
    queryFn: GetProducts,
    initialPageParam: '',
    getNextPageParam: (lastPage, _pages) => lastPage[0].lastCursor,
    getPreviousPageParam: (firstPage, _pages) => firstPage[0].firstCursor
  })
}

export default useGetProducts
