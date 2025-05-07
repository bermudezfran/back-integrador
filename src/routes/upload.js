import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = Router()

// 1) Defino carpeta absoluta ./uploads
const uploadsDir = path.join(process.cwd(), 'uploads')

// 2) Aseguro existencia
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// 3) Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
    cb(null, name)
  }
})
const upload = multer({ storage })

// 4) Ruta POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.error('⚠️ Multer no devolvió req.file')
    return res.status(400).json({ message: 'No se subió ningún archivo' })
  }
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  console.log('✅ Imagen subida a:', req.file.path)
  res.json({ url })
})

// 5) Middleware de manejo de errores de Multer
router.use((err, req, res, next) => {
  console.error('❌ Error en multer:', err)
  res.status(500).json({ message: 'Error al subir la imagen' })
})

export default router
