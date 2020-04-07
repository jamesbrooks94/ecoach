import knex from 'knex'
import server from './server/index'
import { createLogger } from './server/logger'
import config from './knexfile'
import { env } from './config'

const migrate = async () => {
  const logger = createLogger('Migrations')
  try {
    if (env.FORCE_RESET) {
      logger.info('Resetting all data as FORCE_RESET is true')
      await knex(config).schema.raw('DROP SCHEMA public CASCADE').createSchema('public')
    }
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
