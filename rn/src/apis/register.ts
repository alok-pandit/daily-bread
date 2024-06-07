import { Alert } from 'react-native'

import { CreateUserInput } from '../gen'

import { api } from '.'

export const login = async (inputs: CreateUserInput) =>
  api
    .post('users', inputs)
    .then((r) => r.data)
    .catch((e) => Alert.alert('Error', e.message))
