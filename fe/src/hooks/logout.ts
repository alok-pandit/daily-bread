import { useMutation } from '@tanstack/react-query'

import { Logout } from '@/apis/logout'

const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ['logout-user'],
    mutationFn: () => Logout(),
    networkMode: 'online'
  })
}

export default useLogoutMutation
