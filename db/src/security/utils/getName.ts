import { User, AppMetadata, UserMetadata } from 'auth0'

export const getName = (user: User<AppMetadata, UserMetadata>): string => {
  const userMetadata = user.user_metadata
  if (userMetadata === undefined || userMetadata.name === undefined) {
    if (user.nickname !== undefined) {
      return user.nickname
    }
    return 'Unknown user'
  } else {
    return userMetadata.name
  }
}
