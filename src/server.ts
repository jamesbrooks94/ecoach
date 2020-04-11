import knex from 'knex'
import server from './server/index'
import { createLogger } from './server/util/logger'
import config from './knexfile'
import { env } from './config'

const migrate = async () => {
  const logger = createLogger('Migrations')
  try {
    const db = knex(config)
    if (env.FORCE_RESET) {
      logger.info('Resetting all data as FORCE_RESET is true')
      await db.schema.raw('DROP SCHEMA public CASCADE').createSchema('public')
    }
    if (env.REGENERATE_LAST) {
      logger.info('Resetting last migration as REGENERATE_LAST is true')
      await db.migrate.rollback()
    }
    logger.info('Starting')
    await db.migrate.latest()
    logger.info('Migrated')
  } catch (e) {
    logger.error('Error migrating')
    logger.error(e)
  }
}
migrate().then(() => server(__dirname))
