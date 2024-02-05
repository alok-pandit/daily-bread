import { Alert } from 'react-native'

import { CreateUserInput } from '../codegen/types'

import { api } from '.'

export const login = async (inputs: CreateUserInput) =>
  api
    .post('users', inputs)
    .then((r) => r.data)
    .catch((e) => Alert.alert('Error', e.message))
