import { IUser } from '../../interfaces'

export const formatUserInfo = ({ sub, name, ...props }): IUser => ({
  email: props['https://depot.com/email'] || name,
  firstName: '',
  id: sub,
  permissions: props['https://depot.com/permissions'],
  roles: props['https://depot.com/roles'],
  surname: '',
})
