// Update with your config settings.
import { env } from './config'

export default {
  client: 'postgresql',
  connection: env.DB_CONNECTION,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: env.MIGRATIONS_DIRECTORY,
    tableName: 'knex_migrations',
  },
}
