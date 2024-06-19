import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { GetProducts, GetUserByID } from '@/apis/dashboard'

const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ['get-products'],
    queryFn: GetProducts,
    initialPageParam: '',
    getNextPageParam: (lastPage, _pages) => lastPage[0].lastCursor,
    getPreviousPageParam: (firstPage, _pages) => firstPage[0].firstCursor
  })
}

const useGetUserDetailsByID = () => {
  return useQuery({
    queryKey: ['get-user-details-by-id'],
    queryFn: () => GetUserByID(String(localStorage.getItem('user_id')))
  })
}

const DashboardHooks = {
  useGetProducts,
  useGetUserDetailsByID
}

export default DashboardHooks
