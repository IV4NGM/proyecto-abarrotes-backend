const knex = require('../config')

const create = (bodySale) => {
  return knex
    .insert(bodySale)
    .into('sale_products')
    .returning(['sale_product_id', 'product_id', 'amount', 'sale_price', 'customer_id', 'sale_date'])
}

const findSale = (customerId, saleDate) => {
  return knex
    .select(['sale_product_id', 'product_id', 'amount', 'sale_price', 'customer_id', 'sale_date'])
    .from('sale_products')
    .where({ customer_id: customerId })
    .where({ sale_date: saleDate })
}

const findCustomer = (customerId) => {
  return knex
    .select(['sale_product_id', 'product_id', 'amount', 'sale_price', 'customer_id', 'sale_date'])
    .from('sale_products')
    .where({ customer_id: customerId })
}

const findDate = (saleDate) => {
  return knex
    .select(['sale_product_id', 'product_id', 'amount', 'sale_price', 'customer_id', 'sale_date'])
    .from('sale_products')
    .where({ sale_date: saleDate })
}

module.exports = {
  create,
  findSale,
  findCustomer,
  findDate
}
