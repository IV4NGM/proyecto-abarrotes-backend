const { Router } = require('express')
const router = Router()

const productsController = require('../controllers/productsController')

router.post('/products', (productsController.createProduct))
router.get('/products', (productsController.findAllProducts))
router.get('/products/:idProduct', (productsController.findOneProduct))
router.patch('/products/:idProduct', (productsController.updateOneProduct))
router.delete('/products/:idProduct', (productsController.softDeleteOneProduct))
router.delete('/products/destroy/:idProduct', (productsController.destroyOneProduct))

module.exports = router
