const ModelCustomers = require('../models/Customers')

const createCustomer = (req, res) => {
  ModelCustomers.create(req.body)
    .then(row => {
      res.status(201).send(row)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findAllCustomers = (req, res) => {
  const { customer_id: customerId, first_name: firstName, last_name: lastName, city } = req.query
  ModelCustomers.findAll()
    .then(rows => {
      let customers = [...rows]
      if (customerId) {
        customers = customers.filter(customer => customer.customer_id === parseInt(customerId))
      }
      if (firstName) {
        customers = customers.filter(customer => customer.first_name.toLowerCase() === firstName.toLowerCase())
      }
      if (lastName) {
        customers = customers.filter(customer => customer.last_name.toLowerCase() === lastName.toLowerCase())
      }
      if (city) {
        customers = customers.filter(customer => customer.city.toLowerCase() === city.toLowerCase())
      }
      res.status(200).send(customers)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const findOneCustomer = (req, res) => {
  ModelCustomers.findOne(req.params.idCustomer)
    .then(row => {
      res.status(200).send(row)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const updateOneCustomer = (req, res) => {
  ModelCustomers.update(req.params.idCustomer, req.body)
    .then(row => {
      res.status(200).send(row)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const destroyOneCustomer = (req, res) => {
  ModelCustomers.destroy(req.params.idCustomer)
    .then(() => {
      res.status(204).send()
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

const softDeleteOneCustomer = (req, res) => {
  ModelCustomers.softDelete(req.params.idCustomer)
    .then(() => {
      res.status(204).send()
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
}

module.exports = {
  createCustomer,
  findAllCustomers,
  findOneCustomer,
  updateOneCustomer,
  destroyOneCustomer,
  softDeleteOneCustomer
}
