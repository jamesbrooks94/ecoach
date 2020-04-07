import knex from 'knex'
import server from './server/index'
import { createLogger } from './server/logger'
import config from './knexfile'

const migrate = async () => {
  const logger = createLogger('Migrations')
  try {
    // await knex(config).migrate.rollback(undefined, true)
    logger.info('Starting')
    await knex(config).migrate.latest()
    logger.info('Migrated')
  } catch (e) {
    logger.error('Error migrating')
    logger.error(e)
    // process.exit(1)
  }
}
migrate().then(() => server(__dirname))
// server(__dirname)
