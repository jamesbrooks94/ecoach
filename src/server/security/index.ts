import { ManagementClient, AppMetadata, UserMetadata, AuthenticationClient } from 'auth0'
import { default as createJwksClient, JwksClient, SigningKey } from 'jwks-rsa'
import { Logger } from 'winston'
import { IUser } from '../interfaces'
import { createLogger } from '../util/logger'

import { env } from '../../config'
import { getSigningKey, formatUserInfo } from './utils'

const logger: Logger = createLogger(`Auth`)

let managementClient: ManagementClient<AppMetadata, UserMetadata>
let authenticationClient: AuthenticationClient
let jwksClient: JwksClient

const { AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } = env

managementClient = new ManagementClient({
  domain: AUTH_DOMAIN,
  clientId: AUTH_CLIENT_ID,
  clientSecret: AUTH_CLIENT_SECRET,
  scope: 'read:users',
})

authenticationClient = new AuthenticationClient({ domain: AUTH_DOMAIN })

jwksClient = createJwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://ecoach.eu.auth0.com/.well-known/jwks.json`,
})

logger.info(`Auth service started`)

export const getJwksKey = async (kid: string): Promise<string> =>
  new Promise((resolve, reject) => {
    jwksClient.getSigningKey(kid, (err, key: SigningKey) => {
      if (err) {
        logger.error('An error occurred getting signing key from remote')
        logger.error(err)
        return reject(err)
      }
      logger.debug('Received signing key from remote, saving to cache')

      const signingKey: string = getSigningKey(key)
      resolve(signingKey)
    })
  })

export const getProfile = async (token: string): Promise<IUser> => {
  let profile = await authenticationClient.getProfile(token)
  logger.debug('Received user profile from Auth0')
  profile = formatUserInfo({ ...profile })

  if (profile && profile.email) {
  } else {
    logger.error('Cannot return profile, no valid profile with email address found', profile)
  }

  return profile
}
