import { useMutation } from '@tanstack/react-query'

import { Login } from '@/apis/login'
import { LoginAPIInput } from '@/gen'

const useLoginMutation = () => {
  return useMutation({
    mutationFn: (creds: LoginAPIInput) => Login(creds)
  })
}

export default useLoginMutation
