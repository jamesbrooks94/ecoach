import { IUser } from '../../interfaces'

export const formatUserInfo = ({ sub, name, ...props }: any): IUser => ({
  email: props.email,
  name: name,
  id: sub,
  roles: props['https://ecoach.uk/roles'],
})
