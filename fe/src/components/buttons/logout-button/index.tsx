'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Button from '@/components/ui-primitives/button'
import useLogoutMutation from '@/hooks/logout'

const LogoutButton = () => {
  const router = useRouter()

  const { data, mutate } = useLogoutMutation()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.dir(data)
    if (data?.success) {
      router.replace('/')
    }
  }, [data, data?.success, router])

  return <Button title={'Logout'} onClick={mutate} />
}

export default LogoutButton
