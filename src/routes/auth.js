import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password })
    await user.save()
    res.status(201).json({ message: 'Usuario creado' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Credenciales inválidas' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
})

export default router
