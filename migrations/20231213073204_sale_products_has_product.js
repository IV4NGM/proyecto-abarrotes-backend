/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('sale_products').then(function (exists) {
    if (exists) {
      return knex.schema.table('sale_products', function (table) {
        table.integer('product_id').unsigned().notNullable().references('products.product_id')
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
      return knex.schema.hasColumn('product_id').then(function (exists) {
        if (exists) {
          return knex.schema.table('sale_products', function (table) {
            table.dropColumn('product_id')
          })
        }
      })
    }
  })
}
