const { Router } = require('express')
const router = Router()

const customersController = require('../controllers/customersController')

router.post('/customers', (customersController.createCustomer))
router.get('/customers', (customersController.findAllCustomers))
router.get('/customers/:idCustomer', (customersController.findOneCustomer))
router.patch('/customers/:idCustomer', (customersController.updateOneCustomer))
router.delete('/customers/:idCustomer', (customersController.softDeleteOneCustomer))
router.delete('/customers/destroy/:idCustomer', (customersController.destroyOneCustomer))

module.exports = router
