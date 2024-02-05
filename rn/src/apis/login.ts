import { Alert } from 'react-native'

import { LoginAPIInputs } from '../codegen'

import { api } from '.'

export const login = async (creds: LoginAPIInputs) => {
  return api
    .post('user/login', JSON.stringify(creds))
    .then((r) => r.data)
    .catch((e) => Alert.alert('Error', JSON.stringify(e)))
}
