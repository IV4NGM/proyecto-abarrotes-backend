const ModelProducts = require('../models/Products')
const ModelSales = require('../models/Sales')
const ModelSalesProducts = require('../models/Sale_Products')

const createSale = (req, res) => {
  const saleDate = new Date()
  ModelSales.create(req.params.customerId, saleDate)
    .then(sale => {
      return Promise.all(req.body.products.map(async (product) => {
        const productInfo = await ModelProducts.findOne(product.product_id)
        const productPrice = Number(productInfo[0].price)
        const saleProductsRequest = {
          product_id: product.product_id,
          amount: product.amount,
          sale_price: Number(product.amount) * Number(productPrice),
          customer_id: sale[0].customer_id,
          sale_date: sale[0].sale_date
        }
        return ModelSalesProducts.create(saleProductsRequest)
      }))
    })
    .then((values) => {
      const customerIdCreated = values[0][0].customer_id
      const saleDateCreated = values[0][0].sale_date
      const saleProductsResult = values.map((element) => {
        // eslint-disable-next-line camelcase
        const { product_id, amount, sale_price } = element[0]
        // eslint-disable-next-line camelcase
        return { product_id, amount, sale_price }
      })
      const createdSale = {
        customer_id: customerIdCreated,
        sale_date: saleDateCreated,
        products: saleProductsResult
      }
      res.status(201).send(createdSale)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findOneSalePromise = (customerId, saleDate) => {
  return ModelSalesProducts.findSale(customerId, saleDate)
    .then((values) => {
      if (values.length > 0) {
        const customerId = values[0].customer_id
        const saleDate = values[0].sale_date
        const saleProductsResult = values.map((element) => {
        // eslint-disable-next-line camelcase
          const { product_id, amount, sale_price } = element
          // eslint-disable-next-line camelcase
          return { product_id, amount, sale_price }
        })
        const sale = {
          customer_id: customerId,
          sale_date: saleDate,
          products: saleProductsResult
        }
        return sale
      } else {
        const sale = {
          customer_id: customerId,
          sale_date: saleDate,
          products: []
        }
        return sale
      }
    })
    .catch(err => {
      console.log(err)
      throw new Error(err.message)
    })
}

const findOneSale = (req, res) => {
  const { customerId, saleDate } = req.params
  findOneSalePromise(customerId, saleDate)
    .then(value => {
      res.status(200).send(value)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findAllSales = (req, res) => {
  ModelSales.findAll()
    .then(sales => {
      return Promise.all(sales.map(sale => {
        const { customer_id: customerId, sale_date: saleDate } = sale
        return findOneSalePromise(customerId, saleDate)
      }))
    })
    .then(values => {
      res.status(200).send(values)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findCustomerSales = (req, res) => {
  ModelSales.findCustomer(req.params.customerId)
    .then(sales => {
      return Promise.all(sales.map(sale => {
        const { customer_id: customerId, sale_date: saleDate } = sale
        return findOneSalePromise(customerId, saleDate)
      }))
    })
    .then(values => {
      res.status(200).send(values)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findDateSales = (req, res) => {
  console.log('EJECUTANDO LLAMADA')
  ModelSales.findDate(req.params.saleDate)
    .then(sales => {
      console.log('sales', sales)
      return Promise.all(sales.map(sale => {
        const { customer_id: customerId, sale_date: saleDate } = sale
        return findOneSalePromise(customerId, saleDate)
      }))
    })
    .then(values => {
      res.status(200).send(values)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(err.message)
    })
}

module.exports = {
  createSale,
  findOneSale,
  findAllSales,
  findCustomerSales,
  findDateSales
}
