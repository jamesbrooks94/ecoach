import express from 'express'
import { postgraphile } from 'postgraphile'
import { env } from './config'
import knex from 'knex'
import config from './knexfile'
import { createLogger } from './logger'
import bff from './bff'

const logger = createLogger('ecoach-db')

logger.info('Starting migration')
const client = knex(config)

const init = async () => {
  try {
    await client.migrate.latest()
    logger.info('Migrated to latest DB')

    const db = express()

    db.use(
      postgraphile(env.DB_CONNECTION, 'public', {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        graphiqlRoute: '/',
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
