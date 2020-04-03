import express from 'express'
import { postgraphile } from 'postgraphile'
import { env } from './config'
import knex from 'knex'
import config from './knexfile'
import { createLogger } from './logger'

const logger = createLogger('e-coach-db')

logger.info('Starting migration')
const client = knex(config)
logger.info
client.migrate
  .latest()
  .then(() => {
    logger.info('Migrated to latest DB')
  })
  .catch((e) => {
    logger.error('Migration to latest DB failed')
    logger.error(e)
  })

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
  logger.info(`DB: Listening on port ${env.DB_PORT}`)
})

const bff = express()
bff.get('/', (_, res) => {
  res.send('Yes!')
})
bff.listen(env.BFF_PORT, () => {
  logger.info(`BFF: Listening on port ${env.BFF_PORT}`)
})
