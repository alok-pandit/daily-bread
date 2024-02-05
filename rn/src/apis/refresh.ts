import { Alert } from 'react-native'

import { api } from '.'

export const Refresh = async () =>
  api
    .get('user/refresh')
    .then((r) => r.data)
    .catch((e) => Alert.alert('Error', e.message))
