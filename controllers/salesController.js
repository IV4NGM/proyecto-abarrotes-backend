const ModelProducts = require('../models/Products')
const ModelSales = require('../models/Sales')
const ModelSalesProducts = require('../models/Sale_Products')

const createSale = (req, res) => {
  if (!req.body.products || req.body.products.length === 0) {
    return res.status(400).send('No se puede registrar una venta sin productos')
  }
  const saleDate = new Date()
  ModelProducts.findAll()
    .then(rows => {
      const products = rows
      // Seleccionar los Id de los productos activos:
      const validProductsId = products.map(product => product.product_id)
      // Verificar que los datos proporcionados sean correctos:
      req.body.products.forEach(productToRegister => {
        if (!validProductsId.includes(productToRegister.product_id)) {
          throw new Error(`El producto con id ${productToRegister.product_id} no se encuentra en la base de datos.`)
        }
        const amount = Number(productToRegister.amount)
        if (isNaN(amount) || !isFinite(amount) || amount <= 0 || !Number.isInteger(amount)) {
          throw new Error('La cantidad debe ser un número entero mayor a cero.')
        }
      })
      ModelSales.create(req.params.customerId, saleDate)
        .then(sale => {
          return Promise.all(req.body.products.map(async (productToRegister) => {
            const productInfo = products.filter(product => product.product_id === productToRegister.product_id)
            const productPrice = Number(productInfo[0].price)
            const saleProductsRequest = {
              product_id: productToRegister.product_id,
              amount: productToRegister.amount,
              sale_price: Number(productToRegister.amount) * Number(productPrice),
              customer_id: sale[0].customer_id,
              sale_date: sale[0].sale_date
            }
            return ModelSalesProducts.create(saleProductsRequest)
          }))
        })
        .then((values) => {
          const customerIdCreated = values[0][0].customer_id
          const saleDateCreated = values[0][0].sale_date
          let productsAmount = 0
          let totalPrice = 0
          const saleProductsResult = values.map((element) => {
          // eslint-disable-next-line camelcase
            const { product_id, amount, sale_price } = element[0]
            productsAmount = productsAmount + amount
            // eslint-disable-next-line camelcase
            totalPrice = totalPrice + Number(sale_price)
            // eslint-disable-next-line camelcase
            return { product_id, amount, sale_price }
          })
          const createdSale = {
            customer_id: customerIdCreated,
            sale_date: saleDateCreated,
            products_amount: productsAmount,
            total_price: totalPrice,
            products: saleProductsResult
          }
          res.status(201).send(createdSale)
        })
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
        let productsAmount = 0
        let totalPrice = 0
        const saleProductsResult = values.map((element) => {
        // eslint-disable-next-line camelcase
          const { product_id, amount, sale_price } = element
          productsAmount = productsAmount + amount
          // eslint-disable-next-line camelcase
          totalPrice = totalPrice + Number(sale_price)
          // eslint-disable-next-line camelcase
          return { product_id, amount, sale_price }
        })
        const sale = {
          customer_id: customerId,
          sale_date: saleDate,
          products_amount: productsAmount,
          total_price: totalPrice,
          products: saleProductsResult
        }
        return sale
      } else {
        const sale = {
          customer_id: customerId,
          sale_date: saleDate,
          products_amount: 0,
          total_price: 0,
          products: []
        }
        return sale
      }
    })
    .catch(err => {
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
  ModelSales.findDate(req.params.saleDate)
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

module.exports = {
  createSale,
  findOneSale,
  findAllSales,
  findCustomerSales,
  findDateSales
}
