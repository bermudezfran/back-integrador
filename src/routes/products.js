import { Router } from 'express'
import Product from '../models/Product.js'

const router = Router()

// GET
router.get('/', async (req, res) => {
  const productos = await Product.find()
  res.json(productos)
})

// para agregar un producto
router.post('/producto-nuevo', async (req, res) => {
  const p = new Product(req.body)
  await p.save()
  res.status(201).json(p)
})

export default router
