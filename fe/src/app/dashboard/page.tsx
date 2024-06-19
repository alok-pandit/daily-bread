'use client'

import { Suspense, useEffect, useRef } from 'react'

import Loading from '../loading'

import { Nav } from './styles'

import ProductCard from '@/components/product-card'
import Spinner from '@/components/spinner'
import useGetProducts from '@/hooks/dashboard'

const Dashboard = () => {
  const query = useGetProducts()
  const cardRef = useRef(null)

  const pageCount = Number(process.env.NEXT_PUBLIC_PAGE_COUNT)
  // const [hasNext, setHasNext] = useState(true)
  // if (query.isError) return <>{query.error.message}</>
  // eslint-disable-next-line no-console
  console.log(query.data)

  // useEffect(() => {
  //   if (
  //     query.data?.pages[query.data.pages.length - 1][0].totalCount === pageCount
  //   ) {
  //     setHasNext(false)
  //   }
  // }, [pageCount, query.data?.pages])

  useEffect(() => {
    if (!cardRef?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (
          Number(query.data?.pages[query.data.pages.length - 1][0].totalCount) >
            pageCount &&
          !query.isFetching
        ) {
          query.fetchNextPage()
        }
        observer.unobserve(entry.target)
      }
    })

    observer.observe(cardRef.current)
  }, [pageCount, query, query.fetchNextPage])

  return (
    <>
      <Nav />
      <div className="w-screen max-h-screen overflow-y-auto p-4 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-16">
          <Suspense fallback={<Loading />}>
            {query &&
              query.data &&
              query.data.pages.length &&
              query.data?.pages.map((productPage) =>
                productPage.map((product, i) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    ref={i % (Number(pageCount) / 2) === 0 ? cardRef : null}
                  />
                ))
              )}
            {query.isFetching &&
            Number(
              query.data?.pages[query.data.pages.length - 1][0].totalCount
            ) != pageCount ? (
              <Spinner full={false} />
            ) : (
              <></>
            )}
          </Suspense>
        </div>
        {/* <div className="hidden">
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
      </div> */}
      </div>
    </>
  )
}

export default Dashboard
