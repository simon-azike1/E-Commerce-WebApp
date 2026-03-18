const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,      // snapshot at time of order
  price: Number,     // snapshot at time of order
  image: String,     // snapshot at time of order
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customer: {
      // registered user OR guest
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    fulfillmentType: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      notes: String, // landmark, instructions
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'],
      default: 'pending',
    },
    // Delivery agent assignment (Phase 2 — populated when DELIVERY_ENABLED)
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryAgent',
    },
    // Payment fields (Phase 3 — populated when PAYMENT_ENABLED)
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    paymentRef: String,
    paymentMethod: String,

    notes: String,  // admin/internal notes
    customerNote: String, // note from customer at checkout
  },
  { timestamps: true }
);

// Auto-generate readable order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    const pad = String(count + 1).padStart(4, '0');
    this.orderNumber = `ORD-${pad}`;
  }

});

module.exports = mongoose.model('Order', orderSchema);