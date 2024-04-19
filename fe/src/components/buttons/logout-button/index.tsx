'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

// import { useLogoutQuery } from '@/codegen/gen/hooks/queries.hooks'
import Button from '@/components/ui-primitives/button'

const LogoutButton = () => {
  // const router = useRouter()

  // const [{ data: logoutData }, reexecuteQuery] = useLogoutQuery({
  //   pause: true,
  //   requestPolicy: 'network-only'
  // })

  // useEffect(() => {
  //   if (logoutData?.logout.success) {
  //     router.replace('/')
  //   }
  // }, [logoutData, logoutData?.logout, router])

  return (
    <Button
      title={'Logout'}
      onClick={() => {
        // reexecuteQuery()
      }}
    />
  )
}

export default LogoutButton
