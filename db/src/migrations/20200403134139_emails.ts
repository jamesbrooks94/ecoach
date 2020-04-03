import * as Knex from 'knex'

export const up = (knex: Knex): Promise<any> =>
  knex.schema.createTable('email', (table) => {
    table.increments('id').notNullable().unique().primary()
    table.text('title').notNullable()
    table.text('content_plain').notNullable()
    table.text('content_html').notNullable()
    table.boolean('sent').notNullable().defaultTo(false)
    table.timestamps(true, true)
    table.integer('member_id').notNullable().references('member.id')
  })

export const down = (knex: Knex): Promise<any> => knex.schema.dropTable('email')
