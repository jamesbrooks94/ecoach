import { env } from './config'

const config = {
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

export default config
module.exports = config
