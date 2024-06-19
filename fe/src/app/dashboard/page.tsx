'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'

import Loading from '../loading'

import { Nav } from './styles'

import LogoutButton from '@/components/buttons/logout-button'
import ProductCard from '@/components/product-card'
import Spinner from '@/components/spinner'
import DashboardHooks from '@/hooks/dashboard'

const Dashboard = () => {
  const { data, error, isFetching, fetchNextPage } =
    DashboardHooks.useGetProducts()
  const cardRef = useRef(null)

  const pageCount = useMemo(
    () => Number(process.env.NEXT_PUBLIC_PAGE_COUNT),
    []
  )

  useEffect(() => {
    if (!cardRef?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (
          Number(data?.pages[data.pages.length - 1][0].totalCount) >
            pageCount &&
          !isFetching
        ) {
          fetchNextPage()
        }
        observer.unobserve(entry.target)
      }
    })

    observer.observe(cardRef.current)
  }, [pageCount, fetchNextPage, data?.pages, isFetching])

  const { data: userData, error: userError } =
    DashboardHooks.useGetUserDetailsByID()

  if (error) {
    return <h1>Error Fetching products</h1>
  }

  if (userError) {
    return <h1>Error fetching user details</h1>
  }

  // eslint-disable-next-line no-console
  console.dir(userData)

  return (
    <>
      <Nav>
        {`Welcome ${(userData && userData.user_details && userData?.user_details.fullname) ?? ''}`}
        <LogoutButton />
      </Nav>
      <div className="w-screen max-h-screen overflow-y-auto p-4 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-16">
          <Suspense fallback={<Loading />}>
            {data &&
              data.pages.length &&
              data?.pages.map((productPage) =>
                productPage.map((product, i) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    ref={i % (Number(pageCount) / 2) === 0 ? cardRef : null}
                  />
                ))
              )}
            {isFetching &&
            Number(data?.pages[data.pages.length - 1][0].totalCount) !=
              pageCount ? (
              <Spinner full={false} />
            ) : (
              <></>
            )}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Dashboard
