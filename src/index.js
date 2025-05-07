import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import ordersRoutes from './routes/orders.js'
import uploadRoutes from './routes/upload.js'
import { verifyToken } from './middleware/auth.js'

dotenv.config()

const allowedOrigins = [
  process.env.CLIENT_URL,        
  'http://localhost:5173'        
]

const app = express()
app.use(cors(), express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', verifyToken, ordersRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error('CORS policy: Origin no permitido'))
  }
}))

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
