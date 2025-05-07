import { Router } from 'express'
import Product from '../models/Product.js'

const router = Router()

// GET /api/products
router.get('/', async (req, res) => {
  const productos = await Product.find()
  res.json(productos)
})

// POST /api/products
router.post('/', async (req, res) => {
  const { name, price, image, description } = req.body
  if (!name || price == null) {
    return res.status(400).json({ message: 'El nombre y el precio son obligatorios' })
  }
  try {
    const p = new Product({ name, price, image, description })
    const saved = await p.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
