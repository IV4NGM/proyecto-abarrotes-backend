/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('sale_products').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('sale_products', function (table) {
        table.increments('sale_product_id').primary()
        table.integer('amount').notNullable().checkPositive()
        table.decimal('sale_price', 12, 2).notNullable().checkPositive()
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
      return knex.schema.dropTable('sale_products')
    }
  })
}
