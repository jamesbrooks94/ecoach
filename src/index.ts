import express, { Request, Response } from 'express'
import next from 'next'

import { env } from './config'
import knex from 'knex'
import config from './knexfile'
import { createLogger } from './service/logger'
import service from './service'

const logger = createLogger('ecoach-app')

const app = next({ dev: env.isDev })
const handle = app.getRequestHandler()

const migrate = async () => {
  const logger = createLogger('ecoach-migrations')
  try {
    logger.info('Starting')
    await knex(config).migrate.latest()
    logger.info('Migrated')
  } catch (e) {
    logger.error('Error migrating')
    logger.error(e)
    // process.exit(1)
  }
}

;(async () => {
  await Promise.all([app.prepare(), migrate()])
  const server = express()

  server.get('/ping', (req, res) => res.send({ pong: 123 }))
  service(server)

  server.get('/*', (req: Request, res: Response) => {
    return handle(req, res)
  })
  server.listen(env.PORT, () => {
    logger.info(`Listening on port ${env.PORT}`)
  })
})()
