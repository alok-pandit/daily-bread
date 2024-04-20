'use client'

import { LoginBox } from './styles'

import LoginForm from '@/components/forms/login-form'
import { clmx } from '@/utils'

export default function Home() {
  return (
    <LoginBox>
      <div className="flex w-full justify-center">
        <h1
          className={clmx(
            `text-xl font-bold inline-block dark:bg-gradient-to-l`,
            `bg-gradient-to-r bg-clip-text text-transparent`,
            `from-yellow-500 to-yellow-100 via-yellow-300`,
            `dark:text-yellow-100`
          )}
        >
          Login
        </h1>
      </div>
      <LoginForm />
    </LoginBox>
  )
}
