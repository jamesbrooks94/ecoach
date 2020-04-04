import * as Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex('application').del().insert({ id: 1, name: 'BLTC' })
}

export async function down(knex: Knex): Promise<any> {}
