import express from 'express'
import { postgraphile, makeProcessSchemaPlugin } from 'postgraphile'
import { env } from './config'
import knex from 'knex'
import config from './knexfile'
import { createLogger } from './logger'
import bff from './bff'
import { shield, rule } from 'graphql-shield'
import { applyMiddleware } from 'graphql-middleware'

const logger = createLogger('ecoach-db')

export const allow = rule()((_a, _b, { user }, { fieldName }) => {
  console.log(user, fieldName)
  return true
})

const permissions = shield(
  {
    Query: {
      '*': allow,
    },
  },
  {
    fallbackError: Error('You may not have permissions to perform this action'),
    allowExternalErrors: true, // Show internal errors
  }
)

const plugin = makeProcessSchemaPlugin((schema) => applyMiddleware(schema, permissions))

logger.info('Starting migration')
const client = knex(config)

const init = async () => {
  try {
    await client.migrate.latest()
    logger.info('Migrated to latest DB')

    const db = express()

    db.use(
      postgraphile(env.DB_CONNECTION, 'public', {
        additionalGraphQLContextFromRequest: async (req, res): Promise<any> => {
          return {
            user: 'james',
          }
        },
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        graphiqlRoute: '/',
        appendPlugins: [plugin],
      })
    )

    db.listen(env.DB_PORT, () => {
      logger.info(`Listening on port ${env.DB_PORT}`)
      bff()
    })
  } catch (e) {
    logger.error('Migration to latest DB failed')
    logger.error(e)
  }
}

init()
