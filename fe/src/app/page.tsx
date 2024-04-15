'use client'

import { BgMain, LoginBox } from './styles'

import LoginForm from '@/components/forms/login-form'

export default function Home() {
  return (
    <BgMain>
      <LoginBox>
        <div className="flex w-full">
          <h1 className="flex flex-auto justify-center text-white">Login</h1>
        </div>
        <LoginForm />
      </LoginBox>
    </BgMain>
  )
}
