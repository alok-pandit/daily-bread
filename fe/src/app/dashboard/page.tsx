'use client'

import { useEffect, useState } from 'react'

import Button from '@/components/ui-primitives/button'
import useGetProducts from '@/hooks/dashboard'

const Dashboard = () => {
  const query = useGetProducts()

  const [hasNext, setHasNext] = useState(true)
  // if (query.isError) return <>{query.error.message}</>
  // eslint-disable-next-line no-console
  console.log(query.data)

  useEffect(() => {
    if (query.data?.pages[query.data.pages.length - 1][0].totalCount === 100) {
      setHasNext(false)
    }
  }, [query.data?.pages])

  return (
    <>
      <h1>Dashboard</h1>
      <div className="w-full h-screen/2 bg-transparent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {query.data?.pages.map((productPage) =>
          productPage.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black dark:bg-slate-700"
            >
              {product.name}
            </div>
          ))
        )}
      </div>
      <Button
        onClick={() => !query.isFetching && hasNext && query.fetchNextPage()}
        title={
          query.isFetchingNextPage
            ? 'Loading more...'
            : hasNext
              ? 'Load More'
              : "That's all folks!"
        }
      />
    </>
  )
}

export default Dashboard
