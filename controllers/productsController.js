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
  ModelProducts.findAll()
    .then(rows => {
      res.status(200).send(rows)
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
