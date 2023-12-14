require('dotenv').config()
const express = require('express')

const productsRoutes = require('./routes/productsRoutes')
const customersRoutes = require('./routes/customersRoutes')

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1', productsRoutes)
app.use('/api/v1', customersRoutes)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
  console.log(`http://localhost:${port}`)
})
