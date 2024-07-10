import { Alert } from 'react-native'

import { LoginAPIInput } from '../gen'

import { api } from '.'

export const login = async (creds: LoginAPIInput) => {
  return api
    .post('user/login', JSON.stringify(creds))
    .then(r => r.data)
    .catch(e => Alert.alert('Error', JSON.stringify(e)))
}
