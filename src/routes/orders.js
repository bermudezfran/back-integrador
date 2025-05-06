import { Router } from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

const router = Router()

// Crear orden
router.post('/', async (req, res) => {
  try {
    const { items } = req.body
    let total = 0
    for (const { productId, qty } of items) {
      const prod = await Product.findById(productId)
      total += prod.price * qty
    }
    const order = new Order({
      userId: req.userId,
      items,
      total
    })
    await order.save()
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Listar las órdenes del usuario
router.get('/', async (req, res) => {
  const orders = await Order.find({ userId: req.userId }).populate('items.productId')
  res.json(orders)
})

export default router
