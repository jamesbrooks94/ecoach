import { IUser } from '../../interfaces'

interface IMetaData {
  tenant?: number
}

export const formatUserInfo = ({ sub, name, email, ...props }: any): IUser => {
  const metaData: IMetaData = props['https://ecoach.uk/user_metadata']
  const tenant = metaData.tenant

  return {
    email: email,
    name: name,
    id: sub,
    roles: props['https://ecoach.uk/roles'],
    tenant: tenant,
  }
}
