import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import ordersRoutes from './routes/orders.js'
import { verifyToken } from './middleware/auth.js'

dotenv.config()

const app = express()
app.use(cors(), express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', verifyToken, ordersRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB conectado')
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Backend corriendo en http://localhost:${process.env.PORT}`)
    )
  })
  .catch((err) => {
    console.error('❌ Error al conectar MongoDB:', err)
  })
