import express from 'express'
import { postgraphile } from 'postgraphile'
import { env } from './config'
import knex from 'knex'
import { config } from './knexfile'
import { createLogger } from './logger'

const logger = createLogger('e-coach-db')

logger.info('Starting migration')
const client = knex(config.development)
client.migrate
  .latest()
  .then(() => {
    logger.info('Migrated to latest DB')
  })
  .catch((e) => {
    logger.error('Migration to latest DB failed')
    logger.error(e)
  })

const app = express()

app.use(
  postgraphile(env.DB_CONNECTION, 'public', {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    graphiqlRoute: '/',
  })
)
const port = env.PORT || 8000
app.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})
