const { Router } = require('express')
const router = Router()

const salesController = require('../controllers/salesController')

router.post('/sales/:customerId', (salesController.createSale))
router.get('/sales', (salesController.findAllSales))
router.get('/sales/date/:saleDate', (salesController.findDateSales))
router.get('/sales/:customerId/:saleDate', (salesController.findOneSale))
router.get('/sales/:customerId', (salesController.findCustomerSales))

module.exports = router
