import knex from 'knex'
import server from './server/index'
import { createLogger } from './server/logger'
import config from './knexfile'

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
migrate()
server(__dirname)
