const ModelProducts = require('../models/Products')

const createProduct = (req, res) => {
  ModelProducts.create(req.body)
    .then(row => {
      res.status(201).send(row)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findAllProducts = (req, res) => {
  const { product_id: productId, min_price: minPrice, max_price: maxPrice } = req.query
  ModelProducts.findAll()
    .then(rows => {
      let products = [...rows]
      if (productId) {
        products = products.filter(product => product.product_id === parseInt(productId))
      }
      if (minPrice) {
        products = products.filter(product => Number(product.price) >= parseFloat(minPrice))
      }
      if (maxPrice) {
        products = products.filter(product => Number(product.price) <= parseFloat(maxPrice))
      }
      res.status(200).send(products)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findOneProduct = (req, res) => {
  ModelProducts.findOne(req.params.idProduct)
    .then(row => {
      res.status(200).send(row)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const updateOneProduct = (req, res) => {
  ModelProducts.update(req.params.idProduct, req.body)
    .then(row => {
      res.status(200).send(row)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const destroyOneProduct = (req, res) => {
  ModelProducts.destroy(req.params.idProduct)
    .then(() => {
      res.status(204).send()
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const softDeleteOneProduct = (req, res) => {
  ModelProducts.softDelete(req.params.idProduct)
    .then(() => {
      res.status(204).send()
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

module.exports = {
  createProduct,
  findAllProducts,
  findOneProduct,
  updateOneProduct,
  destroyOneProduct,
  softDeleteOneProduct
}
