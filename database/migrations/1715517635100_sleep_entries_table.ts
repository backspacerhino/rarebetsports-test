import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sleep_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // TODO: note that this should be big increments if large project
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamp('date').notNullable()
      table.timestamp('start').notNullable()
      table.timestamp('end').notNullable()
      table.integer('duration').notNullable()
      table.integer('wakeup_times').nullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
