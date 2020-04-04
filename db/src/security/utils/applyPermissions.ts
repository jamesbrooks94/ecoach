import { getPermissions } from '../permissions'
import { IUser } from '../../interfaces'

export const applyPermissions = (profile: IUser): IUser => {
  profile.permissions = profile.roles.reduce((acc: string[], val: string) => {
    const rolePermissions: string[] = acc.concat(getPermissions(val))
    return rolePermissions.filter((x, y) => rolePermissions.indexOf(x) === y)
  }, [])

  return profile
}
