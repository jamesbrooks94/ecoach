// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING || 'postgres://postgres@localhost:5432/ecoach',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
