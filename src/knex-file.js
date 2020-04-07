module.exports = {
  client: 'postgresql',
  connection: 'postgres://postgres@localhost:5432/ecoach',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
}
