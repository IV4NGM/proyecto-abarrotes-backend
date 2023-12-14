const knex = require('../config')

const create = (customerId, saleDate) => {
  return knex
    .insert({ customer_id: customerId, sale_date: saleDate })
    .into('sales')
    .returning(['customer_id', 'sale_date'])
}

const findAll = () => {
  return knex
    .select(['customer_id', 'sale_date'])
    .from('sales')
}

const findCustomer = (customerId) => {
  return knex
    .select(['customer_id', 'sale_date'])
    .from('sales')
    .where({ customer_id: customerId })
}

const findDate = (saleDate) => {
  return knex
    .select(['customer_id', 'sale_date'])
    .from('sales')
    .where({ sale_date: saleDate })
}

module.exports = {
  create,
  findAll,
  findCustomer,
  findDate
}
