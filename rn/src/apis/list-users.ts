import { Alert } from 'react-native'

import { api } from '.'

export const ListUsers = async () =>
  api
    .get('user/secure')
    .then(r => r.data)
    .catch(e => Alert.alert('Error', e.message))
