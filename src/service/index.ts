import { Express } from 'express'
import { postgraphile, makeExtendSchemaPlugin, gql } from 'postgraphile'
import { env } from '../config'
import { createLogger } from './logger'
import { plugin } from './rules'
import { getProfile, getJwksKey } from './security'
import { IUser } from './interfaces'
import { getTokenInfo, verifyToken } from './security/utils'
import { IncomingMessage } from 'http'
import PostGraphileConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'
const logger = createLogger('ecoach-service')

const AUTHENTICATION_FAILED = 'Authentication failed'
const NO_BEARER_TOKEN: string = `${AUTHENTICATION_FAILED}, no Bearer token provided in request`
const TOKEN_FAILED_VALIDATION: string = `${AUTHENTICATION_FAILED}, token failed validation`
const ERROR_GETTING_PROFILE: string = `${AUTHENTICATION_FAILED}, Error getting profile`
const PROFILE_NOT_FOUND: string = `${AUTHENTICATION_FAILED}, profile not found`

export const getUserInfo = async (req: IncomingMessage): Promise<IUser> => {
  const {
    headers: { authorization },
  } = req
  let profile: IUser

  if (!authorization || !authorization.startsWith('Bearer')) {
    logger.error(NO_BEARER_TOKEN)
    throw new Error(NO_BEARER_TOKEN)
  }
  const token = authorization.substr(7)
  const { kid } = getTokenInfo(token)
  logger.debug(`Token received: ${token.substr(0, 10)}...`)

  const jwksKey = await getJwksKey(kid)
  logger.debug(`JWKS key retrieved: ${jwksKey.substr(28, 10)}...`)

  try {
    await verifyToken(token, jwksKey)
  } catch (err) {
    logger.error(TOKEN_FAILED_VALIDATION)
    throw new Error(TOKEN_FAILED_VALIDATION)
  }
  try {
    profile = await getProfile(token)
    if (!profile) {
      logger.error(ERROR_GETTING_PROFILE)
      throw new Error(ERROR_GETTING_PROFILE)
    }
    logger.debug(`Profile successfully received for user <${profile.email}>`)
  } catch (err) {
    logger.error(PROFILE_NOT_FOUND)
    throw new Error(PROFILE_NOT_FOUND)
  }
  return profile
}

const extend = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql, inflection } = build
  console.log(sql)

  return {
    typeDefs: gql`
      type UserInfo {
        id: String!
        name: String!
      }
      extend type Query {
        me: UserInfo
      }
    `,
    resolvers: {
      Query: {
        me: {
          resolve(parent, args, { user }, resolveInfo) {
            return user
          },
        },
      },
    },
  }
})
export default (app: Express) => {
  app.use(
    postgraphile(env.DB_CONNECTION, 'public', {
      additionalGraphQLContextFromRequest: async (req): Promise<any> => {
        try {
          const user = await getUserInfo(req)
          console.log(user)
          return { user }
        } catch (e) {
          // console.log(e)
        }
        return {
          user: 'james',
        }
      },
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      graphiqlRoute: '/graphiql',
      disableQueryLog: true,
      appendPlugins: [PostGraphileConnectionFilterPlugin, extend, plugin],
    })
  )
  return app
}
