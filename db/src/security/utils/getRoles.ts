import { User, AppMetadata, UserMetadata } from 'auth0'

export const getRoles = (user: User<AppMetadata, UserMetadata>): string[] => {
  const appMetaData = user.app_metadata
  if (appMetaData && appMetaData.authorization && appMetaData.authorization.roles) {
    return appMetaData.authorization.roles
  }
  return []
}
