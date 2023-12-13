/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable('products').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('products', function (table) {
        table.increments('product_id').primary()
        table.string('name').notNullable()
        table.text('description')
        table.decimal('price', 12, 2).notNullable().checkPositive()
        table.text('sku')
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
  return knex.schema.hasTable('products').then(function (exists) {
    if (exists) {
      return knex.schema.dropTable('products')
    }
  })
}
