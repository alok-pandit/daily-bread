'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '../../ui-primitives/button'
import PopupDialog from '../../ui-primitives/dialog'
import PasswordFormField from '../form-fields/password-form-field'
import UsernameFormField from '../form-fields/username-form-field'

import { darkAtom } from '@/atoms'
import AlertNotification from '@/components/ui-primitives/alerts/alert-notification'
import ToggleSwitch from '@/components/ui-primitives/toggle-switch'
import useLoginMutation from '@/hooks/login'

const formSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4)
})

const defaultValues = {
  username: '',
  password: ''
}

const LoginForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const loginMutation = useLoginMutation()

  const [showAlert, setshowAlert] = useState({ show: false, message: '' })

  async function onSubmit(creds: z.infer<typeof formSchema>) {
    const res = await loginMutation.mutateAsync(creds)
    if (res.success) {
      localStorage.setItem('user_id', res.message)
      router.push('/dashboard')
    } else {
      setshowAlert({ show: true, message: String(res) })
    }
  }

  const [isDark, setIsDark] = useAtom(darkAtom)

  const router = useRouter()

  return (
    <>
      <FormProvider {...methods}>
        <Form.Root
          className="w-full flex flex-col justify-center items-center"
          // className={clmx(
          //   'p-6 rounded-xl shadow-lg border-white border-2 dark:border-none',
          //   'glass z-20 login-box-shadow',
          //   'dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]',
          //   'dark:from-gray-900 dark:to-gray-600'
          // )}
          onSubmit={(e) => {
            e.preventDefault()
            methods.handleSubmit(onSubmit)()
          }}
        >
          {/* <div className="flex justify-between">
            <h1 className={clmx(`text-xl text-center ${textGradient}`)}>
              Login
            </h1>

            <ToggleSwitch
              label="Dark Mode:"
              onChange={setIsDark}
              checked={isDark}
            />
          </div> */}

          {/* <Separator /> */}
          <div className="w-[55%]">
            <UsernameFormField />

            <PasswordFormField />
          </div>

          <div className="flex justify-center gap-16 mt-6">
            <Button title="Login" type="submit" />

            <PopupDialog
              dialogTriggerText={'Sign Up'}
              dialogTitleText={'Sign Up'}
            ></PopupDialog>
          </div>
          <span className="flex flex-1 justify-start w-full mt-4">
            <ToggleSwitch
              label={isDark ? <MoonIcon /> : <SunIcon />}
              onChange={(value) => setIsDark(value)}
              checked={isDark}
            />
          </span>
        </Form.Root>
      </FormProvider>
      {showAlert.show && (
        <AlertNotification
          alertActiontext="Ok"
          alertDescription={showAlert.message}
          alertTitle="Error"
          hideTrigger={true}
          actionFn={setshowAlert}
        />
      )}
    </>
  )
}

export default LoginForm
