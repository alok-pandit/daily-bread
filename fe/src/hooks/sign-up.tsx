import { useMutation } from '@tanstack/react-query'

import { SignUp } from '@/apis/sign-up'
import { CreateUserInput } from '@/codegen'

const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (creds: CreateUserInput) => SignUp(creds)
  })
}

export default useSignUpMutation
