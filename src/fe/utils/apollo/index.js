import { useSnackbar } from 'notistack'
import { useQuery as HookQuery, useMutation as HookMutation } from '@apollo/react-hooks'

import { notifcationSettings } from '../notistack'
import ApolloClass, { sortParams, hookLogger } from './apollo.class'

export const useQuery = function (query) {
  const { enqueueSnackbar } = useSnackbar()
  const { options = {} } = sortParams([...arguments])
  const { loading, data: queryData, error, refetch } = HookQuery(query, {
    fetchPolicy: 'cache-and-network',
    ...options,
  })
  let transformData = {}
  if (queryData) transformData = new ApolloClass(queryData).start()
  if (error && !options.noError) hookLogger(enqueueSnackbar, error)
  return {
    queryData,
    error,
    loading,
    data: transformData,
    refetch,
  }
}

export const useMutation = function (query) {
  const { enqueueSnackbar } = useSnackbar()
  const { options = {}, refetch } = sortParams([...arguments])
  const { notificationMessage = null, notificationMessageVariant = 'success' } = options || {}
  const [mutation, { loading, error, called, client }] = HookMutation(query, {
    ...options,
    onCompleted: result => {
      if (refetch) refetch(result)
      if (notificationMessage)
        enqueueSnackbar(notificationMessage, {
          ...notifcationSettings,
          variant: notificationMessageVariant,
          'data-testid': 'snackbar',
        })
    },
  })
  if (error) hookLogger(enqueueSnackbar, error)
  return [mutation, { loading, error, called, client }]
}
