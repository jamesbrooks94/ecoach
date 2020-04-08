import * as Knex from 'knex'

export const up = (knex: Knex): Promise<any> =>
  knex.schema.createTable('email_templates', table => {
    table.increments('id').primary().notNullable().unique()
    table.text('name').notNullable()
    table.integer('application').notNullable().references('application.id')
    table.text('subject').notNullable()
    table.text('content', 'MEDIUMTEXT')
  })

export const down = (knex: Knex): Promise<any> => knex.schema.dropTable('email_templates')
