import express from 'express'
import { env } from './config'
import knex from 'knex'
import config from './knexfile'
import { createLogger } from './service/logger'
import service from './service'

const logger = createLogger('ecoach-app')

const init = async () => {
  try {
    const client = knex(config)
    logger.info('Starting migration')
    await client.migrate.latest()
    logger.info('Migrated to latest DB')

    const app = express()
    app.get('/ping', (req, res) => res.send({ pong: 123 }))
    service(app)

    app.get('/*', (req, res) => res.send('Routed'))
    app.listen(env.PORT, () => {
      logger.info(`Listening on port ${env.PORT}`)
    })
  } catch (e) {
    logger.error('Migration to latest DB failed')
    logger.error(e)
  }
}

init()
