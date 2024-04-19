import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import { m } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import FullnameFormField from '../form-fields/fullname-form-field'
import PasswordFormField from '../form-fields/password-form-field'
import UsernameFormField from '../form-fields/username-form-field'

import { CreateUserResponse, ErrorResponse } from '@/codegen'
import Button from '@/components/ui-primitives/button'
import Separator from '@/components/ui-primitives/separator'
import useSignUpMutation from '@/hooks/sign-up'

const formSchema = z.object({
  fullname: z.string().min(4),
  username: z.string().min(4),
  password: z.string().min(4)
})
const defaultValues = {
  fullname: '',
  username: '',
  password: ''
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const SignUpForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const router = useRouter()

  const signUpMutation = useSignUpMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res: CreateUserResponse | ErrorResponse =
      await signUpMutation.mutateAsync(values)
    if (res.success) {
      router.push('/dashboard')
    } else {
      window.alert(res)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form.Root
          onSubmit={(e) => {
            e.preventDefault()
            methods.handleSubmit(onSubmit)()
          }}
        >
          <m.div variants={container} initial="hidden" animate="show">
            <m.span variants={item}>
              <Separator />
            </m.span>
            <m.span variants={item}>
              <FullnameFormField />
            </m.span>
            <m.span variants={item}>
              <UsernameFormField />
            </m.span>
            <m.span variants={item}>
              <PasswordFormField />
            </m.span>
          </m.div>
          <div className="flex justify-center gap-16 mt-6">
            <Button title="Sign Up" type="submit" />
          </div>
        </Form.Root>
      </FormProvider>
    </>
  )
}

export default SignUpForm
