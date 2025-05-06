import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qty:       { type: Number, required: true }
    }
  ],
  total:     { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Order', orderSchema)
