import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { redirectToHTTPS } from 'express-http-to-https'
import path from 'path'
import { postgraphile, makeExtendSchemaPlugin, gql } from 'postgraphile'
import { plugin } from './rules'
import { env } from '../config'
import { IUser } from './interfaces'
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')

const extend = makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      type UserInfo {
        id: String!
        firstName: String!
      }
      extend type Query {
        me: UserInfo
      }
    `,
    resolvers: {
      Query: {
        me: {
          resolve(_parent, _args, { user }) {
            if (user) return user
            return { id: 'Not set', name: 'Not set' }
          },
        },
      },
    },
  }
})

const server = (appPath: string) => {
  const app = express()

  const { REACT_APP_AUTH_DOMAIN, REACT_APP_AUTH_CLIENT_ID, REACT_APP_AUDIENCE } = process.env

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
        const user: IUser = {
          id: 'Not set properly',
          firstName: 'James',
          surname: 'James',
          email: 'james@dev.io',
          permissions: [],
          roles: [],
        }
        return {
          user,
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
      REACT_APP_AUTH_DOMAIN,
      REACT_APP_AUTH_CLIENT_ID,
      REACT_APP_AUDIENCE,
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
