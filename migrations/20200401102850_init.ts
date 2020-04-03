import * as Knex from 'knex'

export const up = (knex: Knex): Promise<any> =>
  knex.schema
    .alterTable('knex_migrations', (table: Knex.TableBuilder) => table.comment('@omit'))
    .alterTable('knex_migrations_lock', (table: Knex.TableBuilder) => table.comment('@omit'))
    .createTable('user', (table: Knex.TableBuilder) => {
      table.text('username').notNullable().unique().primary()
      table.text('first_name').notNullable()
      table.text('surname').notNullable()
      table.text('full_name').notNullable()
      table.text('email').notNullable()
    })
    .createTable('lesson', (table: Knex.TableBuilder) => {
      table.increments('id').notNullable().unique().primary()
      table.text('name').notNullable()
      table.jsonb('days').notNullable().defaultTo('{}')
      table.text('created_by').notNullable()
      table.text('updated_by').notNullable()
      table.timestamps(true, true)
      table.foreign('created_by').references('user.username')
      table.foreign('updated_by').references('user.username')
    })
    .createTable('member', (table: Knex.TableBuilder) => {
      table.increments('id').notNullable().unique().primary()
      table.text('first_name').notNullable()
      table.text('surname').notNullable()
      table.text('full_name').notNullable()
      table.text('user').notNullable()
      table.foreign('user').references('user.username')
    })
    .createTable('member_lesson', (table: Knex.TableBuilder) => {
      table.increments('id').notNullable().unique().primary()
      table.integer('lesson_id').notNullable().references('lesson.id')
      table.integer('member_id').notNullable().references('member.id')
      table
        .enum('status', ['requested', 'accepted'], { useNative: true, enumName: 'member_lesson_status' })
        .notNullable()
        .defaultTo('requested')
    })

export const down = (knex: Knex): Promise<any> =>
  knex.schema
    .dropTable('member_lesson')
    .raw('DROP TYPE IF EXISTS member_lesson_status')
    .dropTable('lesson')
    .dropTable('member')
    .dropTable('user')
    .alterTable('knex_migrations', (table: Knex.TableBuilder) => table.comment(''))
    .alterTable('knex_migrations_lock', (table: Knex.TableBuilder) => table.comment(''))
