import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { redirectToHTTPS } from 'express-http-to-https'
import path from 'path'
import { postgraphile, makeExtendSchemaPlugin, gql } from 'postgraphile'
import { plugin } from './rules'
import { env } from '../config'
import { IUser } from './interfaces'
import { IncomingMessage } from 'http'
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')
import { getProfile } from './security'
// import { getTokenInfo, verifyToken } from './security/utils'
// import { getJwksKey } from './security'

const AUTHENTICATION_FAILED = 'Authentication failed'
const NO_BEARER_TOKEN: string = `${AUTHENTICATION_FAILED}, no Bearer token provided in request`
// const TOKEN_FAILED_VALIDATION: string = `${AUTHENTICATION_FAILED}, token failed validation`
const ERROR_GETTING_PROFILE: string = `${AUTHENTICATION_FAILED}, Error getting profile`
const PROFILE_NOT_FOUND: string = `${AUTHENTICATION_FAILED}, profile not found`

const getUser = async (req: IncomingMessage) => {
  const { authorization } = req.headers
  let profile: IUser

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Error(NO_BEARER_TOKEN)
  }
  const token = authorization.substr(7)
  // const { kid } = getTokenInfo(token)

  // const jwksKey = await getJwksKey(kid)

  // try {
  //   await verifyToken(token, jwksKey)
  // } catch (err) {
  //   throw new Error(TOKEN_FAILED_VALIDATION)
  // }
  try {
    profile = await getProfile(token)
    if (!profile) {
      throw new Error(ERROR_GETTING_PROFILE)
    }
  } catch (err) {
    console.log(err)
    throw new Error(PROFILE_NOT_FOUND)
  }
  return profile
}

const extend = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      type UserInfo {
        id: String!
        name: String!
        tenant: Int!
        email: String!
        roles: [String!]
      }
      extend type Query {
        me: UserInfo
      }
    `,
    resolvers: {
      Query: {
        me: {
          resolve(_parent, _args, { user }) {
            console.log(user)
            if (user) return user
          },
        },
      },
    },
  }
})

const server = (appPath: string) => {
  const app = express()

  const { AUTH_DOMAIN, AUTH_CLIENT_ID, AUDIENCE } = process.env

  app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))

  app.use(morgan('combined'))

  const securityMiddleware = [
    helmet.hidePoweredBy(),
    helmet.frameguard(),
    helmet.noSniff(),
    helmet.xssFilter(),
  ]

  app.use(securityMiddleware)

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  app.use(
    postgraphile(env.DB_CONNECTION, 'public', {
      additionalGraphQLContextFromRequest: async (req): Promise<any> => {
        try {
          const user2 = await getUser(req)
          return { user: user2 }
        } catch (err) {
          console.log(err)
        }
        return {
          user: null,
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

  app.get('/config', (_req, res) => {
    res.json({
      AUTH_DOMAIN,
      AUTH_CLIENT_ID,
      AUDIENCE,
    })
  })

  app.use(express.static(appPath))

  app.get('/*', function (_req, res) {
    res.sendFile(path.join(appPath, 'index.html'))
  })

  app.set('host', process.env.HOST || 'localhost')
  app.set('port', process.env.PORT || 5000)

  app.listen(app.get('port'), function () {
    console.log('Server started: http://%s:%s', app.get('host'), app.get('port')) // eslint-disable-line no-console
  })
}

export default server
