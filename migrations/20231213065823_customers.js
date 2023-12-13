/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('customers').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('customers', function (table) {
        table.increments('customer_id').primary()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('email').notNullable().unique()
        table.string('phone').notNullable().unique()
        table.text('address').notNullable()
        table.string('postal_code').notNullable()
        table.string('suburb').notNullable()
        table.string('city').notNullable()
        table.boolean('active').notNullable().defaultTo(true)
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('customers').then(function (exists) {
    if (exists) {
      return knex.schema.dropTable('customers')
    }
  })
}
