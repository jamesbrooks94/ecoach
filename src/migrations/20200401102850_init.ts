import * as Knex from 'knex'

export const up = (knex: Knex): Promise<any> =>
  knex.schema
    .alterTable('knex_migrations', (table: Knex.TableBuilder) => table.comment('@omit'))
    .alterTable('knex_migrations_lock', (table: Knex.TableBuilder) => table.comment('@omit'))
    .createTable('application', table => {
      table.increments('id').notNullable().unique().primary()
      table.boolean('enabled').notNullable().defaultTo(true)
      table.text('name').notNullable().unique()
      table.text('term_name')
      table.timestamp('term_start_date')
      table.integer('term_length')
      table.text('logo_url')
      table.text('email_from')
      table.text('email_bcc')
      table.text('email_api_key')
      table.text('email_domain')
      table.text('head_coach_name')
      table.text('head_coach_phone_number')
      table.jsonb('payment_details').defaultTo('{}')
    })
    .createTable('user', (table: Knex.TableBuilder) => {
      table.text('username').notNullable().unique().primary()
      table.integer('application').notNullable().references('application.id')
      table.text('first_name').notNullable()
      table.text('surname').notNullable()
      table.text('full_name').notNullable()
      table.text('email').notNullable()
    })
    .createTable('lesson', (table: Knex.TableBuilder) => {
      table.increments('id').notNullable().unique().primary()
      table.integer('application').notNullable().references('application.id')
      table.text('name').notNullable()
      table.text('cost').notNullable().defaultTo('0')

      table
        .enum(
          'day',
          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          {
            enumName: 'lesson_day',
            useNative: true,
          }
        )
        .notNullable()
      table.dateTime('start_time').notNullable()

      table.dateTime('end_time').notNullable()
      table.timestamps(true, true)
    })
    .createTable('member', (table: Knex.TableBuilder) => {
      table.increments('id').notNullable().unique().primary()
      table.text('first_name').notNullable()
      table.text('surname').notNullable()
      table.text('full_name').notNullable()
      table.text('user')
      table.integer('application').notNullable().references('application.id')
      table.foreign('user').references('user.username')
    })
    .createTable('member_lesson', (table: Knex.TableBuilder) => {
      table.increments('id').notNullable().unique().primary()
      table.integer('lesson_id').notNullable().references('lesson.id')
      table.integer('member_id').notNullable().references('member.id')
      table
        .enum('status', ['requested', 'accepted'], {
          useNative: true,
          enumName: 'member_lesson_status',
        })
        .notNullable()
        .defaultTo('requested')
    })
    .createTable('email', table => {
      table.increments('id').notNullable().unique().primary()
      table.text('title').notNullable()
      table.text('content_plain').notNullable()
      table.text('content_html').notNullable()
      table.boolean('sent').notNullable().defaultTo(false)
      table.timestamps(true, true)
      table.integer('member_id').notNullable().references('member.id')
    })
    .raw(`INSERT INTO application(id,name) VALUES (1,'Billericay LTC')`)

export const down = (knex: Knex): Promise<any> =>
  knex.schema
    .dropTable('member_lesson')
    .raw('DROP TYPE IF EXISTS member_lesson_status')
    .dropTable('email')

    .dropTable('lesson')
    .raw('DROP TYPE IF EXISTS lesson_day')

    .dropTable('member')
    .dropTable('user')
    .dropTable('application')
    .alterTable('knex_migrations', (table: Knex.TableBuilder) => table.comment(''))
    .alterTable('knex_migrations_lock', (table: Knex.TableBuilder) => table.comment(''))
