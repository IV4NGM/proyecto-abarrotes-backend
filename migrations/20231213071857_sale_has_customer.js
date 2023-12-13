/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('sales').then(function (exists) {
    if (exists) {
      return knex.schema.table('sales', function (table) {
        table.foreign('customer_id').references('customers.customer_id')
      })
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('sales').then(function (exists) {
    if (exists) {
      return knex.schema.table('sales', function (table) {
        table.dropForeign('customer_id')
      })
    }
  })
}
