import React from 'react'
import getClient from '../utils/apollo/client'
import { ME } from '../queries/users'
// import Logger from 'utils/logger'

// const logger = new Logger(__filename)

export let AuthContext: any

export const initStubAuthContext = () => {
  AuthContext = React.createContext({
    id: 2,
    email: '23432432423',
    hasPermission: () => true,
    hasPermissions: () => true,
    hasRole: () => true,
    hasNoRole: () => true,
  })
}

export const useAuthContext = () => React.useContext(AuthContext)

export const initialiseAuthContext = async () => {
  const client = await getClient()

  const response = await client.query({ fetchPolicy: 'no-cache', query: ME })

  const { me } = response.data
  const hasPermission = (permission: string) => hasPermissions([permission])
  const hasPermissions = (permissions: string[]) =>
    me.permissions.reduce((acc: boolean, curr: string) => permissions.includes(curr) || acc, false)
  const hasRole = (...roles: string[]) => {
    const rolesFlattened = roles.flat(1)
    return me.roles.reduce(
      (acc: boolean, curr: string) => rolesFlattened.includes(curr) || acc,
      false
    )
  }

  const hasNoRole = (role: string) => !hasRole(role)

  AuthContext = React.createContext({
    ...me,
    hasPermission,
    hasPermissions,
    hasRole,
    hasNoRole,
  })

  return AuthContext
}
