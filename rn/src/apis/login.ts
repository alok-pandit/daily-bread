import { Alert } from 'react-native'

import { LoginAPIInputs } from '../codegen'

import { api } from '.'

export const login = async (creds: LoginAPIInputs) =>
  api
    .post('users/login', creds)
    .then((r) => r.data)
    .catch((e) => Alert.alert('Error', e.message))
