/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('sale_products').then(function (exists) {
    if (exists) {
      return knex.schema.table('sale_products', function (table) {
        table.integer('customer_id').unsigned().notNullable()
        table.timestamp('sale_date').notNullable()
        table.foreign(['customer_id', 'sale_date']).references(['customer_id', 'sale_date']).inTable('sales')
      })
    }
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable('sale_products').then(function (exists) {
    if (exists) {
      return knex.schema.table('sale_products', function (table) {
        table.dropForeign(['customer_id', 'sale_date'])
        table.dropColumn('customer_id')
        table.dropColumn('sale_date')
      })
    }
  })
}
